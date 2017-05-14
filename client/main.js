//import templates
import './main.html';
import '/client/views/importCSV/importCSV.js'
import '/client/views/evalForm/evalForm.js'
import '/client/views/results/results.js'
import '/client/views/exportExcel/exportExcel.js'

//register methods
import '/imports/api/users/userIsAdmin';

//import dependencies
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Forms } from '/imports/api/forms/Forms';
import { csvImports } from '/imports/api/csvImports/csvImports';
import { _ } from 'meteor/underscore';

Template.main.onCreated(function mainOnCreated() {
	const instance = this;
	instance.userIsAdmin = new ReactiveVar(false);
	instance.menuController = new ReactiveVar('evalForm')

	Meteor.call('userIsAdmin',(e,r)=>{
		if(e) return console.error(e);
		instance.userIsAdmin.set(r);
	})
})
Template.main.helpers({
	userIsAdmin(){
		return Template.instance().userIsAdmin.get();
	},
	menuController(){
		return Template.instance().menuController.get();
	}
})

Template.main.events({
	'click .menu-controller' (e,tmp){
		tmp.menuController.set($(e.target).data('menuitem'));
	},
})