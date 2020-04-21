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
            fontSize: "26px",
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

        this.add.text(centerX, centerY - textSpacer, "Alpine Adventure", menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        //this.add.text(centerX, centerY + textSpacer, "Press <- for Easy and  -> for Hard", menuConfig).setOrigin(.5);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //launches next scene
        //this.scene.start("playScene");
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            
        }
    }
}
