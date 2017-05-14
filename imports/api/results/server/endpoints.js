import { Results } from '../Results';
import createXLSX from './createXLSX';
import createCustomXLSX from './createCustomXLSX';
WebApp.connectHandlers.use('/getResults', (req, res, next) => {
  const latestResult = Results.find({}, {
		sort : {
			createdAt : -1
		}, 
		limit : 1
	}).fetch()[0];

  const xlsx = createXLSX(latestResult);

  const headers = {
    'Content-type': 'application/vnd.openxmlformats',
    'Content-Disposition': 'attachment; filename=' + xlsx.title + '.xlsx'
  };

  res.writeHead(200, headers);
  res.end(xlsx.file, 'binary');
});

WebApp.connectHandlers.use('/generateExcel', (req, res, next) => {
  const requiredFields = [];
  _.each(req.query,(val,name)=>{
    if(val == 'on') requiredFields.push(name);
  })

  const latestResult = Results.find({}, {
    sort : {
      createdAt : -1
    }, 
    limit : 1
  }).fetch()[0];

  const xlsx = createCustomXLSX(latestResult, requiredFields);
    
  const headers = {
    'Content-type': 'application/vnd.openxmlformats',
    'Content-Disposition': 'attachment; filename=' + xlsx.title + '.xlsx'
  };

  res.writeHead(200, headers);
  res.end(xlsx.file, 'binary');
});