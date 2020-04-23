//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Instructions, Play]
};

let game = new Phaser.Game(config);

game.settings = {
    scrollSpeed: 2,
    gameTimer: 60000,
};

//reserve some keyboard variables
let keyUP, keyDOWN, keyW, keyS;
//need left mouse click