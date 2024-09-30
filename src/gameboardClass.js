export class Gameboard{
    constructor(){
        this.gameboard = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    }


    placeShip(shipObject, startCoordinate, orientation){
        //finding the y(height) and x(length) coordinates and checking if the ship's length wouldn't cross the border and if no other ships are nearby
        let y = startCoordinate[0];
        let x = startCoordinate[1];
        
        let maximumY = y + shipObject.length;
        let maximumX = x + shipObject.length;



        if(orientation == "horizontal"){
        let pathIsClear = true;
//Check if direct path is clear and if the surrounding is clear

            for(let i = x; i <= maximumX; i++){
                if(this.gameboard[y][i] == 1 || this.gameboard[Math.abs(y-1)][i] == 1 || this.gameboard[y+1][i] == 1){
                    pathIsClear = false;
                    //This will check the back column of the ship
                }else if((x>0 && x<9) && (this.gameboard[y][x-1] == 1 || this.gameboard[Math.abs(y-1)][x-1] || this.gameboard[y+1][x-1])){
                    pathIsClear = false;
                }
            }

            if(maximumX <= 10 && pathIsClear){
                for(let i = x; i < maximumX; i++){
                    this.gameboard[y][i] = 1;
                }
            }
//Placement changed according to orientation
        }else if(orientation == "vertical"){
            let pathIsClear = true;

            for(let i = y; i <= maximumY; i++){
                if(this.gameboard[i][x] == 1 || this.gameboard[i][Math.abs(x-1)] == 1 || this.gameboard[i][x+1] == 1){
                    pathIsClear = false;
                }else if((y > 0 && y<9) && (this.gameboard[y-1][x] == 1 || this.gameboard[y-1][Math.abs(x-1)] || this.gameboard[y-1][x+1])){
                    pathIsClear = false;
                }

            }

            if(maximumY <= 10 && pathIsClear){
                for(let i = y; i < maximumY; i++){
                    this.gameboard[i][x] = 1;
                }
            }

        }else if(y>10 || x > 10 || x < 0 || y < 0){
            console.log("Can't place the ship at given coordinates");
        }
    }

//TODO: RELATE SUCCESSFULLY ATTACKED SHIP ON GAMEBOARD WITH ORIGINAL SHIP OBJECT TO TRIGGER ITS HIT() METHOD
    receiveAttack(attackCoordinates){

        let y = attackCoordinates[0];
        let x = attackCoordinates[1];

        let atleastOneShipHit = false;
        let shipsLeft = false;

        if(this.gameboard[y][x] === 0){
            console.log("Missed!");
            this.gameboard[y][x] = "o";
        }else if(this.gameboard[y][x] == 1){
            console.log("A ship has been hit!");
            this.gameboard[y][x] = "X";
        }

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                if(this.gameboard[i][j] == "X"){
                    atleastOneShipHit = true;
                }

                if(this.gameboard[i][j] == 1){
                    shipsLeft = true;
                }
            }
        }

        if(atleastOneShipHit && !shipsLeft){
            console.log("All ships destroyed!");
        }
    }


    printGameboard(){
        console.log(this.gameboard);
    }

}





