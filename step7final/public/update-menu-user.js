function updateMenuUser(id){
    $.ajax({
        url: '/menu-users/' + id,
        type: 'PUT',
        data: $('#update-menu-user').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
