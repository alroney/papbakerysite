(function ($) {
    "use strict";
    const mediaQuery2 = window.matchMedia('(max-width: 382px)');


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    


    // Fixed Navbar
    if (mediaQuery2.matches) {
        $('.navbar-brand img').css('display', 'none');
    }
    $('.fixed-top').css('top', $('.top-bar').height());
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('.fixed-top').addClass('bg-dark').css('top', 0);
        } else {
            $('.fixed-top').removeClass('bg-dark').css('top', $('.top-bar').height());
        }
    });

    // Navbar disappear on scroll down and appear on scroll up
    var prevScrollPos = $(window).scrollTop();
    var navbar = $('.navbar');

    $(window).scroll(function () {
        var currentScrollPos = $(window).scrollTop();
        if (prevScrollPos > currentScrollPos) {
            navbar.removeClass('navbar-hide').css('top', '0');
        } else {
            navbar.addClass('navbar-hide').css('top', '-100px');
        }
        prevScrollPos = currentScrollPos;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('.navbar').css('border-bottom', '0.30em var(--primary) solid');
        } else {
            $('.navbar').css('border-bottom', 'none');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        loop: true,
        nav: true,
        dots: false,
        items: 1,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    


    
    

    
})(jQuery);

