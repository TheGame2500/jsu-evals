var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var formSchema = new Schema({
    last_name: String,
    first_name: String,
});

var personalDataSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form",
		childPath: "children"
    },
    age: Number,
    gender: String,
    nationality: String,
    adress: String,
    birth_date: String,
    CNP: String
});
var PersonalDetails = mongoose.model("PersonalDetails", personalDataSchema);

var contactDataSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form"
    },
    phone: String,
    mail: String,
    facebook: String
});
var educationSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form"
    },
    highschool: String,
    city: String,
    county: String,
    profile: String,
    study_lang: String
});
var parentsDataSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form"
    },
    first_name_p: String,
    last_name_p: String,
    mail_p: String,
    phone_p: String
});
var facultiesSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form"
    },
    faculty_1: String,
    faculty_2: String,
    faculty_3: String
});
var questionsSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form"
    },
    why_our_uni: String,
    why_these_faculties: String,
    why_should_we_pick_you: String,
    why_our_summer_school: String,
    cool_things_you_did: String
});
var detailsSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form"
    },
    how_do_you_know_us: String,
    shirt_size: String,
    special_diet: String
});
var picsSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form"
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
});


var models = {
    Form: mongoose.model("Form", formSchema),
    PersonalDetails: mongoose.model("PersonalDetails", personalDataSchema),
    ContactData: mongoose.model("ContactData", contactDataSchema),
    ParentsData: mongoose.model("ParentsData", parentsDataSchema),
    Faculties: mongoose.model("Faculties", facultiesSchema),
    Questions: mongoose.model("Questions", questionsSchema),
    Details: mongoose.model("Details", detailsSchema),
    Pics: mongoose.model("Pics", picsSchema)
}

module.exports = models;
