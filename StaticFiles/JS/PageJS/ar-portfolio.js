const projects = ["Snow Dog Emporium", "High School Project", "Flask Project"]

const sde_iFP = "/StaticFiles/img/portfolio/sdeProject/"; //SnowDogEmporium_imageFolderPath
const hsp_iFP = "/StaticFiles/img/portfolio/hsProject/";



/**
 * CURRENTLY BROKEN
 */
function renderSlideShows() {
    let slideIndex = 0; //Set current image
    let imgCount = 0;
    projects.forEach(p => {
        const prjAbbr = abbreviate(p);
        function showSlides() {
            const imgElement = document.getElementById(`${prjAbbr}Img`);
            const imgName = prjAbbr + '_' + pad(slideIndex, 3) + ".jpg"; //abbr_###.jpg
            console.log(`imgName = ${imgName}`);
            imgElement.src = `${prjAbbr}_iFP` + imgName;
        }
        
        function nextSlide() {
            slideIndex = (slideIndex + 1) % imgCount;
            showSlides();
        }
    
        function prevSlide() {
            slideIndex = (slideIndex - 1 + imgCount) % imgCount;
            showSlides();
        }
    
        function pad(num, size) {
            return ('000' + num).slice(-size);
        }
    })
    
}




//#region - CARDS - Cards for the project slide shows
    function generateProjectCards(prjName, prjAbbr) {
        return `
            <div class="card h-100 mb-2">
                <div class="card-header">
                    <h3>${prjName}</h3>
                </div>
                <div class="card-body">
                    <div class="img-slide">
                        <img class="img-fluid" id="${prjAbbr}Img" src="" alt="${prjName} Slideshow">
                    </div>
                    <button onclick="${prjAbbr}_prevSlide()" class="btn btn-primary" id="${prjAbbr}_prevSlideBtn">Previous</button>
                    <button onclick="${prjAbbr}_nextSlide()" class="btn btn-primary" id="${prjAbbr}_nextSlideBtn">Next</button>

                </div>
                <div class="card-footer">
                    
                </div>
            </div>
        `
    }

    function renderProjectCards() {
        projects.forEach(p => {
            const prjName = p;
            const prjAbbr = abbreviate(p);
            const cPrjCard = generateProjectCards(prjName, prjAbbr); //Current Project card

            const element = document.getElementById(`${prjAbbr}_card`)
            if(element) { element.innerHTML += cPrjCard; }//Add a product card element each time (+=)
            else {console.error(`Element with ID '${prjAbbr}_card' not found!`); }
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


async function initializeData() {
    renderProjectCards();
}


//Load content upon page load
document.addEventListener("DOMContentLoaded", function() {
    initializeData()
})