class Target extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type) {
        super(scene, x, y, texture, frame, type);
        scene.add.existing(this);
        this.enabled = true;
        this.tarType = type;
    }

    update() {
        if (this.tarType === 0) {
            this.x -= game.settings.scrollSpeed * .7;
            if (this.x <= -this.width - 20) {
                this.reset();
            }
        }
        if (this.tarType === 1) {
            this.x -= game.settings.scrollSpeed * .7;
            if (this.y > game.config.height / 4) {
                this.y -= game.settings.scrollSpeed * .1;
            }else if (this.y < game.config.height / 2 + game.config.height/8) {
                this.y += game.settings.scrollSpeed * .1;
            }
            if (this.x <= -this.width - 20) {
                this.reset();
            }
        }
    }

    reset() {
        this.y = Math.round(game.config.height/4 + (Math.random() * game.config.height / 4));
        this.x = game.config.width + Math.round(Math.random() * 60);
        this.enabled = true;
    }


}