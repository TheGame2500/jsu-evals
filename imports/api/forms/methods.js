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

		Forms.update({ID : doc.ID},{
			$addToSet:{
				'eval' : newEval
			}
		})
	},
	disqualify : function(form_id) {
	}
})