import './results.html';

import { Results } from '/imports/api/results/Results';

Template.results.onCreated(function resultsOnCreated() {
	const instance = this;
	console.log("ASD")
	instance.subscribe('evalResults');
})

Template.results.helpers({
	buckets (){
		console.log(Results.find({}).count());
		let result = Results.findOne()

		if(!result) return false;

		let buckets = [];

		_.each(result.buckets,(bucket,name)=>{
			buckets.push({
				name : name.replace(/-/g,' ').replace(/\b\w/g, l => l.toUpperCase()),
				bucket
			})
		})

		return buckets
	},
	downloadURL (){
		return Meteor.absoluteUrl() + 'getResults';
	}
})