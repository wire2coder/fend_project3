// https://youtu.be/XEVnMgYblGc?t=1286
// https://classroom.udacity.com/nanodegrees/nd001/parts/5b433748-71ae-488f-8eba-f102160cd17b/modules/794adb78-22bb-4a38-85cd-6fa148ebc28a/lessons/64d2cad8-b230-41da-ba90-5b74f33176cc/concepts/59a9fe1d-cab4-4256-8479-4550ce4f4cfd


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
    // todo 6/4
}


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
    console.log(key1)
    
    if (key1 == 'left') {
        console.log(`${this.x} and ${this.y}`)
        // this.x = (this.x - this.speed) % 450 // mod %, prevents value to go above 450
        this.x = (this.x - this.speed)
    } else if (key1 == 'right') {
        console.log(`${this.x} and ${this.y}`)
        // this.x = (this.x + this.speed) % 450
        this.x = (this.x + this.speed)
    } else if (key1 == 'up') {
        console.log(`${this.x} and ${this.y}`)
        this.y = this.y - this.speed
        
        if (this.y < -25) {
            player.reset(); // player go back to 'starting position'
        }
    } else if (key1 == 'down') {
        console.log(`${this.x} and ${this.y}`)
        this.y = this.y + this.speed
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
    
    // player's head to above the water 
    // if (this.y < -50) {
        // this.y = -50
    // }
    
    // player standing in the green grass
    if (this.y > 400) {
        this.y = 400
    }
    
}

// Player rest(), reset position of the 'Player' to the bottom center of the screen
Player.prototype.reset = function() {
    this.x = 200; // 'browser' x position
    this.y = 300; // 'browser' y position
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies=[];
let player = new Player(0,0,50) // putting little dude on the screen
player.reset()


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
