import { Meteor } from 'meteor/meteor';

Meteor.methods({
	userIsAdmin : function(){
		let user = Meteor.users.findOne(this.userId);

		return user && user.isAdmin || false;
	}
})