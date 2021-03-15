function generateRndNumb(min,max) {
    var rndMin = min;
    var rndMax = max - rndMin + 1;
    var rndNumber = Math.floor(Math.random() * rndMax) + rndMin;

    return rndNumber;
}


function repsCheck(numberToCheck, numbers) {

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
    for (var i=0; i<numbers.length; i++) {

        var elem = numbers[i];
        if(elem == numberToCheck) {

            repFound = true;
            break;
        }
    }

    return repFound;
}

// User number function 
function addUserNumber(userHistory) {
  
    var userNumber = parseInt(prompt("Insert a value from 1 to 100!"));
    var checkHistory = repsCheck(userNumber,userHistory);
    if (!checkHistory) {

        return userNumber;
    } 
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

    var userHistory = [ ];
    var boom = false;
    while ((userHistory.length < 5) && (boom == false)) {
        
        var userNumber = addUserNumber(userHistory);
        if(userNumber) {
            console.log("OK");
            var test = repsCheck(userNumber, gameOverNumbers);
            if(test == false) {

                userHistory.push(userNumber);
            }
            
        } else {
            
            addUserNumber(userHistory);
        }

        
        boom = test;
        console.log(test, boom);
    }
    
    console.log("Punteggio ", userHistory.length)
    console.log(userHistory);
}

mineField();