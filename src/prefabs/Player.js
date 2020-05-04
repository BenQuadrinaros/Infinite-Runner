class Player extends Phaser.GameObjects.Sprite {
    
    moveable = true;

    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
    }

    update(){
        //w or up Arrow - move up
        if ((keyUP.isDown || keyW.isDown) && this.moveable){
            //make sure player stays in bottom half of screen
            if (this.y > game.config.width/3 + 20){
            //move player up
             this.y-=game.settings.scrollSpeed/2;
            }
        }
        //s key or down arrow - move down
        if ((keyDOWN.isDown || keyS.isDown) && this.moveable){
            //make sure player does not go off screen
            if (this.y<=game.config.height - this.height){
                this.y+=game.settings.scrollSpeed/2;
            }
        }
    }

}