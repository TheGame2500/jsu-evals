//import templates
import './importCSV.html';

//import dependencies
import '/imports/api/csvImports/csvImports.js';

Template.importCSV.onCreated(function importCSVOnCreated() {
	Template.instance().uploading = new ReactiveVar( false );
})
Template.importCSV.helpers({
	uploading() {
    	return Template.instance().uploading.get();
  	}
})
Template.importCSV.events({
	'change [name="uploadCSV"]' : ( event, template ) => {
	    Papa.parse( event.target.files[0], {
	      	header: true,
	      	complete( results, file ) {
	        	Meteor.call( 'importCSV', results.data, ( error, response ) => {
	          		if ( error ) {
	            		Bert.alert( error.reason, 'warning' );
	          		} else {
	            		template.uploading.set( false );
            			Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
	          		}
	        });
	      }
	    });
  	}
})