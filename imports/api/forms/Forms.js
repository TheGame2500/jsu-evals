import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Forms = new Mongo.Collection('forms');

const commonOpts = {
	ID : {
		type : Number,
		label : 'ID'
	},
	submitDate : {
		type : String,
		label : 'Submission date'
	},
	nume : {
		type : String,
		label :'Nume'
	},
	prenume : {
		type : String,
		label : 'Prenume',
	},
	sex : {
		type : String,
		label : 'Sex'
	},
	nationalitate : {
		type : String,
		label : 'Naționalitate'
	},
	etnie : {
		type : String,
		label : 'Etnie'
	},
	adresaCompleta : {
		type : String,
		label : 'Adresa completă'
	},
	dataNasterii : {
		type : String,
		label : 'Data nașterii',
	},
	cnpSerie : {
		type : String,
		label : 'CNP + Seria și numărul C.I.'
	},
	telefon : {
		type : String,
		label : 'Telefon'
	},
	email : {
		type : String,
		label : 'Email'
	},
	linkFacebook : {
		type : String,
		label : 'Link Facebook',
	},
	liceu : {
		type :String,
		label : 'Liceu/Colegiu'
	},
	localitate : {
		type : String,
		label : 'Localitatea, județul'
	},
	profil : {
		type : String,
		label : 'Profil'
	},
	linieStudiu : {
		type : String,
		label : 'Linia de studiu'
	},
	numePrenumeParinti : {
		type : String,
		label : 'Nume și prenume'
	},
	telefonParinti : {
		type : String,
		label : 'Telefon',
	},
	optiune1 : {
		type : String,
		label : 'Opțiunea #1'
	},
	motivatie1 : {
		type : String,
		label : 'Motivează alegerea pentru facultatea #1'
	},
	optiune2 : {
		type : String,
		label : 'Opțiunea #2'
	},
	motivatie2 : {
		type : String,
		label : 'Motivează alegerea pentru facultatea #2'
	},
	optiune3 : {
		type : String,
		label : 'Opțiunea #3'
	},
	motivatie3 : {
		type : String,
		label : 'Motivează alegerea pentru facultatea #3'
	},
	studiiSuperioare : {
		type : String,
		label : 'Ce te-ar determina să urmezi studiile superioare?'
	},
	invatamantUniversitar : {
		type : String,
		label : 'Consideri că învățământul superior din Romania îți poate oferi aceleași oportunități precum cele din străinătate? Care ar fi motivul determinant să studiezi într-o universitate din România?',
	},
	motivatieUBB : {
		type : String,
		label : 'De ce consideri că Universitatea Babeș-Bolyai ar putea fi o opțiune potrivită, având în vedere așteptările tale în privința mediul universitar?'
	},
	motivatieJSU : {
		type : String,
		label : 'Ce te motivează să participi la Junior Summer University? Care sunt așteptările tale privind acest proiect? '
	},
	cumAiAflat : {
		type : String,
		label : 'Cum ai aflat despre proiectul Junior Summer University?'
	},
	activitateImaginata : {
		type : String,
		label : 'Cum ți-ai imagina o activitate desfășurată și ce ai dori să înveți pe parcursul proiectului? Cum ai folosi aceste cunoştințe?'
	},
	celeMaiTariActivitati : {
		type : String,
		label : 'Menționează cele mai importante activități pe care le-ai desfășurat în timpul liceului   (olimpiade, concursuri, cursuri, activități de voluntariat, traininguri, implicare în cluburi de activități artistice, academice, sportive, sau altele).'
	},
	regulamentLink : {
		type : String,
		label : 'Regulament semnat'
	},
	formularRecomandareLink : {
		type : String,
		label : 'Formular de recomandare'
	},
	adeverintaLink : {
		type : String,
		label : 'Adeverință'
	},
	acordParentalLink : {
		type : String,
		label : 'Acord parental'
	},
	marimeTricou : {
		type : String,
		label : 'Mărimea tricoului'
	},
	regimAlimentar : {
		type : String,
		label : 'Te rugăm să precizezi dacă ai un regim alimentar special (vegetarieni, lacto-vegetarieni etc.) sau probleme de sănătate care necesită atenția specială a organizatorilor.',
		defaultValue : ''
	},
	sugestiiOrganizatori : {
		type : String,
		label : 'Sugestii pentru organizatori',
		defaultValue : ''
	}
}

Forms.Schema = new SimpleSchema(_.extend(_.clone(commonOpts),{
	eval : {
		type : Array,
		maxCount : 2,
		defaultValue : []
	},
	'eval.$' : {
		type : Object
	},
	'eval.$.evaluator' : {
		type : String,
	},
	'eval.$.notaVoluntariat' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota voluntariat'
	},
	'eval.$.notaFormular' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota formular'
	},
	'eval.$.notaVoluntariat' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota '
	}
}))

Forms.CreationSchema = new SimpleSchema(_.extend(_.clone(commonOpts),{
	eval : {
		type : Object,
		maxCount : 2
	},
	'eval.notaVoluntariat' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota voluntariat'
	},
	'eval.notaFormular' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota formular'
	},
	'eval.notaVoluntariat' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota '
	}
}))

Forms.attachSchema(Forms.Schema)

