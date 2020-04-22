class Player extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.moveDistance = 5;
    }

    update(){
        //w or up Arrow - move up
        if (keyUP.isDown || keyW.isDown){
            //make sure player stays in bottom half of screen
            if (this.y >game.config.height/2 + 30){
            //move player up
             this.y-=this.moveDistance;
            }
        }
        //s key or down arrow - move down
        if (keyDOWN.isDown || keyS.isDown){
            //make sure player does not go off screen
            if (this.y<=game.config.height-30){
                this.y+=this.moveDistance;
            }
        }
    }

}