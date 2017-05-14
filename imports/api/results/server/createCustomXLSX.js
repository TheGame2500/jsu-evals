import { Excel } from 'meteor/nicolaslopezj:excel-export';
import { Forms } from '/imports/api/forms/Forms';

export default function(result, requiredFields) {
	const title = 'export_' + new Date();
	let requiredForm_ids = [];
	let formsFac = {};
	_.each(result.buckets,(bucket,bucketName)=>{
		_.each(bucket,form=>{
			requiredForm_ids.push(form._id)
			formsFac[form._id] = bucketName;
		})
	})
	const queryFields = {}
	const excelFields = []
	_.each(requiredFields,fieldName=>{
		queryFields[fieldName] = 1;
		excelFields.push({
			key : fieldName,
			title : Forms.commonOpts[fieldName].label
		})
	})

	let data = Forms.find({_id : {$in : requiredForm_ids}}, {fields : queryFields}).fetch();
	
	if(requiredFields.indexOf('facultateDistribuita') > -1) {
		data = data.map(form=>{ 
			form.facultateDistribuita = formsFac[form._id].replace(/-/g,' ')
			return form;
		})
	}

	return {title : title , file : Excel.export(title, excelFields, data)}
}