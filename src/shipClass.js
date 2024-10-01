
    export class Ship{
        constructor(length, startCoordinates, orientation, hitCount=0, sunkBoolean=false){
            this.length = length;
            this.startCoordinates = startCoordinates;
            this.orientation = orientation;
            this.hitCount = hitCount;
            this.sunkBoolean = sunkBoolean;
        }

        hit(){
            this.hitCount++;
            console.log(`This ship has been hit ${this.hitCount} times`);
            this.isSunk();
        }
        isSunk(){
            if(this.hitCount == this.length) this.sunkBoolean = true;
            if(this.sunkBoolean) return console.log("Ship fully destroyed!");
        }


    }