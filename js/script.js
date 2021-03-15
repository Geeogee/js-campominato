function generateRndNumb(min,max) {
    var rndMin = min;
    var rndMax = max - rndMin + 1;
    var rndNumber = Math.floor(Math.random() * rndMax) + rndMin;

    return rndNumber;
}


function repsCheck(numberToCheck, gameOverNumbers) {
    var lng = gameOverNumbers.length;
    var repFound = false;
    do {
        for (var i=0; i<lng; i++) {

            var elem = gameOverNumbers[i];
            if(numberToCheck == elem) {
                
                repFound = true;
                numberToCheck = generateRndNumb(1,100);
                break;
            } else {

                repFound = false;  
            }
        }
    } while(repFound)

    return numberToCheck;
}

function mineField() {
    var gameOverNumbers = [ ];
    for (var i=0; i<16; i++) {
        var rndNumber = generateRndNumb(1,100);
        var numberChecked = repsCheck(rndNumber, gameOverNumbers);
        gameOverNumbers.push(numberChecked);
    }

    console.log(gameOverNumbers);
}

mineField();