var mongoose = require('mongoose');

var schemas = {
    formSchema: new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        last_name: String,
        first_name: String,
    }),
    personalDataSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        age: Number,
        gender: String,
        nationality: String,
        adress: String,
        birth_date: String,
        CNP: String
    }),
    contactDataSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        phone: String,
        mail: String,
        facebook: String
    }),
    educationSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        highschool: String,
        city: String,
        county: String,
        profile: String,
        study_lang: String
    }),
    parentsDataSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        first_name_p: String,
        last_name_p: String,
        mail_p: String,
        phone_p: String
    }),
    facultiesSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        faculty_1: String,
        faculty_2: String,
        faculty_3: String
    }),
    questionsSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        why_our_uni: String,
        why_these_faculties: String,
        why_should_we_pick_you: String,
        why_our_summer_school: String,
        cool_things_you_did: String
    }),
    detailsSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        how_do_you_know_us: String,
        shirt_size: String,
        special_diet: String
    }),
    picsSchema = new mongoose.Schema({
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: formSchema
        },
        ID: {
            data: Buffer,
            contentType: String
        },
        teacher_rec: {
            data: Buffer,
            contentType: String
        },
        parental_agreement: {
            data: Buffer,
            contentType: String
        }
    })
}


module.exports = schemas
