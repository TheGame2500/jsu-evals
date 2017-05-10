import { Forms } from '/imports/api/forms/Forms';

Meteor.methods({
	evalForm : function(doc) {
		const self = this;
		
		doc.eval = doc.eval || [];
		if(_.find(doc.eval,eval=>eval.evaluator == self.userId)){
			console.log('user already evaluated this form', doc._id, self.userId);
		}

		let newEval = {
			evaluator : this.userId,
			notaFormular : doc.notaFormular,
			notaRecomandare : doc.notaRecomandare,
			notaVoluntariat : doc.notaVoluntariat
		}
		console.log('Form_id', doc._id);
		console.log('FormID', doc.ID);
		try{
		console.log(Forms.update(doc._id,{
			$addToSet:{
				'eval' : newEval
			}
		}))
		} catch(ex){
			console.error('Exception @ evalForm', ex);
		}
	},
	disqualify : function(form_id) {
	}
})