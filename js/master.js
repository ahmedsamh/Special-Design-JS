//check if there's local Storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null){
    // console.log("local storage is not empty");
    // console.log(localStorage.getItem("color_option"));
    document.documentElement.style.setProperty("--main--color", mainColors); 
    // check for active class
    document.querySelectorAll('.colors-list li').forEach(element=>{
        element.classList.remove("active");
        //add active Class on Element with data-color === local storage item
        if (element.dataset.color === mainColors)
        element.classList.add("active");
        });
    
}
// baxckground option
let backgroundOption =true;
// variable To control the interval 
let backgroundinterval ;

//check if there's local Storage random background item
let backgroundlocalitem = localStorage.getItem('background_option');
// check if random background local Storage is not empty
if (backgroundlocalitem !== null){
    if (backgroundlocalitem === 'true'){
    backgroundOption = true ;
    }else{
        backgroundOption = false;
    }
    // remove Active Class from All spans
    document.querySelectorAll('.random-backgrounds span').forEach(element =>{
    element.classList.remove('active');
    });
    if (backgroundlocalitem === 'true'){
        document.querySelector('.random-backgrounds .yes').classList.add('active');
    }
    else{
        document.querySelector('.random-backgrounds .no').classList.add('active');

    }
}
///////////////////////////////////////////////////////////////////////////
// toggle spin class on icon
document.querySelector(".settings-box .toggle-settings .fa-gear").onclick = function(){
    // for rotation icon
    this.classList.toggle('fa-spin');
    // for open settings-box
    document.querySelector('.settings-box').classList.toggle('open');
};

////////////// Click anywhere outside Menu And Toggle Button //////////////
let iGear =document.querySelector(".settings-box .toggle-settings .fa-gear");
let box =document.querySelector('.settings-box');

document.addEventListener('click' , (e) => {
    if (e.target !== iGear && e.target !== box){
    // ckeck if box is open 
    if (iGear.classList.contains('fa-spin') && box.classList.contains('open')){
    // Toggle Class "fa-spin" on button
    iGear.classList.toggle('fa-spin');
    box.classList.toggle('open');
    }
    }
});

// stop propagation On box
box.onclick = function (e) {
    e.stopPropagation();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//switch colors
const colorsLi = document.querySelectorAll('.colors-list li');
//click on every li
colorsLi.forEach( li => {
    li.addEventListener("click" , (e)=>{
        //set color on root
        document.documentElement.style.setProperty("--main--color",e.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//switch random background option
const randomBackEl = document.querySelectorAll('.random-backgrounds span');
//click on every span
randomBackEl.forEach( span  => {
    span.addEventListener("click" , (e)=>{

        handleActive(e);

        if (e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background_option' , true);
        }
        else{
            backgroundOption = false ;
            clearInterval(backgroundinterval);
            localStorage.setItem('background_option' , false);

        }
    });
});
/////////////////////////////////////////// random images //////////////////////////////////////////////////////////////////

// select landing page element
let landingPage = document.querySelector('.landing-page');

// get array of imgs
let imgsArray = ['01.jpg' ,'02.jpg' ,'03.jpg' ,'04.jpg' ,'05.jpg'];

// function To randomize Imgs
function randomizeImgs (){
    if (backgroundOption === true){
        backgroundinterval = setInterval(()=>{
    //get random number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
// change backgroung image url
landingPage.style.backgroundImage = 'url("../imgs/'+ imgsArray[randomNumber] +'")';
}, 6000);
    }
}
randomizeImgs();

//////////////////////////////////////////// Skills ///////////////////////////////////////////////////////////////////

// select skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function (){
    //skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop ; 
    //skills outer height 
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight ;
    //window scrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight))
    {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        });
    }
    if (window.scrollY >= 264){
        
        document.querySelector(".settings-box").style.boxShadow = "20px 20px 1000px 50px black inset";
    }
    if (window.scrollY <= 264){
        document.querySelector(".settings-box").style.boxShadow = "20px 20px 100px 0 #EEE inset";

    }
};

///////////////////////////////////////// overlay ////////////////////////////////////////////////////////////

// create Popup with The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{
    img.addEventListener('click' , (e) =>{
    // create overlay element
    let overlay = document.createElement("div");
    // ADD class to overlay 
    overlay.className='popup-overlay';
    // APPEND overlay to the body
    document.body.appendChild(overlay);
    // create the popup box
    let popupBox = document.createElement("div");
    // ADD class to popupbox 
    popupBox.className='popup-box';
    if (img.alt !== null){
        //create heading
        let imgHeading =  document.createElement("h3");
        //create text for heading 
        let imgtext = document.createTextNode(img.alt);
        // append text to heading
        imgHeading.appendChild(imgtext);
        // Append the heading to the popup box
        popupBox.appendChild(imgHeading);
        }
    //create the image
    let popupImage =document.createElement("img");
    //set image source
    popupImage.src = img.src;
    // add image to popupbox
    popupBox.appendChild(popupImage);
    // append the popup Box To body
    document.body.appendChild(popupBox);

    // create the close Span 
    let closeButton = document.createElement('span');
    // create text the close button 
    let closeButtonText = document.createTextNode('X');
    // Append text to close Button
    closeButton.appendChild(closeButtonText);
    //add clase to close button
    closeButton.className = 'close-button';
    // Add close button to the popup Box
    popupBox.appendChild(closeButton);
    });
});
//close popup
document.addEventListener('click' , function (e){
if (e.target.className == 'close-button'){
// remove the popup
e.target.parentNode.remove(); 
//remove overlay
document.querySelector('.popup-overlay').remove();
}
});

/////////////////////////  bullets And links //////////////////////////
// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const alllinks = document.querySelectorAll(".links a");


function scrollToAnyWhere (elements){
    elements.forEach(ele => {
        ele.addEventListener("click" , (e)=>{
            e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
        });
        });
}
scrollToAnyWhere(allBullets);
scrollToAnyWhere(alllinks);

// handle active state
function handleActive(ev){
      //remove active class from all childrens
      ev.target.parentElement.querySelectorAll('.active').forEach(element=>{

        element.classList.remove("active");

        });

        //Add Active class on self
        ev.target.classList.add("active");
} 
//////////////////////////////////////////////////////////////////

let bulletsSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets_option');

if (bulletLocalItem !== null){

bulletsSpan.forEach(span => {
span.classList.remove('active');
});
if (bulletLocalItem === 'block'){
    bulletsContainer.style.display = 'block';
document.querySelector('.bullets-option .yes').classList.add('active');
}
else{
    bulletsContainer.style.display= 'none';
    document.querySelector('.bullets-option .no').classList.add("active");
}
}
bulletsSpan.forEach(span =>{
    span.addEventListener("click", (e)=>{
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets_option' , 'block' ); 
        }
        else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets_option' , 'none');
        }
        handleActive(e);
    });
});

//////////////////////////////// reset button ///////////////////////////////////////

document.querySelector('.reset-options').onclick =function(){
localStorage.removeItem("color_option");
localStorage.removeItem("background_option");
localStorage.removeItem("bullets_option");
// localStorage.clear();
// reload window

window.location.reload();
}
////////////////////////// toglle menu ///////////////////////////////////////////////

let toggleBtn = document.querySelector('.toggle-menu');
let  tlinks = document.querySelector('.links');

toggleBtn.onclick = function (e){
    ////// stop propagation
    e.stopPropagation();
    // Toggle Class "menu-active" on button
    this.classList.toggle('menu-active');
    //Toggle Class "open" On links 
    tlinks.classList.toggle('open');
};

////////////// Click anywhere outside Menu And Toggle Button //////////////

document.addEventListener('click' , (e) => {
    if (e.target !== toggleBtn && e.target !== tlinks){
    // ckeck if menu is open 
    if (tlinks.classList.contains('open')){
    // Toggle Class "menu-active" on button
    toggleBtn.classList.toggle('menu-active');
    //Toggle Class "open" On links 
    tlinks.classList.toggle('open');
    }
    }
});

// stop propagation On Menu
tlinks.onclick = function (e) {
    e.stopPropagation();
}

/////////////////////////////////////////////////////////////////////
