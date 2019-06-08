// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';   // sprite means ELF
    
    // Setting the Enemy initial location (you need to implement)
    // Setting the Enemy speed (you need to implement)
    this.x = x;
    this.y = y;
    this.speed = speed;
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt; // what is dt???
    if (this.x >= 505) {
        this.x = 0;
    }
    this.checkCollision();
};


Enemy.prototype.checkCollision = function() {
    
    // object1 = player;
    // object2 = 'this enemy'
    let enemyWidth = 80
    let enemyHeight = 60
    
    // 2D objects, collision detection algorithm
    if ( player.x < this.x + enemyWidth 
        && player.x + enemyWidth > this.x 
        && player.y < this.y + enemyHeight 
        && enemyHeight + player.y > this.y) {
            
            lives -= 1;
            setLives('.lives', lives)
            player.resetPlayerPosition();
            
    };

}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}


// Player update()
Player.prototype.update = function(){};


// Player Renders()
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player handleInput()
Player.prototype.handleInput = function(key1) {
    
    // for debugging
    if (!(key1 == undefined)) {
    }
    
    if (key1 == 'left') {
        // this.x = (this.x - this.speed) % 450 // mod %, prevents value to go above 450
        this.x = this.x - 102

    } else if (key1 == 'right') {
        // this.x = (this.x + this.speed) % 450
        this.x = this.x + 102

    } else if (key1 == 'up') {
        this.y = this.y - 83
        
        if (this.y < 0) {
            scores+=1;
            setScores('.scores', scores);
            
            // player.resetPlayerPosition();
            this.resetPlayerPosition();
        }    
        
    } else if (key1 == 'down') {
        this.y = this.y + 83
    }
    
    // 'canvas' size is x=505 y=606
    // this stops 'player' from going outside the left of screen
    if (this.x < 1) {
        this.x = 1; 
    }
    // this stops 'player' from going outisde the right of screen
    if (this.x > 400) {
        this.x = 400 
    }
    
    // player's head not above the water 
    if (this.y <= -10) {
        this.y = -10
    }
    
    // player's feet not below the green grass
    if (this.y > 400) {
        this.y = 400
    }
    
}

// Player rest(), reset position of the 'Player' to the bottom center of the screen
Player.prototype.resetPlayerPosition = function() {
    this.x = 202; // 'browser' x position
    this.y = 405; // 'browser' y position
    
    let modal1 = document.querySelector('.modal-background');
    let scoreModal = document.querySelector('.final-score');
    let playagain1 = document.querySelector('.button-reply');
    let message1 = document.querySelector('.modal-message');
    let gameMessage1 = document.querySelector('.gameMessage1');
    
    if (lives == 0 && scores < 3) {
        // activate 'Modal' here
        modal1.style.display = 'block';
        scoreModal.innerText = `${scores}`;
        message1.innerText = `You Lose!`;
        
        if (scores == 0) {
            gameMessage1.innerText = `Your Score`;
        } else if (scores > 0) {
            gameMessage1.innerText = `Your Scores`;
        }
        
        // hide the 'modal' when you clicked the button
        playagain1.addEventListener('click', function() {
            // console.log('Reset game')
            modal1.style.display = 'none';
            
            resetGame();
        });
    
    } else if (lives > 0 && scores == 3) {
        
        // show the 'modal'
        modal1.style.display = 'block';
        scoreModal.innerText = `${scores}`;
        message1.innerText = `You Win!`;
        
        // hide the 'modal' when you clicked the button
        playagain1.addEventListener('click', function() {
            modal1.style.display = 'none';
            
            resetGame();
        });
    }
    
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// **Game logic STARTS HERE!
let player = new Player(202,405,50); // putting little dude on the screen
let allEnemies=[];
let scores, lives;
resetGame();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


/**
 * 
 * My custom functions
 * 
 * */
 
function resetGame() {
    
    // console.log(`allEnemies array cleared`);
    allEnemies = [];
    
    // making new Enemy objects.
    allEnemies = [
         new Enemy(0, 64, Math.random() * 250),
         new Enemy(0, 147, Math.random() * 300), 
         new Enemy(0, 230, Math.random() * 400) // speed, higher is faster
    ];
    
    
    // make new 'enemy' on the screen
    /*
    allEnemies.push(
         // 62 = 142(position of bottom bug) - 60(height of bug) - 10(for padding)
         // player move up/down by 83
         new Enemy(0, 64, Math.random() * 250),
         new Enemy(0, 147, Math.random() * 300), 
         new Enemy(0, 230, Math.random() * 400) // speed, higher is faster
        )
    */
        
    scores = 0;
    lives = 2;    
    
    setScores('.scores', scores);
    setLives('.lives', lives);
}
 

function setLives(input1, input2) {
    let liveText = document.querySelector(input1);
    liveText.innerText = `${input2}`
}

 
function setScores(input1, input2) {
    let scoreText = document.querySelector(input1);
    scoreText.innerText = `${input2}`;
}
 
 
 /**
  * code for showing X,Y coordinates in Browser console
  * 
    let canvas_object = document.querySelector('canvas') 
   
    canvas_object.onmousemove = function(event) {
    let x = event.clientX;
    let y = event.clientY;
    let coor = `${x} and ${y}` 
    console.clear();
    console.log(coor);
    }
    
*/

