document.getElementById('menu-icon').addEventListener('click', function () {
    var menu = document.getElementById('menulist');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block'; // Show the menu
    } else {
        menu.style.display = 'none'; // Hide the menu
    }
});
