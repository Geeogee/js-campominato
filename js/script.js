function generateRndNumb(min,max) {
    var rndMin = min;
    var rndMax = max - rndMin + 1;
    var rndNumber = Math.floor(Math.random() * rndMax) + rndMin;

    return rndNumber;
}

// Check if a values is already
// inside a list of numbers
// function repsCheck(numberToCheck, numbers) {

//     // Annidate cycles version
//     // Check if the random number generated
//     // is already inside the array
//     // In that case, it generates a new number that will be checked
//     // When the number isn't a repetitions
//     // The function returns the number that will be pushed inside the array

//     // do {
//     //     for (var i=0; i<lng; i++) {

//     //         var elem = gameOverNumbers[i];
//     //         if(numberToCheck == elem) {
                
//     //             repFound = true;
//     //             numberToCheck = generateRndNumb(1,100);
//     //             break;
//     //         } else {

//     //             repFound = false; 
//     //         }
//     //     }
//     // } while(repFound)

//     // One Cycle version
//     // Check if the number is a repetitions, and return true in that case
//     var repFound = false;
//     for (var i=0; i<numbers.length; i++) {

//         var elem = numbers[i];
//         if(elem == numberToCheck) {

//             repFound = true;
//             break;
//         }
//     }

//     return repFound;
// }


// Game over Numbers 
function generateGameOver(gameOverNumbers, max) {
    while (gameOverNumbers.length < 16) {

        var rndNum = generateRndNumb(1,max);
        // var repsChecked = repsCheck(rndNum, gameOverNumbers);
        var repsChecked = gameOverNumbers.includes(rndNum);
        if(!repsChecked) {

            gameOverNumbers.push(rndNum);
        }
    }
}

//Player result 
function playerScore(userHistory, boom, max, gameOverNumbers) {
    while ((userHistory.length < (max - 16)) && !boom) {
        
        var userNumber = parseInt(prompt("Insert a value from 1 to " + max + "!"));
        var checkUserNumber = userHistory.includes(userNumber);

        if(!checkUserNumber) {

            // boom = repsCheck(userNumber, gameOverNumbers);
            boom = gameOverNumbers.includes(userNumber);
            if(!boom) {

                userHistory.push(userNumber);
                console.log("You're ok! Still no mine has exploded...yet.")
            }
            
        } else {
            console.log("You've already inserted this number!")
        }
    }

    return userHistory.length;
}

// Level
function levelDifficulty(level) {
    // if (level == 0) {
    //     var max = 100;
    //     return max;
    // } else if (level == 1) {
    //     max = 80;
    //     return max;
    // } else if (level == 2) {
    //     max = 60;
    //     return max;
    // }

    switch(level) {
        case 0:
            var max = 100;
            break;
        case 1:
            max = 80;
            break;
        case 2:
            max = 60;
            break;
        default:
            max = 100;
            break;
    }

    return max;
}

// The game (you lost)
function mineField() {
    var gameOverNumbers = [ ];
    var level = parseInt(prompt("Choose the level difficulty. [0/1/2]"));
    var max = levelDifficulty(level);
    generateGameOver(gameOverNumbers, max);
    
    console.log(gameOverNumbers.length, gameOverNumbers);
    
    var userHistory = [ ];
    var boom = false;
    var score = playerScore(userHistory, boom, max, gameOverNumbers);
   
    if (score < 84) {

        console.log("BOOOOOM!");
       
    } else {

        console.log("You win!")
    }
    console.log("Score: ", score)
}

mineField();




