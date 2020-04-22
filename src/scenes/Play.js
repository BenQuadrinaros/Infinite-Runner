class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load up all assets and animations
        this.load.image('skyBG','../../assets/art/SkyBackground.jpg');
        this.load.image('treeBG','../../assets/art/treeBackgrounLayer.png');
        this.load.image('mountainBG','../../assets/art/mountainBackgrounLayer.png');
        this.load.image('snowGround','../../assets/art/snowLayer.png');
        this.load.image('player','../../assets/art/player.png');
        this.load.image('obstacle','../../assets/art/obstacle.png');
        this.load.image('gate','../../assets/art/slalomGate.png');

        //load audio
        //this.load.audio("sfx_select", "./assets/blip_select12.wav");

    }

    create() {
        game.input.mouse.capture = true;
        this.faster = 500;

        //place backgrounds
        //this.starfield = this.add.tileSprite(0,0,640,480,"starfield").setOrigin(0,0);
        this.skyBG = this.add.tileSprite(0,0,640,480,'skyBG').setOrigin(0,0);
        this.mountainBG = this.add.tileSprite(0,0,game.config.width,game.config.height/2,'mountainBG').setOrigin(0,0).setScale(1.25,1.25);
        this.treeBG = this.add.tileSprite(0,0,game.config.width,game.config.height/2,'treeBG').setOrigin(0,0).setScale(1.25,1.25);
        this.snow = this.add.tileSprite(0,game.config.height/4,game.config.width,game.config.height,'snowGround').setOrigin(0,0).setScale(2.1,2.1);

        //add top-border for UI
        this.add.rectangle(0,0,640,110,0x151565).setOrigin(0,0);
        let scoreConfig = {
            fontFamily: "Courier", 
            fontSize: "28px",
            backgroundColor: "#A0A0A0",
            color: "#1010B5",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        };
        this.p1Score = 0;
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        
        //place assets into the scene
        this.p1 = new Player(this,20,game.config.height-100,'player').setOrigin(.5,.5);
        this.obs1 = new Obstacle(this,0,0,'obstacle').setOrigin(.5,.5);
        this.obs1.reset();
        this.obs2 = new Obstacle(this,0,0,'obstacle').setOrigin(.5,.5);
        this.obs2.reset();
        this.obs2.x += 45 + Math.round(Math.random() * 25);
        this.obs3 = new Obstacle(this,0,0,'obstacle').setOrigin(.5,.5);
        this.obs3.reset();
        this.obs2.x += 120 + Math.round(Math.random() * 45);
        this.gate1 = new Gate(this,0,0,'gate').setOrigin(.5,.5);
        this.gate1.reset();
        this.gate2 = new Gate(this,0,0,'gate').setOrigin(.5,.5);
        this.gate2.reset();
        this.gate2.x += 90 + Math.round(Math.random() * 100);

        //game timer and game over
        this.gameOver = false;
    }

    update() {
        //shift everything on screen
        this.faster--;
        if(this.faster <= 0) {
            this.faster = 500;
            game.settings.scrollSpeed++;
        }

        //check mouse click
        if(game.input.mousePointer.isDown) {
            console.log("mouseX " + game.input.mousePointer.x + " mouse:Y " + game.input.mousePointer.y);
        }
        //check collisions

        //move items that have fallen off the screen
    }
}