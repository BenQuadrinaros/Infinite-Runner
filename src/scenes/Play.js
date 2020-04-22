class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load up all assets and animations
        this.load.image('skyBG','../../assets/art/SkyBackground.jpg');
        this.load.image('treeBG','../../assets/art/treeBackgrounLayer.png');
        this.load.image('mountainBG','../../assets/art/mountainBackgrounLayer.png');
        this.load.image('player','../../assets/art/player.png');

    }

    create() {
        game.input.mouse.capture = true;

        //place backgrounds
        this.skyBG = this.add.tileSprite(0,0,640,480,'skyBG').setOrigin(0,0);
        this.mountainBG = this.add.tileSprite(0,0,game.config.width,game.config.height/2,'mountainBG').setOrigin(0,0).setScale(1.25,1.25);
        this.treeBG = this.add.tileSprite(0,0,game.config.width,game.config.height/2,'treeBG').setOrigin(0,0).setScale(1.25,1.25);
        this.p1 = new Player(this,20,game.config.height-100,'player').setOrigin(.5,.5);

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