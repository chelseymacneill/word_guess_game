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
        var albums =          
        [
            // Testing for a word with spaces
            // "blonde on blonde"
            "infidels"
        ];
        // Maximum number of tries player has
        const maxTries = 6;            
        // Stores the letters the user guessed
        var guessedLetters = [];   
        // Index of the current word in the array     
        var currentAlbum;    
        // This will be the word we actually build to match the current word       
        var currentAlbumDisplay = [];    
        // How many tries the player has left     
        var remainingGuesses = 0;    
        // Flag to tell if the game has started   
        var gameStarted = false;    
        // Flag for 'press any key to try again'      
        var hasFinished = false;   
        // How many wins has the player has accumulated    
        var wins = 0;       
        // How many loses the player has accumulated            
        var losses = 0;
        // Error message for selecting a non letter or number
        var errorMessage = 'Pick a letter or a number.'
        
        // FUNCTIONS
        // ==============================================================================
        
        // Reset our game-level variables
        function resetGame() {
            remainingGuesses = maxTries;
            gameStarted = false;
            // Select an album at random from albums array
            currentAlbum = Math.floor(Math.random() * (albums.length));
            
            // Clear out arrays
            guessedLetters = [];
            currentAlbumDisplay = [];
            
            // Clears winning Image Console 
            document.getElementById("winningImage").style.display='none';
            
            // Display the current album the user is guessing as dashes
            for (var i = 0; i < albums[currentAlbum].length; i++) {
                currentAlbumDisplay.push("_");
            }
            
            // Hide game over and win images/text
            document.getElementById("pressKeyTryAgain").style.innerHTML= "display: none";
            document.getElementById("gameover-image").style.cssText = "display: none";
            document.getElementById("winningImage").style.cssText = "display: none";
            
            // Show display
            updateDisplay();
        };
        
        //  Updates the display on the HTML Page
        function updateDisplay() {
            // Uses JS to grab the html element by the id tag and re-write based on the JS program variable
            document.getElementById("totalWins").innerHTML = wins;
            document.getElementById("totalLosses").innerHTML = losses;
            document.getElementById("currentAlbum").innerHMTL = currentAlbum;
            
            for (var i = 0; i < currentAlbumDisplay.length; i++) {
                document.getElementById("currentAlbum").innerHTML += currentAlbumDisplay[i];
            }
            document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
            document.getElementById("guessedLetters").innerHTML = guessedLetters;
            
        };
        
        // Checks to see if the key press is a letter or a number and returns an error message if it is not. 
        document.onkeydown = function(event) {
            // Check to make sure a-z was pressed.
            if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 49 && event.keyCode <= 57) {
                makeGuess(event.key.toLowerCase());
            } else getElementById("userAction").innerHTML = errorMessage;
        };
        
        // Push a letter to to the dashes display where it belongs. A letter push can start the game or be a guess. 
        function makeGuess(letter) {
            if (remainingGuesses > 0 && gameStarted == true) {
                
                
            }
            // Make sure we didn't use this letter/number yet
            if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                evaluateGuess(letter);
            }
    };
    
    
    // This function takes a letter and finds all instances of 
    // appearance in the string and replaces them in the guess word.
    function evaluateGuess(letter) {
        // Array to store positions of letters in string
        var positions = [];
        
        // Loop through word finding all instances of guessed letter, store the indicies in an array.
        for (var i = 0; i < albums[currentAlbum].length; i++) {
            if(albums[currentAlbum][i] === letter) {
                positions.push(i);
            }
        }
        
        // if there are no indicies, remove a guess 
        if (positions.length <= 0) {
            // Loop through all the indicies and replace the '_' with a letter.
            for(var i = 0; i < positions.length; i++) {
                currentAlbumDisplay[positions[i]] = letter;
            }
        }
    };
    
    // This function checks and logs wins and losses
    function checkStatus() {
        // Checks for remaining dashes in the currentAlbumDisplay array
        if(currentAlbumDisplay.indexOf("_") === -1) {
            // Currently just displays the same image no matter what. 
            document.getElementById("youwin-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
            wins++;
            hasFinished = true;
        } else if (currentAlbumDisplay.indexOf("_") >= 0 && remainingGuesses === 0) {
            
            document.getElementById("gameover-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
            losses++
            hasFinished = true;
        } else { 
            hasFinished = false;
            
        }
    };
    
    // FUNCTION CALLS
    // ==============================================================================
    
    resetGame();
    updateDisplay()