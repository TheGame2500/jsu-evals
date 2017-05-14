import { Results } from '../Results';
import createXLSX from './createXLSX';
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