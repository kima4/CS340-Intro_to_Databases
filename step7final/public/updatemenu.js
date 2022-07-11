function updateMenu(id){
    $.ajax({
        url: '/menus/' + id,
        type: 'PUT',
        data: $('#update-menu').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
