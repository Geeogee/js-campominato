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
                            
                            // ------------------------------------------------------------------- //
                            
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



// Genereates a random number between min and max
function generateRndNumb(min,max) {
    var rndMin = min;
    var rndMax = max - rndMin + 1;
    var rndNumber = Math.floor(Math.random() * rndMax) + rndMin;

    return rndNumber;
}

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

// mineField();


// --------------------- BONUS ------------------------ //



// Check the level difficulty from radios
function levelSelected(radios) {
    for(var i=0; i<radios.length; i++) {
        if(radios[i].checked) {
            var radioValue = parseInt(radios[i].value);
            return radioValue;
        }
    }
}

// Generates the minefield HTML
function generateField(mineField,max, gameOverNumbers) {


    // Generates 10,8 or 4 rows based on level
    for (var i=0; i<(max/10); i++) {
        var rowValue = (i*10);
        mineField.innerHTML += "<div class='row' data-value='" + rowValue + "'></div>";
    }

    //Collects the rows
    var rows = document.getElementsByClassName("row");
    for (var i=0; i<rows.length; i++) {

        // Generates 10 field for N row
        for (var j=0; j<10; j++) {

            // Generates values from 1 to 100
            // Each field will have a data-value assigned
            var fieldValue = parseInt(rows[i].dataset.value) + j + 1;
            var fieldID = "row" + i + "field" + j;

            // Check which values are inside the
            // BOMB VALUES and assign to the corrispective
            // field the BOMB data-value
            if(gameOverNumbers.includes(fieldValue)) {

                rows[i].innerHTML += "<div class='field' id='" + fieldID + "' data-value='bomb'></div>";
            } else {
                rows[i].innerHTML += "<div class='field' id='" + fieldID + "' data-value='" + fieldValue + "'></div>";
            }
        }
    }

    return rows;
 
}

function isFieldBomb(rows, bombIcon, start, max, scoreField) {
    var score = 0;
    var winString = " ";
    for (var i=0; i<rows.length; i++) {
        for (var j=0; j<10; j++) {
            var fieldID = "row" + i + "field" + j;
            var field = document.getElementById(fieldID);
            
            // Check if the clicked field is a bomb
            // In that case shows an alert (STILL WORKING ON GAME STOP)
            // If is not a bomb, the field will change color
            
            field.addEventListener("click", function() {
                var fieldData = this.dataset.value;
                if(fieldData == "bomb") {

                    this.innerHTML = bombIcon;
                    this.style.backgroundColor = "#e60000";
                    this.style.borderTop = "5px solid #ff9999";
                    this.style.borderLeft = "5px solid #ff9999";
                    this.style.borderRight = "5px solid #b30000";
                    this.style.borderBottom = "5px solid #b30000";
                    start.style.display = "inline";
                    winString = "You lose!";
                    gameOver(rows, bombIcon, score, winString);
                } else {

                    this.style.backgroundColor = "rgb(192,192,192)";
                    this.style.border = "1px solid #818181";
                    score++;
                    scoreField.innerHTML = score;

                    if (score == (max - 16)) {
                        winString = "You win!";
                        gameOver(rows, bombIcon, score, winString);
                    }
                }
            });
            
        }
    }
}


function gameOver(rows, bombIcon, score, winString) {
    console.log("Inside game over");
    for (var i=0; i<rows.length; i++) {
        rows[i].style.pointerEvents = "none";
        for (var j=0; j<10; j++) {
            var fieldID = "row" + i + "field" + j;
            var field = document.getElementById(fieldID);
            var fieldData = field.dataset.value;

            if(fieldData == "bomb") {

                field.innerHTML = bombIcon;
            } else {

                field.style.backgroundColor = "rgb(192,192,192)";
                field.style.border = "1px solid #818181";
            }
        }
        
    }

    var scoreField = document.getElementById("score");
    scoreField.innerHTML = winString + " " + score;

}


function bonus() {

    var radios = document.getElementsByName("level");
    console.log(radios);
    
    var start = document.getElementById("start-game");
    

    start.addEventListener("click", function() {

        this.click(this.style.display = "none");
        this.innerHTML = "Play Again";

        var level = levelSelected(radios);
        var max = levelDifficulty(level);

        var gameOverNumbers = [];
        var bombIcon = "<i class=\"fas fa-bomb\"></i>";
        
        var mineField = document.getElementById("minefield");
        mineField.style.border = "4px solid #333333";
        mineField.innerHTML = "";

        var scoreField = document.getElementById("score");
        scoreField.innerHTML = "";

        generateGameOver(gameOverNumbers, max);

        var rows = generateField(mineField, max, gameOverNumbers);

        isFieldBomb(rows, bombIcon, start, max, scoreField);

    });

    
}
        

bonus();


