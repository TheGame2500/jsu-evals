import { Meteor } from 'meteor/meteor';
import '/imports/api/users/userIsAdmin.js';
import '/imports/api/csvImports/csvImports.js';
import '/imports/api/forms/methods.js';
import '/imports/api/dropbox/server/methods.js';
import '/imports/api/forms/server/forms-publish.js';
import '/imports/api/forms/server/getResults.js';
import '/imports/api/results/server/endpoints.js';
import '/imports/api/results/server/publish.js';

Meteor.startup(() => {
	// code to run on server at startup
});
