'use strict';

//global variables
let numberOfRounds = 25; //change to 25 at the end
let currentIndices = [];

const state = {
  allProductsArray: [],
};

//dom references
let imageContainer = document.getElementById('products');
let imageOne = document.getElementById('img-one');
let imageTwo = document.getElementById('img-two');
let imageThree = document.getElementById('img-three');
let resultsButton = document.getElementById('results-button');
let results = document.getElementById('results-list');


//dom reference for chart
const ctx = document.getElementById('myChart');

//constructors
function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;

  state.allProductsArray.push(this);
}

//helper function to return random number between 1 and the length of the allProductsArray
function getRandomIndex(){
  return Math.floor(Math.random()*state.allProductsArray.length); //math.ceil produced duplicate indexes
}

//generates three indices and checks to make sure new index does not already exist
function generateIndices(){
  for(let i = 0; i < 3; i++){
    let nextIndex = getRandomIndex();
    while (currentIndices.includes(nextIndex)){
      nextIndex = getRandomIndex();
    }
    if (!currentIndices.includes(nextIndex)){
      currentIndices.push(nextIndex);
    }
  }
  //removes the first three indices of currentIndices
  while (currentIndices.length > 3){
    currentIndices.shift();
  }
  console.log(currentIndices);
}

//render images
function renderImages(){ 
  // console.log(currentIndices);
  generateIndices();
  /*assigns the image URL as a src attribute for a variable
  called imageOne // question is how does JavaScript know this
  is a img element?*/
  imageOne.src = state.allProductsArray[currentIndices[0]].photo;
  imageOne.alt = state.allProductsArray[currentIndices[0]].name;
  state.allProductsArray[currentIndices[0]].views++;

  imageTwo.src = state.allProductsArray[currentIndices[1]].photo;
  imageTwo.alt = state.allProductsArray[currentIndices[1]].name;
  state.allProductsArray[currentIndices[1]].views++;
  
  imageThree.src = state.allProductsArray[currentIndices[2]].photo;
  imageThree.alt = state.allProductsArray[currentIndices[2]].name;
  state.allProductsArray[currentIndices[2]].views++;
  
}

//displays chart
function renderChart(){

  let productLabels = [];
  let productViews = [];
  let productVotes = [];

  for(let i = 0; i < state.allProductsArray.length; i++){
    productLabels.push(state.allProductsArray[i].name);
    productViews.push(state.allProductsArray[i].views);
    productVotes.push(state.allProductsArray[i].votes);
  }

  //new instance of Chart object
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productLabels,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1
      },
      {label: '# of Views',
        data: productViews,
        borderWidth: 1}
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


//object instantiation
function createObjects(){
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
  let sweep = new Product('sweep', 'png'); // 474 x 322 //corrected passing arguments
  let tauntaun = new Product('tauntaun'); // 516 x 425
  let unicorn = new Product('unicorn'); // 600 x 700
  let waterCan = new Product('water-can'); // 625 x 625
  let wineGlass = new Product('wine-glass'); // 468 x 431
}

function retrieveLocal(){
  let retrievedData = localStorage.getItem('productData');
  let parsedData = JSON.parse(retrievedData);
  
  if(retrievedData){
    state.allProductsArray = parsedData;
  } else {
    createObjects();
  }
}

//event handlers
function handleClick(event){
  numberOfRounds--;
  let imageClicked = event.target.alt; //do all events have a alt attribute or did JavaScript recognize this because the listener was attached to a image?
  for(let i = 0; i < state.allProductsArray.length; i++){
    if(imageClicked === state.allProductsArray[i].name){
      state.allProductsArray[i].votes++;
    }
  }
  
  renderImages(); //renders a new set of images after each round of clicking/voting
  
  if(!numberOfRounds){
    imageContainer.removeEventListener('click', handleClick);
    let productData = JSON.stringify(state.allProductsArray);
    localStorage.setItem('productData', productData);
  }
}

function handleShowResults(){
  if(!numberOfRounds){
    for(let i = 0; i < state.allProductsArray.length; i++){
      let resultsList = document.createElement('li');
      resultsList.textContent = `${state.allProductsArray[i].name} had ${state.allProductsArray[i].votes} votes, and was seen ${state.allProductsArray[i].views} views.`;
      results.append(resultsList);
    }
    renderChart();
  }
}

//event listeners
imageContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);


// createObjects();
retrieveLocal();
renderImages();
