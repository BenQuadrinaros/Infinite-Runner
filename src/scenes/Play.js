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
        this.load.image('target','../../assets/art/target.png');

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
        this.snow = this.add.tileSprite(0,0,game.config.width,game.config.height,'snowGround').setOrigin(0,0).setScale(2.1,4);

        //keys for movement
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //add top-border for UI
        this.add.rectangle(0,0,640,110,0x151565).setOrigin(0,0);
        this.scoreConfig = {
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
        this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);
        
        //place assets into the scene

        this.obs1 = new Obstacle(this,0,0,'obstacle').setOrigin(0,0);
        this.obs1.setScale(3, 1.5);
        this.obs1.reset();
        this.obs2 = new Obstacle(this,0,0,'obstacle').setOrigin(0,0);
        this.obs2.setScale(1.75, 2);
        this.obs2.reset();
        this.obs2.x += 45 + Math.round(Math.random() * 25);
        this.obs3 = new Obstacle(this,0,0,'obstacle').setOrigin(0,0);
        this.obs3.setScale(2.75, 2.5);
        this.obs3.reset();
        this.obs2.x += 120 + Math.round(Math.random() * 45);
        this.gate1 = new Gate(this,0,0,'gate').setOrigin(0,0);
        this.gate1.setScale(3, 1.5);
        this.gate1.reset();
        this.gate2 = new Gate(this,0,0,'gate').setOrigin(0,0);
        this.gate2.setScale(3, 1.5);
        this.gate2.reset();
        this.gate2.x += 90 + Math.round(Math.random() * 100);

        this.tar1 = new Target(this,0,0,'target',0).setOrigin(0,0).setInteractive();
        this.tar1.reset();

        //player object
        this.p1 = new Player(this,40,game.config.height-100,'player').setOrigin(0,0);

        //game timer and game over
        this.gameOver = false;
        //timer variables
        this.totalTime = 5;
        this.timer =  this.time.addEvent({
            delay:this.totalTime*1000,
            callback: () => {this.displayGameOver()},
            loop:false,
            callbackScope:this
        });
        //place timer
        this.timeLeft = this.add.text(game.config.width-160, 54, this.timer.delay, this.scoreConfig);
    }

    update() {
        //check for gameOver
        if(this.gameOver) {
            if(Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.scene.restart();
            } else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                this.scene.start("menuScene");
            }
        } else {
            //update everything in game
            this.faster--;
            if(this.faster <= 0) {
             this.faster = 500;
                game.settings.scrollSpeed++;
            }

            this.skyBG.tilePositionX += game.settings.scrollSpeed/4;
            this.mountainBG.tilePositionX += game.settings.scrollSpeed/2;
            this.treeBG.tilePositionX += game.settings.scrollSpeed;
            this.snow.tilePositionX += game.settings.scrollSpeed;

            this.p1.update();
            this.obs1.update();
            this.obs2.update();
            this.obs3.update();
            this.gate1.update();
            this.gate2.update();
            this.tar1.update();

            if (!game.input.mousePointer.isDown){
                mouseDown = true;
            }

            this.tar1.on('pointerdown',() =>{
                if (mouseDown) {
                    console.log('targetHit!');
                    this.timer.delay+=5000;
                    this.totalTime+=5;
                    this.tar1.reset();
                }
                mouseDown = false;
            });

            //update timer
            this.timeLeft.text = Math.round(this.totalTime - this.timer.getElapsedSeconds());

            //check collisions
            if(this.checkCollision(this.p1, this.obs1)) {
                //play hit sound
                //stumble animation
                this.timer.delay-=3000;
                this.totalTime-=3;
                this.obs1.enabled = false;
                //console.log("hit obs1");
            }
            if(this.checkCollision(this.p1, this.obs2)) {
                //play hit sound
                //stumble animation
                this.timer.delay-=3000;
                this.totalTime-=3;
                this.obs2.enabled = false;
                //console.log("hit obs2");
            }
            if(this.checkCollision(this.p1, this.obs3)) {
                //play hit sound
                //stumble animation
                this.timer.delay-=3000;
                this.totalTime-=3;
                this.obs3.enabled = false;
                //console.log("hit obs3");
            }
            if(this.checkCollision(this.p1, this.gate1)) {
                //play gate sound
                this.p1Score += 10;
                this.gate1.enabled = false;
                this.scoreLeft.text = this.p1Score;
            }
            if(this.checkCollision(this.p1, this.gate2)) {
                //play gate sound
                this.p1Score += 10;
                this.gate2.enabled = false;
                this.scoreLeft.text = this.p1Score;
            }
        }
    }

    checkCollision(player, other) {
        if(!(other.enabled)) {
            return false;
        } else if(player.x < other.x + other.width && player.x + player.width > other.x &&
            player.y < other.y + other.height && player.y + player.height > other.y) {
            return true;
        }
    }

    displayGameOver() {
        //game over screen with options to restart or go back to menu
        console.log("game over"); 
        this.scoreConfig.fontSize = "48px";
        this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", this.scoreConfig).setOrigin(.5);
        this.scoreConfig.fontSize = "40px";
        this.playText = this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (↑) to restart the game. ", this.scoreConfig).setOrigin(.5).setInteractive();
        this.playText = this.add.text(game.config.width/2, game.config.height/2 + 128, "Press (↓) to return to the menu.", this.scoreConfig).setOrigin(.5).setInteractive();
        this.gameOver = true;
    }
}