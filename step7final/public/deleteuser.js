function deleteUser(username){
    $.ajax({
        url: '/users/' + username,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}