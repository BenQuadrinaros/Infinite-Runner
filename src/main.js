/*
Mark Medved, Ben Rowland, and Thane Wisherop
Alpine Adventure - Biathlon Infinite Skier
Completed on May 3, 2020

Technically Interesting - Implemented single mouse clicks for menu control
(was previously part of the game until playtesting). All music was created
by Ben Rowland using the Bosca Ceoil sound program (https://boscaceoil.net/).
Blizzard effect helps create a balancing loop by punishing faster players
with worse vision conditions and clearing up for slower players.
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Instructions, Play]
};

let game = new Phaser.Game(config);

game.settings = {
    scrollSpeed: 1.5,
    gameTimer: 60000,
};

//reserve some keyboard variables
let keyUP, keyDOWN, keyW, keyS, keySpace;
let mouseDown = false;
//need left mouse click