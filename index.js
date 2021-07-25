var imagesArray = [
  { url: "image1", id: "1" },
  { url: "image2", id: "2" },
  { url: "image3", id: "3" },
  { url: "image4", id: "4" },
  { url: "image5", id: "5" },
  { url: "image6", id: "6" },
  { url: "image7", id: "7" },
  { url: "image8", id: "8" },
  { url: "image1", id: "1" },
  { url: "image2", id: "2" },
  { url: "image3", id: "3" },
  { url: "image4", id: "4" },
  { url: "image5", id: "5" },
  { url: "image6", id: "6" },
  { url: "image7", id: "7" },
  { url: "image8", id: "8" },
];

var attemptNumberElement = document.querySelector(".attemptsNumber");
var container = document.querySelector(".game");
var visisted = 1;
var visitedElements = [];
var images;
var resetButton = document.querySelector(".reset");

var attemptNumber = 0;

resetButton.addEventListener("click", () => {
  attemptNumber = 0;
  attemptNumberElement.textContent = attemptNumber;
  for (image of images) {
    image.classList.remove("show");
  }
});

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

var show = function (element) {
  if (!element.classList.contains("show") && visisted <= 2) {
    visitedElements.push(element);
    element.classList.add("show");
    visisted++;
  }
  if (visitedElements.length == 2) {
    if (checkIfEquale(visitedElements)) {
      setBackToDefault();
    }
    setTimeout(() => {
      visitedElements.forEach((element) => {
        if (!checkIfEquale(visitedElements)) element.classList.remove("show");
      });
      setBackToDefault();
    }, 1000);
  }
};

var setBackToDefault = function () {
  visisted = 1;
  visitedElements = [];
};

var checkIfEquale = function (elements) {
  var parents = [];
  elements.map((element) => {
    parents.push(element.parentElement);
  });
  if (parents[0].dataset.id == parents[1].dataset.id) {
    return true;
  } else {
    return false;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  attemptNumberElement.textContent = attemptNumber;
  imagesArray = shuffle(imagesArray);
  for (image of imagesArray) {
    var imageSpot = document.createElement("div");
    imageSpot.classList.add("imageSpot");
    imageSpot.setAttribute("data-id", image.id);
    imageSpot.innerHTML = `
        <img src="./images/${image.url}.jpg" alt="" class="image w-full h-full object-cover invisible">
        `;
    imageSpot.addEventListener("click", function (e) {
      var img = e.currentTarget.children[0];
      attemptNumber++;
      attemptNumberElement.textContent = attemptNumber;
      show(img);
    });
    container.append(imageSpot);
    images = document.querySelectorAll(".image");
  }
});
