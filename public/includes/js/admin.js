var table = $('.table-container').dataTable({
                ajax: {
                    "url": "https://jsu-evals-app-thegame2500.c9users.io/getUsers",
                    "dataSrc": ""
                },
                processing : true,
                columns: [
                        { "data": "user_name" },
                        { "data": "user_password" },
                        { "data": "user_role_id" },
                ]
            })

$('#add-user').submit(function(evt){
    evt.preventDefault();
    $.post('addUser',$(this).serialize(),function(){
        table._fnAjaxUpdate();
    })
})
