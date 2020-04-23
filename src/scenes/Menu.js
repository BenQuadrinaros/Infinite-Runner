class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio files
        //this.load.audio("sfx_select", "./assets/blip_select12.wav");
    }
    
    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "32px",
            backgroundColor: "#F3B141",
            color: "#843605",
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

        // (↑) & (↓)
        menuConfig.fontSize = "48px";
        this.add.text(centerX, centerY - (2.5*textSpacer), "Alpine Adventure", menuConfig).setOrigin(.5);
        menuConfig.fontSize = "32px";
        this.playText = this.add.text(centerX, centerY + textSpacer, "Click here or press (↑) \nto start Alpine Adventure.", menuConfig).setOrigin(.5).setInteractive();
        this.instructionsText = this.add.text(centerX, centerY + (2.5*textSpacer), "Click here or press (↓) \nfor gameplay instructions.", menuConfig).setOrigin(.5).setInteractive();

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //left mouse click assignment

        //launches next scene
        //this.scene.start("playScene");
    }

    update() {
        
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("instructionScene");
        }
        this.playText.on('pointerdown',() => {
            this.scene.start("playScene");
        });
        this.instructionsText.on('pointerdown',() => {
                this.scene.start("instructionScene");
        });
    }
}
