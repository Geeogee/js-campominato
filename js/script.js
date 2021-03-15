function generateRndNumb(min,max) {
    var rndMin = min;
    var rndMax = max - rndMin + 1;
    var rndNumber = Math.floor(Math.random() * rndMax) + rndMin;

    return rndNumber;
}


function repsCheck(numberToCheck, gameOverNumbers) {

    // Annidate cycles version
    // Check if the random number generated
    // is already inside the array
    // In that case, it generates a new number that will be checked
    // When the number isn't a repetitions
    // The function returns the number that will be pushed inside the array

    // do {
    //     for (var i=0; i<lng; i++) {

    //         var elem = gameOverNumbers[i];
    //         if(numberToCheck == elem) {
                
    //             repFound = true;
    //             numberToCheck = generateRndNumb(1,100);
    //             break;
    //         } else {

    //             repFound = false; 
    //         }
    //     }
    // } while(repFound)

    // One Cycle version
    // Check if the number is a repetitions, and return true in that case
    var repFound = false;
    for (var i=0; i<gameOverNumbers.length; i++) {

        var elem = gameOverNumbers[i];
        if(elem == numberToCheck) {

            repFound = true;
            break;
        }
    }
    return repFound;
}


// The game (you lost)
function mineField() {
    var gameOverNumbers = [ ];
    
    while (gameOverNumbers.length < 16) {

        var rndNum = generateRndNumb(1,100);
        var repsChecked = repsCheck(rndNum, gameOverNumbers);
        if(!repsChecked) {

            gameOverNumbers.push(rndNum);
        }
    }

    console.log(gameOverNumbers.length, gameOverNumbers);

    
}

// mineField();