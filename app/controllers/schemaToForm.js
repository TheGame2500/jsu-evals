/**
 * This function gets a mongoose schema and JSON's the fields needed to populate a form
**/

function schemaToForm(schema){
    var schemaFields = new Array();
    schema.eachPath(function(path){
        schemaFields.push(path);
    });
    return JSON.stringify(schemaFields);
}