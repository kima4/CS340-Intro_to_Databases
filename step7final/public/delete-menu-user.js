function deleteMenuUser(id){
    $.ajax({
        url: '/menu-users/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}