

//Function: renders the topbar section
function renderTopbar() {
    return `
        <div class="container-fluid top-bar bg-dark text-light px-0 py-1 wow fadeIn" data-wow-delay="0.1s">
            <div class="row gx-0 align-items-center d-none d-lg-flex">
                <div class="col-lg-6 px-5 text-start">
                    <ol class="breadcrumb mb-2 mt-2">
                        <li class="breadcrumb-item"><a class="small text-light" href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a class="small text-light" href="tos.html#cookiepolicy">Cookie Policy</a></li>
                        <li class="breadcrumb-item"><a class="small text-light" href="tos.html#terms">Terms</a></li>
                        <li class="breadcrumb-item"><a class="small text-light" href="tos.html#privacy">Privacy</a></li>
                    </ol>
                </div>
                <!-- <div class="col-lg-6 px-5 text-end">
                    <small>Follow us:</small>
                    <div class="h-100 d-inline-flex align-items-center">
                        <a class="btn-lg-square text-primary border-end rounded-0" href=""><i class="fab fa-facebook-f"></i></a>
                        <a class="btn-lg-square text-primary border-end rounded-0" href=""><i class="fab fa-twitter"></i></a>
                        <a class="btn-lg-square text-primary border-end rounded-0" href=""><i class="fab fa-linkedin-in"></i></a>
                        <a class="btn-lg-square text-primary pe-0" href=""><i class="fab fa-instagram"></i></a>
                    </div>
                </div> -->
            </div>
        </div>
    `
}

//Function: renders the navbar section
function renderNavbar() {
    return `
        <nav class="navbar navbar-expand-lg fixed-top navbar-light py-lg-2 px-lg-5 wow fadeIn" data-wow-delay="0.1s" >
            <div class="navbar-brand ms-4 ms-lg-0 position-relative">
                <a href="index.html" class="">
                    <h4 class="text-primary m-0">Paws & Palms Bakery</h4>
                </a>
                <a href="index.html" class="navbar-brand-img">
                    <img src="">
                </a>
            </div>
            <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav mx-auto p-4 p-lg-0">
                    <a href="index.html" class="nav-item nav-link active">Home</a>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link" data-bs-toggle="dropdown">About<i class="bi bi-caret-down-fill"></i></a>
                        <div class="dropdown-menu m-0">
                            <a href="about.html" class="dropdown-item">About Us</a>
                            <a href="papstory.html" class="dropdown-item">Our Story</a>
                        </div>
                    </div>
                    <a href="product.html" class="nav-item nav-link">Products</a>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link" data-bs-toggle="dropdown">Support<i class="bi bi-caret-down-fill"></i></a>
                        <div class="dropdown-menu m-0">
                            <a href="faq.html" class="dropdown-item">FAQ</a>
                            <a href="contact-us.html" class="dropdown-item">Contact Us</a>
                        </div>
                    </div>
                </div>
                <div class=" d-none d-lg-flex">
                    <div class="flex-shrink-0 btn-lg-square border border-light rounded-circle">
                        <i class="bi bi-telephone"></i>
                    </div>
                    <div class="ps-3">
                        <small class="text-primary mb-0">Call Us</small>
                        <p class="text-light fs-5 mb-0">(443) 431 - 0587</p>
                    </div>
                </div>
            </div>
        </nav>
    `
}

//Function: renders the footer section
function renderFooter() {
    return `
        <div class="container-fluid footer my-6 mb-0 py-5 border-top wow fadeIn" data-wow-delay="0.1s">
            <div class="container py-5">
                <div class="row g-5">
                    <div class="col-lg-3 col-md-6">
                        <img src="StaticFiles/img/logo/papbakery_logo_dark.png" alt="logo" class="mb-1 logo-img">
                        <img src="StaticFiles/img/logo/papbakery_textLogo_dark.png" alt="logo" class="mb-1 logo-text-img">
                        <blockquote>Paws, Palms, Pure Honesty</blockquote>
                    </div> 
                    <div class="col-lg-3 col-md-6">
                        <h5 class="border-bottom">Information</h5>
                        <p class="mb-2"><a class="" href="papstory.html">The Full Story</a></p>
                        <p class="mb-2"><a class="" href="https://akc.org">American Kennel Club</a></p>
                        <p class="mb-2"><a class="" href="tos.html">Legal</a></p>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <h5 class="border-bottom">Contact Us</h5>
                        <p class="mb-2">Phone: (443) 431 - 0587</p>
                        <p class="mb-2">Email: andrew.papbakery@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

//Function: render the copyright section
function renderCopyright(){
    return `
        <div class="container-fluid copyright text-light py-4 wow fadeIn" data-wow-delay="0.1s">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a href="https://papbakery.com">papbakery.com</a>, All Right Reserved.
                    </div>
                    <div class="col-md-6 text-center text-md-end">
                        Designed and Created by Andrew Roney using <a class="" href="https://getbootstrap.com" target="_blank">Bootstrap 5</a>
                    </div>
                </div>
            </div>
        </div>
    `
}


const functions = { //Create a list of functions
    renderTopbar: renderTopbar,
    renderNavbar: renderNavbar,
    renderFooter: renderFooter,
    renderCopyright: renderCopyright

};

document.addEventListener("DOMContentLoaded", function() {
    const prefixes = ['Topbar', 'Navbar', 'Footer', 'Copyright']; //Create the list of names

    prefixes.forEach(prefix => {
        let funcName = `render${prefix}`
        if(functions[funcName]) {
            const htmlContent = functions[funcName](); //Generate HTML content
            const elementId = `site_${prefix.toLowerCase()}`; //Corresponding element ID
            let element = document.getElementById(elementId); 
        
            if (element) {
                element.innerHTML = htmlContent;
                if (elementId === 'site_navbar') {
                    try {//Try to use initializeWhiteBgNavbar() function. If it can't be used, just carry on without it
                        initializeWhiteBgNavbar();
                    }
                    catch {
                        //Nothing to see here, carry on.
                    }
                }
            }
            else {
                console.error(`Element with ID '${elementId}' not found!`);
            }
        }
        else {
            console.log(`Function ${funcName} not found`);
        }
    });

    initNavbarScripts(); //Call the function to initialize all the navbar scripts
});





function initNavbarScripts() {
    //Spinner removal
    setTimeout(() => {
        $('#spinner').removeClass('show');
    }, 1);

    //Fixed Navbar: Adjustments based on the top bar's height
    $('.fixed-top').css('top', $('.top-bar').height());
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('.fixed-top').addClass('bg-dark').css('top', 0);
        } else {
            $('.fixed-top').removeClass('bg-dark').css('top', $('.top-bar').height());
        }
    });

    //Navbar appearance adjustments on scroll
    var prevScrollPos = $(window).scrollTop();
    $(window).scroll(function() {
        var currentScrollPos = $(window).scrollTop();
        if (prevScrollPos > currentScrollPos) {
            $('.navbar').removeClass('navbar-hide');
        } else {
            $('.navbar').addClass('navbar-hide').css('top', '-100px');
        }
        prevScrollPos = currentScrollPos;
    });

    //Navbar border bottom on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('.navbar').css('border-bottom', '0.30em var(--primary) solid');
        } else {
            $('.navbar').css('border-bottom', 'none');
        }
    });

    //Toggle navbar off when scrolling
    $(window).scroll(function() {
        $('.navbar-collapse').collapse('hide');
        $('.navbar-collapse').removeClass('show');
    });

    //Back to top button functionality
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
}





