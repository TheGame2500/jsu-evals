import { Excel } from 'meteor/nicolaslopezj:excel-export';

export default function(result) {
	const title = 'rezultate'+result.createdAt;
	let data = [];

	_.each(result.buckets,(bucket,bucketName)=>{
		_.each(bucket,form=>{
			data.push({
				numePrenume : form.numePrenume,
				facultate : bucketName.replace(/-/g,' ').replace(/\b\w/g, l => l.toUpperCase())
			})
		})
	})
	const fields = [
	    {
	      key: 'numePrenume',
	      title: 'Nume ',
	    },
	    {
	      key: 'facultate',
	      title: 'Facultate',
	      width : 55
	    }
  	];

	return {title : title , file : Excel.export(title, fields, data)}
}