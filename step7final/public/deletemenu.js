function deleteMenu(id){
    $.ajax({
        url: '/menus/' + id,
        type: 'DELETE',
        success: function(results){
            window.location.reload(true);
        }
    })
}