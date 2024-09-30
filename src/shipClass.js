
    export class Ship{
        constructor(length, hitCount=0, sunkBoolean=false){
            this.length = length;
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
        }


    }