var mongoose = require('mongoose');

var personalDataSchema = new mongoose.Schema({
    form_id    : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    first_name : String,
    age        : Number,
    gender     : String,
    nationality: String,
    adress     : String,
    birth_date : String,
    CNP        : String
})

var contactDataSchema = new mongoose.Schema({
    form_id    : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    phone      : String,
    mail       : String,
    facebook   : String
})

var educationSchema = new mongoose.Schema({
    form_id    : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    highschool : String,
    city       : String,
    county     : String,
    profile    : String,
    study_lang : String
})

var parentsDataSchema = new mongoose.Schema({
    form_id      : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    first_name_p : String,
    last_name_p  : String,
    mail_p       : String,
    phone_p      : String
})

var facultiesSchema = new mongoose.Schema({
    form_id      : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    faculty_1    : String,
    faculty_2    : String,
    faculty_3    : String
})

var questionsSchema = new mongoose.Schema({
    form_id                : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    why_our_uni            : String,
    why_these_faculties    : String,
    why_should_we_pick_you : String,
    why_our_summer_school  : String,
    cool_things_you_did    : String
})

var detailsSchema = new mongoose.Schema({
    form_id            : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    how_do_you_know_us : String,
    shirt_size         : String,
    special_diet       : String
})

var picsSchema = new mongoose.Schema({
    form_id            : {type : mongoose.Schema.Types.ObjectId, ref : FormModel},
    ID                 : { data: Buffer , contentType : String },
    teacher_rec        : { data: Buffer , contentType : String },
    parental_agreement : { data: Buffer , contentType : String }
})

var formSchema = new mongoose.Schema({
   _id : mongoose.Schema.Types.ObjectId
})

var PersonalData  = mongoose.model('PersonalData',personalDataSchema),
    ContactData   = mongoose.model('ContactData',contactDataSchema),
    EducationData = mongoose.model('EducationData',educationSchema),
    ParentsData   = mongoose.model('ParentsData',parentsDataSchema),
    FacultyData   = mongoose.model('FacultyData',facultiesSchema),
    QuestionData  = mongoose.model('QuestionData',questionsSchema),
    DetailsData   = mongoose.model('DetailsData',detailsSchema),
    PicsData      = mongoose.model('PicsData',picsSchema),
    FormModel     = mongoose.model('FormModel',formSchema);

module.exports = FormModel;