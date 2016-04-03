var table = $('.table-container').dataTable({
                ajax: {
                    "url": "localhost:8080/getUsers",
                    "dataSrc": ""
                },
                processing : true,
                rowId : "_id",
                columns: [
                        { "data": "user_name" },
                        { "data": "user_password" },
                        { "data": "user_role_id" },
                        { "defaultContent" : "<a class='delete-user fa fa-trash'></a>"}
                ],
                "drawCallback" : function(){
                    $('.delete-user').click(function(row, data, dataIndex ){
                        $.post('deleteUser',{_id : $(this).parents('tr').attr('id')}, function(){
                            table._fnAjaxUpdate();
                        })
                    })
                }
            })
$('#add-user').submit(function(evt){
    evt.preventDefault();
    $.post('addUser',$(this).serialize(),function(){
        table._fnAjaxUpdate();
    })
})
