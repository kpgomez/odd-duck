'use strict';

//global variables

let numberOfRounds = 5; //change to 25 at the end

const state = {
  allProductsArray: [],
};

//dom references

let imageContainer = document.getElementById('products');
let imageOne = document.getElementById('img-one');
let imageTwo = document.getElementById('img-two');
let imageThree = document.getElementById('img-three');
let resultsButton = document.getElementById('results-button');
let results = document.getElementById('list-container');

//constructors

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;

  state.allProductsArray.push(this);
}

let bag = new Product('bag'); // 630 x 611
let banana = new Product('banana'); // 1200 x 1200
let bathroom = new Product('bathroom'); // 500 x 500
let boots = new Product('boots'); // 625 x 625
let breakfast = new Product('breakfast'); // 450 x 360
let bubblegum = new Product('bubblegum'); // 600 x 600
let chair = new Product('chair'); // 1200 x 900
let cthulhu = new Product('cthulhu'); // 650 x 650
let dogDuck = new Product('dog-duck'); // 550 x 366
let dragon = new Product('dragon'); // 464 x 700
let pen = new Product('pen'); // 600 x 345
let petSweep = new Product('pet-sweep'); // 600 x 512
let scissors = new Product('scissors'); // 468 x 379
let shark = new Product('shark'); // 640 x 404
let sweep = new Product('sweep.png'); // 474 x 322
let tauntaun = new Product('tauntaun'); // 516 x 425
let unicorn = new Product('unicorn'); // 600 x 700
let waterCan = new Product('water-can'); // 625 x 625
let wineGlass = new Product('wine-glass'); // 468 x 431

//helper function

function getRandomIndex(){
  return Math.floor(Math.random()*state.allProductsArray.length);
}

//render function

function renderImages(){
  let indexOne = getRandomIndex();
  let indexTwo = getRandomIndex();
  let indexThree = getRandomIndex();

  while(indexOne === indexTwo || indexOne === indexThree){
    indexOne = getRandomIndex();
  }
  while(indexTwo === indexThree){
    indexTwo = getRandomIndex();
  }

  imageOne.src = state.allProductsArray[indexOne].photo;
  imageOne.alt = state.allProductsArray[indexOne].name;
  state.allProductsArray[indexOne].views++;
  console.log(state.allProductsArray[indexOne].views);

  imageTwo.src = state.allProductsArray[indexTwo].photo;
  imageTwo.alt = state.allProductsArray[indexTwo].name;
  state.allProductsArray[indexOne].views++;
  console.log(state.allProductsArray[indexTwo].views);

  imageThree.src = state.allProductsArray[indexThree].photo;
  imageThree.alt = state.allProductsArray[indexThree].name;
  state.allProductsArray[indexThree].views++;
  console.log(state.allProductsArray[indexThree].views)
}

//event handlers
function handleClick(event){
  numberOfRounds--;
  let imageClicked = event.target.alt;
  for(let i = 0; i < state.allProductsArray.length; i++){
    if(imageClicked === state.allProductsArray[i].name){
      state.allProductsArray[i].votes++;
      console.log(imageClicked, state.allProductsArray[i].votes);
    }
  }
  renderImages();

  if(!numberOfRounds){
    imageContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  if(!numberOfRounds){
    for(let i = 0; i < state.allProductsArray.length; i++){
      let resultsList = document.createElement('li');
      resultsList.textContent = `${state.allProductsArray[i].name}: ${state.allProductsArray[i].votes} votes`;
      results.append(resultsList);
    }
  }
}

//event listeners
imageContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);

renderImages();

