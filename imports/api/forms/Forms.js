import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.debug=true;
export const Forms = new Mongo.Collection('forms');

const commonOpts = {
	_id : {
		type : String,
		label : '_id',
		autoform : {
			type : 'hidden'
		},
		optional : true
	},
	ID : {
		type : Number,
		label : 'ID',
		autoform: {
          type: 'hidden'
        }
	},
	submitDate : {
		type : String,
		label : 'Submission date',
		autoform: {
          type: 'hidden'
        }
	},
	nume : {
		type : String,
		label :'Nume',
		autoform: {
          type: 'hidden'
        }
	},
	prenume : {
		type : String,
		label : 'Prenume',
		autoform: {
          type: 'hidden'
        }
	},
	sex : {
		type : String,
		label : 'Sex',
		autoform: {
          type: 'hidden'
        }
	},
	nationalitate : {
		type : String,
		label : 'Naționalitate',
		autoform: {
          type: 'hidden'
        }
	},
	etnie : {
		type : String,
		label : 'Etnie',
		autoform: {
          type: 'hidden'
        }
	},
	adresaCompleta : {
		type : String,
		label : 'Adresa completă',
		autoform: {
          type: 'hidden'
        }
	},
	dataNasterii : {
		type : String,
		label : 'Data nașterii',
		autoform: {
          type: 'hidden'
        }
	},
	cnpSerie : {
		type : String,
		label : 'CNP + Seria și numărul C.I.',
		autoform: {
          type: 'hidden'
        }
	},
	telefon : {
		type : String,
		label : 'Telefon',
		autoform: {
          type: 'hidden'
        }
	},
	email : {
		type : String,
		label : 'Email',
		autoform: {
          type: 'hidden'
        }
	},
	linkFacebook : {
		type : String,
		label : 'Link Facebook',
		autoform: {
          type: 'hidden'
        }
	},
	liceu : {
		type :String,
		label : 'Liceu/Colegiu',
		autoform: {
          type: 'hidden'
        }
	},
	localitate : {
		type : String,
		label : 'Localitatea, județul',
		autoform: {
          type: 'hidden'
        }
	},
	profil : {
		type : String,
		label : 'Profil',
		autoform: {
          type: 'hidden'
        }
	},
	linieStudiu : {
		type : String,
		label : 'Linia de studiu',
		autoform: {
          type: 'hidden'
        }
	},
	numePrenumeParinti : {
		type : String,
		label : 'Nume și prenume',
		autoform: {
          type: 'hidden'
        }
	},
	telefonParinti : {
		type : String,
		label : 'Telefon',
		autoform: {
          type: 'hidden'
        }
	},
	optiune1 : {
		type : String,
		label : 'Opțiunea #1',
		autoform: {
		    readonly: true
		}
	},
	motivatie1 : {
		type : String,
		label : 'Motivează alegerea pentru facultatea #1',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}

	},
	optiune2 : {
		type : String,
		label : 'Opțiunea #2',
		autoform: {
		    readonly : true
		}
	},
	motivatie2 : {
		type : String,
		label : 'Motivează alegerea pentru facultatea #2',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	optiune3 : {
		type : String,
		label : 'Opțiunea #3',
		autoform: {
		    readonly : true
		}
	},
	motivatie3 : {
		type : String,
		label : 'Motivează alegerea pentru facultatea #3',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	studiiSuperioare : {
		type : String,
		label : 'Ce te-ar determina să urmezi studiile superioare?',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	invatamantUniversitar : {
		type : String,
		label : 'Consideri că învățământul superior din Romania îți poate oferi aceleași oportunități precum cele din străinătate? Care ar fi motivul determinant să studiezi într-o universitate din România?',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	motivatieUBB : {
		type : String,
		label : 'De ce consideri că Universitatea Babeș-Bolyai ar putea fi o opțiune potrivită, având în vedere așteptările tale în privința mediul universitar?',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	motivatieJSU : {
		type : String,
		label : 'Ce te motivează să participi la Junior Summer University? Care sunt așteptările tale privind acest proiect? ',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	cumAiAflat : {
		type : String,
		label : 'Cum ai aflat despre proiectul Junior Summer University?',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	activitateImaginata : {
		type : String,
		label : 'Cum ți-ai imagina o activitate desfășurată și ce ai dori să înveți pe parcursul proiectului? Cum ai folosi aceste cunoştințe?',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	celeMaiTariActivitati : {
		type : String,
		label : 'Menționează cele mai importante activități pe care le-ai desfășurat în timpul liceului   (olimpiade, concursuri, cursuri, activități de voluntariat, traininguri, implicare în cluburi de activități artistice, academice, sportive, sau altele).',
		autoform: {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		    readonly : true
		}
	},
	regulamentLink : {
		type : String,
		label : 'Regulament semnat',
		autoform: {
			afFieldInput : {
        		type: 'url'
        	},
        	readonly : true
        }
	},
	formularRecomandareLink : {
		type : String,
		label : 'Formular de recomandare',
		autoform: {
			afFieldInput : {
        		type: 'url'
        	},
        	readonly : true
        }
	},
	adeverintaLink : {
		type : String,
		label : 'Adeverință',
		autoform: {
			afFieldInput : {
        		type: 'url'
        	},
        	type : 'url',
        	readonly : true
        }
	},
	acordParentalLink : {
		type : String,
		label : 'Acord parental',
		autoform: {
			afFieldInput : {
        		type: 'url'
        	},
        	readonly : true
        },
        optional : true
	},
	marimeTricou : {
		type : String,
		label : 'Mărimea tricoului',
		autoform: {
    		type: 'hidden'
        }
	},
	regimAlimentar : {
		type : String,
		label : 'Te rugăm să precizezi dacă ai un regim alimentar special (vegetarieni, lacto-vegetarieni etc.) sau probleme de sănătate care necesită atenția specială a organizatorilor.',
		defaultValue : '',
		autoform: {
			type : 'hidden'
        }
	},
	sugestiiOrganizatori : {
		type : String,
		label : 'Sugestii pentru organizatori',
		autoform : {
        	readonly : true
		},
		defaultValue : ''
	},
	disqualified : {
		type : Boolean,
		autoform : {
			type : 'hidden'	
		},
		optional : true
	},
	running : {
		type : Array,
		autoform : {
			type : 'hidden'	
		},
		optional : true
	},
	'running.$' : {
		type : String,

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
		autoform : {
			type : 'hidden',
		},
		defaultValue : ''
	},
	'eval.$.notaFormular' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota formular'
	},
	'eval.$.notaRecomandare' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota recomandare'
	},
	'eval.$.notaVoluntariat' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota voluntariat'
	},
	'eval.$.feedBack' : {
		type : String,
		label : 'Feedback'
	}
}))

Forms.EvalSchema = new SimpleSchema(_.extend(_.clone(commonOpts),{
	'notaFormular' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota formular'
	},
	'notaRecomandare' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota recomandare'
	},
	'notaVoluntariat' : {
		type : Number,
		min : 1,
		max : 10,
		label : 'Nota voluntariat'
	},
	'feedBack' : {
		type : String,
		label : 'Feedback',
		autoform : {
			afFieldInput: {
		    	type: "textarea",
		    },
		    rows : 10,
		}
	}
}))
