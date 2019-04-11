        // GAME STRUCTURE
        //=========================================================================== 
        // 1. Game will pick an album from an array that holds the album name, picture of the album, and video of a song from the album. 
        // 2. Game will display a dash for each letter/space in the album name. 
        // 3. Based on user input, the user picks a letter at a time with the goal of guesssing the album. 
        // 4. As a user picks a correct letter it shows up in the corresponding space in place of the empty dash. 
        // 5. If a user picks an incorrect letter a guess counter is decreased. 
        // 6. If the user picks the correct word before the guess counter hits 0 they win and get a point. 
        // 7. Upon winning the correct album, picture and video play. 
        // 8. If the user does not pick the correct word in time they lose and nothing is displayed. 
        
        // GLOBAL VARIABLES
        // ==========================================================================
        // Word list
        var selectableWords =          
        [
            // Testing for a word with spaces
            "blonde on blonde"
        ];
        // Maximum number of tries player has
        const maxTries = 10;            
        // Stores the letters the user guessed
        var guessedLetters = [];   
        // Index of the current word in the array     
        var currentWordIndex;    
        // This will be the word we actually build to match the current word       
        var guessingWord = [];    
        // How many tries the player has left     
        var remainingGuesses = 0;    
        // Flag to tell if the game has started   
        var gameStarted = false;    
        // Flag for 'press any key to try again'      
        var hasFinished = false;   
        // How many wins has the player racked up       
        var wins = 0;                  
        
        
        // FUNCTIONS
        // ==============================================================================
        
        // Reset our game-level variables
        function resetGame() {
            remainingGuesses = maxTries;
            gameStarted = false;
            
            // Use Math.floor to round the random number down to the nearest whole.
            currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
            
            // Clear out arrays
            guessedLetters = [];
            guessingWord = [];
            
            // Clears winning Image
            document.getElementById("winningImage").src = "";
            // Clears winning video link
            //document.getElementById("winningVideo").scr = "";
            
            // Build the guessing word and clear it out
            for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
                guessingWord.push("_");
            }
            // Hide game over and win images/text
            document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
            document.getElementById("gameover-image").style.cssText = "display: none";
            document.getElementById("youwin-image").style.cssText = "display: none";
            
            // Show display
            updateDisplay();
        };
        
        
        //  Updates the display on the HTML Page
        function updateDisplay() {
            
            document.getElementById("totalWins").innerText = wins;
            document.getElementById("currentWord").innerText = "";
            for (var i = 0; i < guessingWord.length; i++) {
                document.getElementById("currentWord").innerText += guessingWord[i];
            }
            document.getElementById("remainingGuesses").innerText = remainingGuesses;
            document.getElementById("guessedLetters").innerText = guessedLetters;
            if(remainingGuesses <= 0) {
                document.getElementById("gameover-image").style.cssText = "display: block";
                document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
                hasFinished = true;
            }
        };
        
        // Checks to see if the key press is a letter or a number or a space
        document.onkeydown = function(event) {
            // If we finished a game, dump one keystroke and reset.
            if(hasFinished) {
                resetGame();
                hasFinished = false;
            } else {
                // Check to make sure a-z was pressed.
                if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 49 && event.keyCode <= 57) || {
                    makeGuess(event.key.toLowerCase());
                }
            }
        };
        
        //
        function makeGuess(letter) {
            if (remainingGuesses > 0) {
                if (!gameStarted) {
                    gameStarted = true;
                }
                
                // Make sure we didn't use this letter/number yet
                if (guessedLetters.indexOf(letter) === -1) {
                    guessedLetters.push(letter);
                    evaluateGuess(letter);
                }
            }
            
            updateDisplay();
            checkWin();
        };
        
        
        // This function takes a letter and finds all instances of 
        // appearance in the string and replaces them in the guess word.
        function evaluateGuess(letter) {
            // Array to store positions of letters in string
            var positions = [];
            
            // Loop through word finding all instances of guessed letter, store the indicies in an array.
            for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
                if(selectableWords[currentWordIndex][i] === letter) {
                    positions.push(i);
                }
            }
            
            // if there are no indicies, remove a guess and update the hangman image
            if (positions.length <= 0) {
                remainingGuesses--;
                updateHangmanImage();
            } else {
                // Loop through all the indicies and replace the '_' with a letter.
                for(var i = 0; i < positions.length; i++) {
                    guessingWord[positions[i]] = letter;
                }
            }
        };
        
        function checkWin() {
            if(guessingWord.indexOf("_") === -1) {
                document.getElementById("youwin-image").style.cssText = "display: block";
                document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
                wins++;
                hasFinished = true;
            }
        };
        
        // FUNCTION CALLS
        // ==============================================================================
        
        
        