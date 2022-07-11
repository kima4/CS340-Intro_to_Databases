function updateUser(username){
    $.ajax({
        url: '/users/' + username,
        type: 'PUT',
        data: $('#update-user').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
