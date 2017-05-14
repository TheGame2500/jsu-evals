import { Results } from '../Results';
import '/imports/api/users/userIsAdmin.js';

Meteor.publish('evalResults',function () {
	if(!Meteor.call('userIsAdmin',this.userId)) return [];
	const cursor = Results.find({}, {
		sort : {
			createdAt : -1
		}, 
		limit : 1
	});
	console.log('publishing ', cursor.count(), ' results to ', this.userId);

	return cursor
	
})