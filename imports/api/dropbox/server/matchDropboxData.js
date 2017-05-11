import { HTTP } from 'meteor/http';
import { _ } from 'meteor/underscore';
import { Forms } from '../../forms/Forms.js';
import { APIThrottler } from './APIThrottler';

const regExps = {
	regulamentLink : new RegExp('regulament','ig'),
	formularRecomandareLink : new RegExp('recomandare','ig'),
	adeverintaLink : new RegExp('adeverinta','ig'),
	acordParentalLink : new RegExp('acord','ig')
}

export default function(data, headers){
	const entries = data.entries;

	_.each(entries,entry=>{
		_.each(regExps,(regExp,dbField)=>{
			if(!regExp.test(entry.name)) return;

			const form = getMatchingForm(entry.name,regExp);

			if(!form) {
				console.error('matchDropboxData could not match file ', entry.name, ' to a form ');
				return ;
			}
			console.log('matchDropboxData could match file ', entry.name, ' to form ', form._id);

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
									update[dbField] = data.links[0].url;
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
		}
				)])	
		})
	})
}



function getMatchingForm(entryName,regExpToSplit){
	const entryNameSplit = entryName
	.split(regExpToSplit)[1] //get rid of prefix (e.g. '123-regulament')
	.split('.')[0] //get rid of extension (e.g. .jpg)
	.split(/[_,-]/ig) //split at underscores and dashes (e.g 'avadanei_cristina-bla' -> ['avadanei','cristina','bla'])
	.join(' ');

	return _.chain(Forms.find({
			dropBoxed : null,
			$text : {
				$search : entryNameSplit
			}
		}, {fields : {nume : 1, prenume : 1, numePrenume : 1}}).fetch())
		.map(form=>{
			const numePrenumeChars = replaceDiacritics(form.numePrenume).toLowerCase().split('');
			const entryNameChars = entryNameSplit.split('');
			const diffLength = _.difference(numePrenumeChars, entryNameChars).length;

			form.matchPercent = diffLength / numePrenumeChars.length;

			return form;
		})
		.filter(form => form.matchPercent == 0)
		.sortBy('matchPercent')
		.reverse()
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
