import { Forms } from '/imports/api/forms/Forms';
import '/imports/api/forms/methods.js';

let doc = new ReactiveVar(undefined)
let loading = new ReactiveVar(true);
Template.evalForm.onCreated(function evalFormOnCreated() {
	const instance = this;
	updateDoc()
})

Template.evalForm.helpers({
	formSchema () {
		return Forms.EvalSchema
	},
	doc() {
		return doc.get();
	},
  loading(){
    return loading.get();
  }
})
function updateDoc(){
  doc.set(undefined);
  loading.set(true);
  Meteor.call('getForm',(e,r)=>{
    loading.set(false);
    if(e) return console.error(e);
    doc.set(r)
  })
}
let hooksObject = {
  before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    method: function(doc) {
      // Potentially alter the doc
      
      console.log(doc)
      // Then return it or pass it to this.result()
      return doc; 
      //return false; (synchronous, cancel)
      //this.result(doc); (asynchronous)
      //this.result(false); (asynchronous, cancel)
    }
  },

  // // The same as the callbacks you would normally provide when calling
  // // collection.insert, collection.update, or Meteor.call
  // after: {
  //   // Replace `formType` with the form `type` attribute to which this hook applies
  //   formType: function(error, result) {}
  // },

  // Called when form does not have a `type` attribute
  onSubmit: function(insertDoc, updateDoc, currentDoc) {
    // You must call this.done()!
    console.log(currentDoc);
    this.done()
    //this.done(); // submitted successfully, call onSuccess
    //this.done(new Error('foo')); // failed to submit, call onError with the provided error
    //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
  },

  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {updateDoc();console.log('SUCCESS')},

  // Called when any submit operation fails
  onError: function(formType, error) {console.log('ERROR',error)},

  // Called every time an insert or typeless form
  // is revalidated, which can be often if keyup
  // validation is used.
  // formToDoc: function(doc) {
  //   // alter doc
  //   return doc;
  // },

  // Called every time an update or typeless form
  // is revalidated, which can be often if keyup
  // validation is used.
  // formToModifier: function(modifier) {
  //   // alter modifier
  //   // return modifier;
  // },

  // Called whenever `doc` attribute reactively changes, before values
  // are set in the form fields.
  // docToForm: function(doc, ss) {return doc},

  // Called at the beginning and end of submission, respectively.
  // This is the place to disable/enable buttons or the form,
  // show/hide a "Please wait" message, etc. If these hooks are
  // not defined, then by default the submit button is disabled
  // during submission.
  beginSubmit: function() {},
  endSubmit: function() {}
};

AutoForm.addHooks('evalForm',hooksObject)
