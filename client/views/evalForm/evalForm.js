import { Forms } from '/imports/api/forms/Forms';

Template.evalForm.onCreated(function evalFormOnCreated() {
	const instance = this;
	instance.subscribe('forms')
})

Template.evalForm.helpers({
	formSchema () {
		return Forms.schema
	},
})