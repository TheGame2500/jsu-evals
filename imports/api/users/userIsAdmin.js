import { Meteor } from 'meteor/meteor';

Meteor.methods({
	userIsAdmin : function(userId){
		let user = Meteor.users.findOne(userId || this.userId);
		console.log('user',user);
		return user && user.isAdmin || false;
	}
})