(function($) {
    "use strict"; // Start of use strict

    $('.news-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoHeight:true,
        autoHeightClass: 'owl-height',
        pagination: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })

    $('.testimonial-area').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots: false,
        autoHeight:true,
        pagination: true,
        navText : ["<img src='../StaticFiles/img/slider/rightarrow.png' />","<img src='../StaticFiles/img/slider/leftarrow.png' />"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })

    
    $('.main-slider').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        dots: false,
        pagination: true,
        autoHeight: false,
//        autoHeightClass: 'owl-height',
        navText : ["<img src='../StaticFiles/img/slider/rightarrow.png' />","<img src='../StaticFiles/img/slider/leftarrow.png' />"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })

    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
             $('.navbar').addClass('active');
        } else {
             $('.navbar').removeClass('active');
        }
    });



      
        // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: (target.offset().top - 56)
              }, 1000, "easeInOutExpo");
              return false;
            }
          }
        });
      
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });
    
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '.navbar',
        offset: 100,

    });
      

    // Initialize and add the map

     // End of use strict

})(jQuery);


//Function: To show and hide the dropdown menu
$(function() {
    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown()
    });

    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp()
    });
})
