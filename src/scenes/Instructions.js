class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }

    preload() {
        this.load.image('player','./assets/player.png');
        this.load.image('obstacle','./assets/stump.png');
        this.load.image('gate','./assets/slalomGate.png');
        this.load.image('target','./assets/target.png');

        this.load.audio("menuSelect", "./assets/menuSelect.wav");
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "18px",
            backgroundColor: "#F0F0F0",
            color: "#2020F0",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //(↑) & (↓)
        this.add.text(centerX, centerY + (2.75*textSpacer), "Use (↑) & (↓) arrows or (W) & (S) keys\nto move.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + (.25*textSpacer), "Ski through gates to earn points.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY - (.75*textSpacer), "Press (Space) when targets are in the reticle to gain time.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY - (1.75*textSpacer), "Dodge obstacles to avoid losing time.", menuConfig).setOrigin(.5);
        menuConfig.fontSize = "32px";
        this.backText = this.add.text(centerX, centerY - (3*textSpacer), "Click here or press (↓)\nto go back to the menu.", menuConfig).setOrigin(.5).setInteractive();

        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        menuConfig.fontSize = "12px";

        this.p1 = this.add.sprite(game.config.width/5,3*game.config.height/5 + 35,"player");
        this.add.text(game.config.width/5,3*game.config.height/5+85,'Player',menuConfig).setOrigin(.5);
        this.p1.setScale(2, 2);

        this.obs = this.add.sprite(2*game.config.width/5,3*game.config.height/5 + 35,"obstacle");
        this.add.text(2*game.config.width/5,3*game.config.height/5+85,'Obstacle',menuConfig).setOrigin(.5);
        this.obs.setScale(2, 2);

        this.add.text(3*game.config.width/5,3*game.config.height/5+85,'Gate',menuConfig).setOrigin(.5);
        this.gate = this.add.sprite(3*game.config.width/5,3*game.config.height/5 + 35,"gate");
        this.gate.setScale(2, 2);

        this.tar = this.add.sprite(4*game.config.width/5,3*game.config.height/5 + 35,"target");
        this.add.text(4*game.config.width/5,3*game.config.height/5+85,'Target',menuConfig).setOrigin(.5);
        this.tar.setScale(2, 2);

        this.singleClick = 0;
    }

    update() {
        if(game.input.mousePointer.isDown){
            this.singleClick++;
        } else if(!(game.input.mousePointer.isDown)){
            this.singleClick = 0;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play("menuSelect");
            this.time.addEvent({
                delay:1300,
                callback: () => {this.scene.start("menuScene")},
                loop:false,
                callbackScope:this
            });
        }
        if(this.singleClick == 1) {
            this.backText.on('pointerdown',() => {
                this.sound.play("menuSelect");
                this.time.addEvent({
                    delay:1300,
                    callback: () => {this.scene.start("menuScene")},
                    loop:false,
                    callbackScope:this
                });
            });
        }
    }
}