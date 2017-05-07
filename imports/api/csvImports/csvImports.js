import { Meteor } from 'meteor/meteor';
import '../users/userIsAdmin.js';
import { Forms } from '../forms/Forms.js';
import { _ } from 'meteor/underscore';

Meteor.methods({
    importCSV : function (stuffToImport) {
        if(!Meteor.call('userIsAdmin',this.userId)) throw new Meteor.Error('importCSV.notAllowed','Only allowed for admins');
        const objectFormSchema = Forms.simpleSchema().label();
        _.each(stuffToImport,row=>{
            const doc = {};
            let telefonCounter = 0; //duplicate key called 'Telefon' :(
            _.each(objectFormSchema,(val,key)=>{
                if(row[val]){
                    if(telefonCounter && val=='Telefon')
                        doc['telefonParinti'] = row[val];
                    else
                        doc[key] = row[val]
                }
                if(val == 'Telefon') telefonCounter++;
            })
            if(!Object.keys(doc).length) return;
            Forms.insert(doc);
        })
    }
})