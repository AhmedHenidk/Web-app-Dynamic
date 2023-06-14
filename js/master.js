// Local storge

let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

let backgroundOption = true;

let backgroundInterval;

// check Local storge if it Empty

let backgroundLocalStorage = localStorage.getItem("background-option");

if (backgroundLocalStorage !== null) {
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalStorage === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Create Toggle

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch Backgrounds option

const randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove Class Active
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//  Random Background Options

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeImgs();

// Skills Selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillOffsetTop = ourSkills.offsetTop;

  let skillOutterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOutterHeight - windowHeight) {
    this.console.log("You Are Reached");
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Start Create Popup//

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");

    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    // Create Close Button
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

//Close PoppupBox

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//Start Bullets And Links//
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active //
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Start Show Bullets //

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalStorge = localStorage.getItem("bulllets_option");
if (bulletsLocalStorge !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalStorge === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bulllets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bulllets_option", "none");
    }

    handleActive(e);
  });
});

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("bulllets_option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("color-option");
  window.location.reload();
};

// Toggle Menu //

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    console.log("Not Links");
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};
