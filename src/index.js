import "./styles.css";
import { Ship } from "./shipClass";
import { Gameboard } from "./gameboardClass";
import { Player } from "./playerClass";


let constructButton = document.getElementById("construct-fleet-button");
let gameStateMessage = document.getElementById("game-state");
let leftPlayerBattlefieldCells = document.querySelectorAll(
  "div.player-one > table > tbody > tr> td"
);
let rightPlayerBattlefieldCells = document.querySelectorAll(
  "div.player-two > table > tbody > tr> td"
);
let playerOneDiv = document.querySelector(".player-one");

//Populate the battlefield with ships
  let leftGameboard = new Gameboard();
  let rightGameboard = new Gameboard();

  //Adding individual ships

  let dreadnought = new Ship(4, [2, 3], "vertical");
  leftGameboard.placeShip(dreadnought);

  let enemyDreadnought = new Ship(4, [4, 3], "horizontal");
  rightGameboard.placeShip(enemyDreadnought);

  let gameboardArray = leftGameboard.printGameboard();
  let enemyGameboardArray = rightGameboard.printGameboard();


  //Will render according to gameboard objects

constructButton.addEventListener("click", () => {
  

  leftPlayerBattlefieldCells.forEach((cell) => {
    if (gameboardArray[cell.dataset.y][cell.dataset.x] === 1) {
      cell.style.backgroundColor = "Green";
    }
  });

  rightPlayerBattlefieldCells.forEach((cell) => {
    if (enemyGameboardArray[cell.dataset.y][cell.dataset.x] === 1) {
      cell.style.backgroundColor = "IndianRed";
    }
  });

  constructButton.remove();

  //Creating a play button. Before pressing play it should be possible to rearrange your ships (TODO).
  createPlayButton(playerOneDiv);

});





function createPlayButton(element) {
  //Create the button

  let playButton = document.createElement("button");
  playButton.innerText = "Play";
  playButton.className = "play-button";
  element.appendChild(playButton);

  //Add events to the button

  playButton.addEventListener("click", activateRightBoard);

}


//ACTIVATING THE GAMEBOARDS ONE AFTER THE OTHER

function activateRightBoard(event){

  //Make the play button a one time button;
  let playBtn = document.querySelector(".play-button");
  playBtn.removeEventListener("click", activateRightBoard);

  gameStateMessage.textContent = "Its our move";

  if(event.target != undefined && event.target.className != "play-button") {console.log(`Y: ${event.target.dataset.y}, X: ${event.target.dataset.x}`)
    leftGameboard.receiveAttack([event.target.dataset.y, event.target.dataset.x]);
  let newLeftGameboard = leftGameboard.printGameboard();

  leftPlayerBattlefieldCells.forEach((cell) => {
    if (newLeftGameboard[cell.dataset.y][cell.dataset.x] === 1) {
      cell.style.backgroundColor = "Green";
    } else if(newLeftGameboard[cell.dataset.y][cell.dataset.x] === "o"){
      cell.style.backgroundColor = "black";
      cell.className = "battlefield-cell dead";
    } else if(newLeftGameboard[cell.dataset.y][cell.dataset.x] === "X"){
      cell.style.backgroundColor = "hotpink";
      cell.className = "battlefield-cell dead";
    }
  });
  };

  leftPlayerBattlefieldCells.forEach((cell)=>{
    cell.removeEventListener("click",activateRightBoard);
  });

  rightPlayerBattlefieldCells.forEach((cell)=>{
    if(cell.className != "battlefield-cell dead") cell.addEventListener("click",activateLeftBoard);
  });
};

function activateLeftBoard(event){

  gameStateMessage.textContent = "The enemy is attacking";
  //Here we update the previous RIGHT ENEMY gameboard
  if(event.target != undefined){
  console.log(`Y: ${event.target.dataset.y}, X: ${event.target.dataset.x}`);

  rightGameboard.receiveAttack([event.target.dataset.y, event.target.dataset.x]);
  }
  let newRightGameboard = rightGameboard.printGameboard();

  rightPlayerBattlefieldCells.forEach((cell) => {
    if (newRightGameboard[cell.dataset.y][cell.dataset.x] === 1) {
      cell.style.backgroundColor = "IndianRed";
    } else if(newRightGameboard[cell.dataset.y][cell.dataset.x] === "o"){
      cell.style.backgroundColor = "black";
      cell.className = "battlefield-cell dead";
    } else if(newRightGameboard[cell.dataset.y][cell.dataset.x] === "X"){
      cell.style.backgroundColor = "hotpink";
      cell.className = "battlefield-cell dead";
    }
  });

  rightPlayerBattlefieldCells.forEach((cell)=>{
    cell.removeEventListener("click",activateLeftBoard);
  });

  leftPlayerBattlefieldCells.forEach((cell)=>{
    if(cell.className != "battlefield-cell dead") cell.addEventListener("click", activateRightBoard);
  });

  let randY = Math.floor(Math.random() * 10);
  let randX = Math.floor(Math.random() * 10);

leftPlayerBattlefieldCells.forEach((cell) => {
 

  if(cell.dataset.y == randY && cell.dataset.x == randX && cell.className != "battlefield-cell dead"){
    cell.click();
  }

});
  

  


};

