import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import matchDropboxData from './matchDropboxData.js';
import { APIThrottler } from './APIThrottler';

const headers = {
	'Content-Type' : 'application/json'
}

Meteor.methods({
	fetchDropBox(accessToken){
		headers.Authorization = 'Bearer ' + accessToken;

		APIThrottler.makeRequest(
			HTTP.post, HTTP, ['https://api.dropboxapi.com/2/files/list_folder',{
				headers,
				data : {
					path : "/Apps/Ninja Forms Uploads/"
				}
			},Meteor.bindEnvironment(dropBoxCB)])

		return 'fetching';
	}
})

function fetchDropBoxCursor(headers, cursor) {
	APIThrottler.makeRequest(
		HTTP.post, HTTP, ['https://api.dropboxapi.com/2/files/list_folder/continue',{
		headers,
		data : {
			cursor
		}
	},Meteor.bindEnvironment(dropBoxCB)])
}
function dropBoxCB(err,response){
	if(err) return console.error('dropBoxCB err', err);
	const data = response.data
	matchDropboxData(data,headers);
	console.log(Object.keys(data))
	if(data.has_more){
		console.log('\n\n\n\nFETCHING MOAR');
		fetchDropBoxCursor(headers, data.cursor)
	}
}