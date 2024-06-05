function initializeWhiteBgNavbar() {
    "use strict"; // Enforce strict mode for better error catching

    // Set up a media query to check for mobile devices (viewports <= 991px)
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    //If the viewport is mobile (matches the media query), add specific styles to the navbar collapse menu
    if (mediaQuery.matches) {
        $('.collapse .navbar-nav').addClass('border-dark border-bottom bg-white');
    }

    //Set the 'top' property of the fixed navbar to the height of the '.top-bar'
    $('.fixed-top').css('top', $('.top-bar').height());

    //Several styling changes are made here to the fixed navbar, links, and logo depending on the screen size 
    $('.navbar-toggler').addClass('border-1 border-dark bg-white');
    $('.fixed-top a').css('color', 'black');
    $('.navbar').addClass('border-bottom');
    $('.rounded-circle').removeClass('border-light').addClass('border-dark');
    $('.fixed-top .text-light').removeClass('text-light').addClass('text-dark');
    $('.bi-telephone').removeClass('text-primary').addClass('text-dark');

    //Check the current page to determine logo image
    if (window.location.pathname == 'papstory.html') {
        $('.navbar-brand img').attr('src', '/StaticFiles/img/logo/papbakery_logo_dark.png')
    } else {
        $('.navbar-brand img').attr('src', '/StaticFiles/img/logo/papbakery_logo_dark.png')
    }

   //When the user scrolls, execute the following code
    $(window).scroll(function() {
        //If the user has scrolled down from the top
        if ($(this).scrollTop()) {
            //Apply dark background and styling changes to the navbar, links, logo, etc.
            $('.fixed-top').addClass('bg-dark').css('top', 0);
            $('.fixed-top a').css('color', 'white');
            $('.dropdown-menu').css('background-color', '#343a40');
            $('.navbar').removeClass('border-bottom');
            $('.rounded-circle').removeClass('border-dark').addClass('border-primary');
            $('.fixed-top .text-dark').removeClass('text-dark').addClass('text-light');
            $('.bi-telephone').removeClass('text-dark').addClass('text-primary');

           //Check the page again for the light logo version
            if (window.location.pathname == '/papstory.html') { 
                $('.navbar-brand img').attr('src', '/StaticFiles/img/logo/papbakery_logo_light.png');
            } else { 
                $('.navbar-brand img').attr('src', '/StaticFiles/img/logo/papbakery_logo_light.png');
            }
        } 
        //Else not scrolled down
        else { 
        
            //Revert the changes made when scrolling. Go back to initial white background and light styles.
            $('.fixed-top').removeClass('bg-dark').css('top', $('.top-bar').height());
            $('.fixed-top a').css('color', 'black');
            $('.dropdown-menu').css('background-color', 'white');
            $('.navbar').addClass('border-bottom');
            $('.rounded-circle').removeClass('border-primary').addClass('border-dark');  
            $('.fixed-top .text-light').removeClass('text-light').addClass('text-dark');
            $('.bi-telephone').removeClass('text-primary').addClass('text-dark');

            //Set the dark logo version again
            if (window.location.pathname == '/papstory.html') {   
                $('.navbar-brand img').attr('src', '/StaticFiles/img/logo/papbakery_logo_dark.png');
            } else { 
                $('.navbar-brand img').attr('src', '/StaticFiles/img/logo/papbakery_logo_dark.png');    }
        }

        //If the viewport is still mobile, adjust the navbar collapse menu based on scroll position
        if (mediaQuery.matches) {        
            if ($(this).scrollTop()) { 
                $('.collapse .navbar-nav').addClass('bg-dark').removeClass('border-dark border-bottom bg-white');
            } else { 
                $('.collapse .navbar-nav').removeClass('bg-dark').addClass('border-dark border-bottom bg-white');;
            }
        }
    });
}