import { Forms } from '/imports/api/forms/Forms';
import { Results } from '../../results/Results';
import '../../users/userIsAdmin.js';

Meteor.methods({
	getResults : function() {
        if(!Meteor.call('userIsAdmin',this.userId)) throw new Meteor.Error('forms.getResults.notAllowed','Only allowed for admins');

        const ALLOWED_IN_BUCKET = 18,
       		PONDERERE_FORMULAR = 0.8,
       		PONDERERE_RECOMANDARE = 0.1,
       		PONDERERE_VOLUNTARIAT = 0.1;

        let bucketNames = Forms.aggregate(
			[
				{
					$project: {
					    optiune1 : 1,
					    optiune2 : 1,
					    optiune3 : 1,
					}
				},
				{
					$group: {
						_id : {},
						buckets : {$addToSet : '$optiune1'},
						buckets : {$addToSet : '$optiune2'},
						buckets : {$addToSet : '$optiune3'},
					}
				},
			]
		)[0].buckets

		buckets = {} 

		_.each(bucketNames,bucketName=>{
			buckets[bucketName] = [];
		})

		console.log('buckets',buckets);
        const fields = {
        	eval : 1,
        	evalNo : 1,
		    optiune1 : 1,
		    optiune2 : 1,
		    optiune3 : 1,
		    numePrenume : 1
        }

        const allForms = Forms.find({evalNo : {$gte : 1}},{fields}).map(form => {
        	let formularAverage = form.eval.map(eval=>eval.notaFormular).reduce((memo,current)=>memo+current) / form.evalNo;
        	let recomandareAverage = form.eval.map(eval=>eval.notaRecomandare).reduce((memo,current)=>memo+current) / form.evalNo;
        	let voluntariatAverage = form.eval.map(eval=>eval.notaVoluntariat).reduce((memo,current)=>memo+current) / form.evalNo;
        	
        	form.medie = PONDERERE_FORMULAR * formularAverage 
        		+ PONDERERE_RECOMANDARE * recomandareAverage 
        		+ PONDERERE_VOLUNTARIAT * voluntariatAverage

        	form.medie = parseFloat(form.medie.toFixed(2))
        	return form;
        })
        console.log('medie',allForms[0].medie)

        const distributions = [1,2,3];

        _.each(distributions,distribution=>{
        	console.log('distribution',distribution)
        	_.each(buckets,(bucket, bucketName)=>{
        		console.log('bucket',bucket)
        		console.log('bucketName',bucketName)
        		if(bucket.length == ALLOWED_IN_BUCKET) return;

        		_.chain(allForms)
        		.filter(form=>form['optiune' + distribution] == bucketName && !form.distributed)
        		.sortBy(form=>form.medie)
        		.reverse()
        		.each(form=>{
        			if(bucket.length == ALLOWED_IN_BUCKET) return;
        			form.distributed = true;
        			bucket.push(form);
        		})
        	})
        })

        Results.insert({
        	buckets,
        	createdAt : new Date(),
        	createdBy : this.userId
        })
	}
})