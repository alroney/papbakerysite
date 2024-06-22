const cardCategories = cardCats


const iFPs = { //imageFolderPaths
    sde: "/StaticFiles/img/portfolio/sdeProject/", //SnowDogEmporium_imageFolderPath
    hsp: "/StaticFiles/img/portfolio/hsProject/",
    fp: "/StaticFiles/img/portfolio/flaskProject/"
}

const imgCounts = {
    sde: 11,
    hsp: 0,
    fp: 0
}



function renderSlideShows() {
    cardCategories.forEach(p => {
        let slideIndex = 0;
        const catAbbr = abbreviate(p);
        let imgCount = imgCounts[catAbbr];

        //Function: get the image path and set it to the src for the img element
        function showSlides() {
            const imgElement = document.getElementById(`${catAbbr}Img`);
            const imgName = `${catAbbr}Img_` + addLeadingZeros(slideIndex, 3) + ".jpg"; //abbrImg_###.jpg
            const folderPath =  iFPs[catAbbr] || '';
            const imgSrc = folderPath + imgName;
            if(imgSrc) {
                imgElement.src = imgSrc; //Set the src of the image to the proper image src
            }
            else {
                console.error(`"${imgSrc}" is not found.`);
            }
        }
        
        //Function: advance to the next slide
        function nextSlide() {
            slideIndex = (slideIndex + 1) % imgCount;
            showSlides();
        }
    
        //Function: go back to the previous slide
        function prevSlide() {
            slideIndex = (slideIndex - 1 + imgCount) % imgCount;
            showSlides();
        }
    
        //Function: set the naming convention for the numbers to have 3 digits
        function addLeadingZeros(num, size) {
            return ('000' + num).slice(-size);
        }

        //Attach next and previous functions to the global scope
        window[`${catAbbr}_nextSlide`] = nextSlide;
        window[`${catAbbr}_prevSlide`] = prevSlide;

        //Show the first slide initially
        showSlides();
    });
}


function initializeImageModal() {
    // Get the modal
    const modal = document.getElementById("imageModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    // Select all images with the class 'img-fluid' and add an onclick event to each
    const images = document.querySelectorAll('.img-fluid');

    images.forEach(img => {
        console.log(`Attaching click event to image with src: ${img.src}`);
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            document.body.classList.add('modal-open'); //Add class to body that prevents scrolling
        }
    });

    //Get all elements with the class 'close'
    const closeButtons = document.getElementsByClassName("close");

    const cb = closeButtons[0];

    //When the user clicks on <span> (x), close the modal
    cb.onclick = function() {
        modal.style.display = "none";
        document.body.classList.remove('modal-open'); //Remove class from body to allow scrolling again
    }

    //Initialize Hammer.js for pinch-to-zoom functionality
    const hammer = new Hammer(modalImg);
    hammer.get('pinch').set ({ enable: true });

    let scale = 1;

    hammer.on('pinch', (ev) => {
        scale = ev.scale;
        modalImg.style.transform = `scale(${scale})`;
    });

    hammer.on('pinched', () => {
        modalImg.style.transform = 'scale(1)';
    });
}



//#region - CARDS - Cards for the project slide shows
function generateProjectCards(catName, catAbbr) {
    return `
        <div class="card h-100 mb-2">
            <div class="card-header">
                <h3>${catName}</h3>
            </div>
            <div class="card-body">
                <div class="img-slide" id="${catAbbr}_img_slide">
                    <img class="img-fluid" id="${catAbbr}Img" src="" alt="${catName} Slideshow">
                </div>
                <button onclick="${catAbbr}_prevSlide()" class="btn btn-primary" id="${catAbbr}_prevSlideBtn">Previous</button>
                <button onclick="${catAbbr}_nextSlide()" class="btn btn-primary" id="${catAbbr}_nextSlideBtn">Next</button>
            </div>
            <div class="card-footer"></div>
        </div>
    `;
}


    function renderProjectCards() {
        cardCategories.forEach(p => {
            const catName = p;
            const catAbbr = abbreviate(p);
            const cPrjCard = generateProjectCards(catName, catAbbr); //Current Project card

            const element = document.getElementById(`${catAbbr}_card`)
            if(element) {
                element.innerHTML += cPrjCard;
            }
            else {
                console.error(`Element with ID '${catAbbr}_card' not found!`);
            }
        })
    }
//#endregion

function abbreviate(str) {
    const words = str.split(' ');

    let abbr = '';

    for (let i = 0; i < words.length; i++) {
        abbr += words[i].charAt(0).toLowerCase();
    }

    return abbr;
}


window.onload = function() {
    renderProjectCards();
    renderSlideShows();
    initializeImageModal(); // Initialize the modal functionality
};

