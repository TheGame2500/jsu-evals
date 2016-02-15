var mongoose = require('mongoose');
var formSchema = new mongoose.Schema({
    
    //personal data
    first_name : String,
    age        : Number,
    gender     : String,
    nationality: String,
    adress     : String,
    birth_date : String,
    CNP        : String,
    
    //contact data
    phone      : String,
    mail       : String,
    facebook   : String,
    
    //education
    highschool : String,
    city       : String,
    county     : String,
    profile    : String,
    study_lang : String,
    
    //parents
    first_name_p : String,
    last_name_p  : String,
    mail_p       : String,
    phone_p      : String,
    
    //picked faculties
    faculty_1    : String,
    faculty_2    : String,
    faculty_3    : String,
    
    //questions
    why_our_uni            : String,
    why_these_faculties    : String,
    why_should_we_pick_you : String,
    why_our_summer_school  : String,
    cool_things_you_did    : String,
    
    //details
    how_do_you_know_us : String,
    shirt_size         : String,
    special_diet       : String,
    
    //paper scans (jpeg's)
    ID                 : { data: Buffer , contentType : String },
    teacher_rec        : { data: Buffer , contentType : String },
    parental_agreement : { data: Buffer , contentType : String }
    
})