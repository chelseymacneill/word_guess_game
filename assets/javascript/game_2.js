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
        // List of selectable words
        var words = [ "javascript",
        "monkey",
        "amazing",
        "pancake"];
        
        // Selects a word at random from words array
        var word = words[Math.floor(Math.random() * words.length)];
        
        // Displays dashes for each charater in the chosen word
        var answerArray = [];
        (var i = 0; i < word.length; i++) {
            answerArray[i] = "_";
        }
        // Sets remainging letters to the lenth of the chosen word
        var remainingLetters = word.length;
        
        // Skeleton of the game 
        while (remainingLetters > 0) {
            // Game code goes here
            // Show the player their progress
            alert(answerArray.join(" "));
            // Take input from the player
            var guess = prompt("Guess a letter, or click Cancel to stop playing."); 
            if (guess === null) {
                // Exit the game loop
                break;
            } else if (guess.length !== 1) {
                alert("Please enter a single letter."); 
            } else {
                // Update the game state with the guess
                for (var j=0; j<word.length; j++) {
                    if (word[j] === guess);{
                        answerArray[j] = guess;
                        remainingLetters--;
                    }
                }
                
                // Update answerArray and remainingLetters for every correct guess
            }
            // End of the game loop    
        }
        // Functions
        //================================================================================
        
        // 1. Pick a random word.
        
        // 2. Take the player’s guess.
        // 3. Quit the game if the player wants to.
        // 4. Check that the player’s guess is a valid letter.
        //  5. Keep track of letters the player has guessed.
        //  6. Show the player their progress.
        //  7. Finish when the player has guessed the word.
        
        
        
        // Function Calls
        //====================================================================================
        UpdateDisplay()