import './exportExcel.html';

import { Forms } from '/imports/api/forms/Forms';

Template.exportExcel.helpers({
	fields(){
		let fields = [];
		const blacklist = ['running','running.$','ID','disqualified'];
		_.each(Forms.commonOpts,(field,fieldName)=>{
			if(blacklist.indexOf(fieldName) > -1)return;
			fields.push({
				name : fieldName,
				label : field.label,
			})
		})

		return fields;
	}
})