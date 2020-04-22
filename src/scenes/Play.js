class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load up all assets and animations
    }

    create() {
        game.input.mouse.capture = true;

        //place backgrounds

        //place assets into the scene
    }

    update() {
        //shift everything on screen
        if(game.input.mousePointer.isDown) {
            console.log("mouseX " + game.input.mousePointer.x + " mouse:Y " + game.input.mousePointer.y);
        }
        //check collisions

        //move items that have fallen off the screen
    }
}