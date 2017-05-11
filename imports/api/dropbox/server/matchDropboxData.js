import { HTTP } from 'meteor/http';
import { _ } from 'meteor/underscore';
import { Forms } from '../../forms/Forms.js';
import { APIThrottler } from './APIThrottler';

const regExps = {
	regulamentLink : new RegExp('regulament_','ig'),
	formularRecomandareLink : new RegExp('recomandare_','ig'),
	adeverintaLink : new RegExp('adeverinta_','ig'),
	acordParentalLink : new RegExp('acord_','ig')
}

export default function(data, headers){
	const entries = data.entries;
	let matchCounter = 0;
	let unmatch = 0;
	_.each(entries,entry=>{
		_.each(regExps,(regExp,dbField)=>{
			if(!regExp.test(entry.name)) return;

			const form = getMatchingForm(entry.name,regExp);

			if(!form) {
				unmatch++;
				console.error('matchDropboxData could not match file ', entry.name, ' to a form ');
				return ;
			}
			matchCounter++;
			if(form.dropBoxed){
				// console.log('Already matched form ', form._id)
				return;
			}
			// console.log('matchDropboxData could match file ', entry.name, ' to form ', form._id, form.numePrenume);
			APIThrottler.makeRequest(
				HTTP.post, HTTP, ['https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
				{
					headers,
					data : {
						path : entry.path_lower,
						settings : {
							requested_visibility : 'public'
						}
					}
				},Meteor.bindEnvironment(
		function(err,res){
			try{
			if(err){
				if(err.response && err.response.statusCode == 409){ 
					if(new RegExp('already_exists','gi').test(err.response.data.error_summary)){ //already exists need to fetch from somewhere else
						return APIThrottler.makeRequest(
							HTTP.post, HTTP, ['https://api.dropboxapi.com/2/sharing/get_shared_links',
							{
								headers,
								data : {
									path : entry.path_lower,
								}
							},Meteor.bindEnvironment(function(e,r){
								if(e)
									return console.error('could not get existing URL for file ', entry.name, form._id, ' because ', e);
									const data = r.data;
									const update = { dropBoxed : true};
									update[dbField] = data.links[2].url;
									Forms.update(form._id,{
										$set : update
									})

							})])	
					}
				}
				return console.error('could not get public URL for file ', entry.name, form._id, ' because ', err);
			}
			
			const data = res.data;
			const update = { dropBoxed : true};
			update[dbField] = data.url;
			Forms.update(form._id,{
				$set : update
			})
		}catch(ex){
			console.error("ERR@CALLBACK", ex);
		}
		}
				)])	
		})
	})

	console.log("matchDropboxData matched ", matchCounter);
	console.log("matchDropboxData could not match ", unmatch);
}



function getMatchingForm(entryName,regExpToSplit){
	const entryNameSplit = entryName
	.split(regExpToSplit)[1] //get rid of prefix (e.g. '123-regulament')
	.split('.')[0] //get rid of extension (e.g. .jpg)
	.split(/[_,-]/ig) //split at underscores and dashes (e.g 'avadanei_cristina-bla' -> ['avadanei','cristina','bla'])
	.join(' ');

	return _.chain(Forms.find({
			$text : {
				$search : entryNameSplit
			}
		}, {fields : {nume : 1, prenume : 1, numePrenume : 1, dropBoxed : 1}}).fetch())
		.filter(form=>{
			const numePrenumeChars = replaceDiacritics(form.numePrenume).toLowerCase().replace(/\s\s+/g, ' ').replace('-',' ');
			const entryNameChars = replaceDiacritics(entryNameSplit).toLowerCase().replace(/\s\s+/g, ' ');
			const diffLength = _.difference(numePrenumeChars, entryNameChars).length;

			return numePrenumeChars == entryNameChars;
		})
		// .filter(form => form.unmatchPercent == 0)
		// .sortBy('matchPercent')
		// .reverse()
		.first()
		.value()
}

function replaceDiacritics(s)
{
    var s;

    var diacritics =[
        /[\300-\306]/g, /[\340-\346]/g,  // A, a
        /[\310-\313]/g, /[\350-\353]/g,  // E, e
        /[\314-\317]/g, /[\354-\357]/g,  // I, i
        /[\322-\330]/g, /[\362-\370]/g,  // O, o
        /[\331-\334]/g, /[\371-\374]/g,  // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];

    var chars = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    for (var i = 0; i < diacritics.length; i++)
    {
        s = s.replace(diacritics[i],chars[i]);
    }

    return s
}
