
/* HIGH SCHOOL PROJECT SLIDE SHOW */
    let hsp_slideIndex = 0;
    const hsp_imgCount = 3;
    const hsp_imgPrefix = "hspImg_";

    function hsp_showSlides() {
        const hsp_imgElement = document.getElementById("highSchoolProjectImg");
        const hsp_imgName = hsp_imgPrefix + pad(hsp_slideIndex, 3) + ".jpg";
        hsp_imgElement.src = "/StaticFiles/img/portfolio/hsProject/" + hsp_imgName;
    }

    function hsp_nextSlide() {
        hsp_slideIndex = (hsp_slideIndex + 1) % hsp_imgCount;
        hsp_showSlides();
    }

    function hsp_prevSlide() {
        hsp_slideIndex = (hsp_slideIndex - 1 + hsp_imgCount) % hsp_imgCount;
        hsp_showSlides();
    }

    function pad(num, size) {
        return ('000' + num).slice(-size);
    }

/* HIGH SCHOOL PROJECT SLIDE SHOW END */



/* SNOWDOG EMPORIUM SLIDE SHOW */
    let sde_slideIndex = 0;
    const sde_imgCount = 3;
    const sde_imgPrefix = "sdeImg_";

    function sde_showSlides() {
        const sde_imgElement = document.getElementById("snowdogEmporiumImg");
        const sde_imgName = sde_imgPrefix + pad(sde_slideIndex, 3) + ".jpg";
        sde_imgElement.src = "/StaticFiles/img/portfolio/snowdogEmporium/" + sde_imgName;
    }

    function sde_nextSlide() {
        sde_slideIndex = (sde_slideIndex + 1) % sde_imgCount;
        sde_showSlides();
    }

    function sde_prevSlide() {
        sde_slideIndex = (sde_slideIndex - 1 + sde_imgCount) % sde_imgCount;
        sde_showSlides();
    }

    function pad(num, size) {
        return ('000' + num).slice(-size);
    }

/* SNOWDOG EMPORIUM SLIDE SHOW END */



/* FLASK PROJECT SLIDE SHOW */
    let fp_slideIndex = 0;
    const fp_imgCount = 3;
    const fp_imgPrefix = "fpImg_";

    function fp_showSlides() {
        const fp_imgElement = document.getElementById("flaskProjectImg");
        const fp_imgName = fp_imgPrefix + pad(fp_slideIndex, 3) + ".jpg";
        fp_imgElement.src = "/StaticFiles/img/portfolio/flaskProject/" + fp_imgName;
    }

    function fp_nextSlide() {
        fp_slideIndex = (fp_slideIndex + 1) % fp_imgCount;
        fp_showSlides();
    }

    function fp_prevSlide() {
        fp_slideIndex = (fp_slideIndex - 1 + fp_imgCount) % fp_imgCount;
        fp_showSlides();
    }

    function pad(num, size) {
        return ('000' + num).slice(-size);
    }

/* FLASK PROJECT SLIDE SHOW END */