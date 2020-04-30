class Target extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type) {
        super(scene, x, y, texture, frame, type);
        scene.add.existing(this);
        this.enabled = true;
        this.tarType = type;
    }

    update() {

            this.x -= game.settings.scrollSpeed * .7;
            if (this.x <= game.config.width/2) {
                this.reset();
            }

    }

    reset() {
        this.y = 180.0;
        this.x = game.config.width + Math.round(Math.random() * 200);
        this.enabled = true;
        this.alpha = 1;
    }


}