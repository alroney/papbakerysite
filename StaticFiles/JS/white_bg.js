(function ($) {
    "use strict";
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    // // Navbar collapse this will prevent the mobile version changes from happening if the viewport is greater than 768px
    if (mediaQuery.matches) {
        $('.collapse .navbar-nav').addClass('border-dark border-bottom bg-white');
    }

    // // Fixed Navbar
    $('.fixed-top').css('top', $('.top-bar').height());

    $('.navbar-toggler').addClass('border-1 border-dark bg-white');
    $('.fixed-top a').css('color', 'black');
    $('.navbar').addClass('border-bottom');
    $('.rounded-circle').removeClass('border-light').addClass('border-dark');
    $('.fixed-top .text-light').removeClass('text-light').addClass('text-dark');
    $('.bi-telephone').removeClass('text-primary').addClass('text-dark');
    if (window.location.pathname == 'papstory.html') {
        $('.navbar-brand img').attr('src', 'StaticFiles/img/logo/papbakery_logo_dark.png')
    } else {
        $('.navbar-brand img').attr('src', 'StaticFiles/img/logo/papbakery_logo_dark.png')
    }

    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('.fixed-top').addClass('bg-dark').css('top', 0);
            $('.fixed-top a').css('color', 'white');
            $('.dropdown-menu').css('background-color', '#343a40');
            $('.navbar').removeClass('border-bottom');
            $('.rounded-circle').removeClass('border-dark').addClass('border-primary');
            $('.fixed-top .text-dark').removeClass('text-dark').addClass('text-light');
            $('.bi-telephone').removeClass('text-dark').addClass('text-primary');
            if (window.location.pathname == '/papstory.html') {
                $('.navbar-brand img').attr('src', 'StaticFiles/img/logo/papbakery_logo_light.png')
            } else {
                $('.navbar-brand img').attr('src', 'StaticFiles/img/logo/papbakery_logo_light.png')
            }

        } else {
            $('.fixed-top').removeClass('bg-dark').css('top', $('.top-bar').height());
            $('.fixed-top a').css('color', 'black');
            $('.dropdown-menu').css('background-color', 'white');
            $('.navbar').addClass('border-bottom');
            $('.rounded-circle').removeClass('border-primary').addClass('border-dark');
            $('.fixed-top .text-light').removeClass('text-light').addClass('text-dark');
            $('.bi-telephone').removeClass('text-primary').addClass('text-dark');
            if (window.location.pathname == '/papstory.html') {
                $('.navbar-brand img').attr('src', 'StaticFiles/img/logo/papbakery_logo_dark.png')
            } else {
                $('.navbar-brand img').attr('src', 'StaticFiles/img/logo/papbakery_logo_dark.png')
            }
        }

        if (mediaQuery.matches) {
            if ($(this).scrollTop()) {
                $('.collapse .navbar-nav').addClass(' bg-dark').removeClass('border-dark border-bottom bg-white');
            }
            else {
                $('.collapse .navbar-nav').removeClass('bg-white').addClass('border-dark border-bottom bg-white');
            }
        }
    });

})(jQuery);
