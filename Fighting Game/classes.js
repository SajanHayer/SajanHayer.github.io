//creating players neeeds to be OOP as they need to interacte with other things in the game 
class Sprite{
    //object in constructor so u dont need both position and velocity
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y:0}}, flipped){
        //position for the player 
        this.position = position
        this.width = 50
        this.height = 150
        //built in 
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale

        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5

        this.offset = offset
        this.flipped = flipped
    }

    frameUp(){
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax-1){
                this.framesCurrent++    
            }else{
                this.framesCurrent = 0
            }
        }
    }

    frameDown(){
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent > 0){
                this.framesCurrent--    
            }else{
                this.framesCurrent = this.framesMax -1
            }
    }
    }

    animateFrames(){
        this.framesElapsed++
        //checks if players are past each other
        if(checkPlayer()){
            if(this.flipped == 1){
                this.frameDown()
            } 
            else{ 
                this.frameUp()
            }
        }else{
            if(this.flipped == 1){
                this.frameUp()
            } 
            else{ 
                this.frameDown()
            }
        }
    }
    //drawing sprite
    draw(){
        c.drawImage(
            this.image,
            //x positon
            this.framesCurrent * (this.image.width/this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.image.width/this.framesMax * this.scale,
            this.image.height * this.scale
        )
    }

    //function to update sprites or charcters
    update(){
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite{
    //object in constructor so u dont need both position and velocity
    constructor({
        position,
        width,
        height, 
        velocity, 
        colour, 
        imageSrc, 
        scale = 1,
        flipped,
        framesMax =1, 
        offset = {x: 0, y:0},
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined, offsetFlipped: {}}
        }){
        
        
        //calls constructor from parent class
        super({
            position,
            imageSrc,
            scale,
            flipped,
            framesMax,
            offset,
        }) 
        
        //position for the player 
        this.position = position
        this.velocity = velocity
        this.width = width
        this.height = height
        this.lastkey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,   //offset: offset
            width: attackBox.width,
            height: attackBox.height,
            offsetFlipped: attackBox.offsetFlipped
        }
        this.colour = colour
        this.isAttacking
        this.health = 100
        //frames stuff
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        
        this.flipped = flipped
        this.dead = false
        //defining imgae list in sprite
        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
    
    //death animation count
    deathNormal(){
    if(this.framesCurrent === this.sprites.Death.framesMax-1)
                this.dead = true
    }

    deathFlipped(){
        if(this.framesCurrent === 0){
            this.dead = true
        }
    }

   
   switchSprite(sprite){
    
    //death
    if(this.dead === true){
        return
    }
    else if(this.checkPlayer()){
        if(this.image === this.sprites.Death.image){
            if(this.flipped === 1){this.deathFlipped()}
            else{this.deathNormal()}
            return
        }
    }
    else{
        if(this.image === this.sprites.DeathFlipped.image){
            if(this.flipped === 1){
                if(this.framesCurrent === this.sprites.DeathFlipped.framesMax-1){this.dead = true}
            }
            else{this.deathFlipped()}
            return
        }
    }
    

    //overrides animation with attack or take hit
    if(this.checkPlayer()){
        if(this.flipped === 1){
            //attack
            if(this.image === this.sprites.attack1.image && this.framesCurrent > 0){return}
            //takehit
            if(this.image === this.sprites.takeHit.image && this.framesCurrent > 0){return}
        }
        else{
            //attack
            if(this.image === this.sprites.attack1.image&& this.framesCurrent < this.sprites.attack1.framesMax - 1){return}
            //take hit
            if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1){return}
        }

    }else{
        if(this.flipped === 1){
            //attack
            if(this.image === this.sprites.attack1Flipped.image && this.framesCurrent < this.sprites.attack1Flipped.framesMax - 1){return}
            //take hit
            if(this.image === this.sprites.takeHitFlipped.image && this.framesCurrent < this.sprites.takeHitFlipped.framesMax - 1){return}

        }
        else{
            //attakc
            if(this.image === this.sprites.attack1Flipped.image && this.framesCurrent > 0){return}
            //take hit
            if(this.image === this.sprites.takeHitFlipped.image && this.framesCurrent > 0){return}

        }
    }

    switch(sprite){
        case 'idle':
            if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.caseFlipped()

        }
            break
        case 'run':
            if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.caseFlipped()
            }
            break
        case 'jump':
            if(this.image !== this.sprites.jump.image){
                if(this.flipped === 1)
                    this.framesCurrent = this.sprites.jump.framesMax -1
                else
                    this.framesCurrent = 0
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax 
            }
            break
        case 'fall':
            if(this.image !== this.sprites.fall.image){
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.caseFlipped()
            }
            break
        case 'attack1':
            if(this.image !== this.sprites.attack1.image){
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.caseFlipped()
            }
            break
        case 'takeHit':
            if(this.image !== this.sprites.takeHit.image){
                this.image = this.sprites.takeHit.image
                this.framesMax = this.sprites.takeHit.framesMax
                this.caseFlipped()
            }
            break 
        case 'Death':
            if(this.image !== this.sprites.Death.image){
                this.image = this.sprites.Death.image
                this.framesMax = this.sprites.Death.framesMax
                this.caseFlipped()
            }
            break    
    

    //flipped cases
   
        case 'idleFlipped':
            if(this.image !== this.sprites.idleFlipped.image){
                this.image = this.sprites.idleFlipped.image
                this.framesMax = this.sprites.idleFlipped.framesMax
                this.caseFlipped()
        }
            break
        case 'runFlipped':
            if(this.image !== this.sprites.runFlipped.image){
                this.image = this.sprites.runFlipped.image
                this.framesMax = this.sprites.runFlipped.framesMax
                this.caseFlipped()
            }
            break

        case 'jumpFlipped':
            if(this.image !== this.sprites.jumpFlipped.image){
                if(this.flipped === 1)
                    this.framesCurrent = this.sprites.jumpFlipped.framesMax -1
                else
                    this.framesCurrent = 0
                this.image = this.sprites.jumpFlipped.image
                this.framesMax = this.sprites.jumpFlipped.framesMax 
            }
            break
        case 'fallFlipped':
            if(this.image !== this.sprites.fallFlipped.image){
                this.image = this.sprites.fallFlipped.image
                this.framesMax = this.sprites.fallFlipped.framesMax
                this.caseFlipped()
            }
            break
        case 'attack1Flipped':
            if(this.image !== this.sprites.attack1Flipped.image){
                this.image = this.sprites.attack1Flipped.image
                this.framesMax = this.sprites.attack1Flipped.framesMax
                this.caseFlipped()
            }
            break
        case 'takeHitFlipped':
            if(this.image !== this.sprites.takeHitFlipped.image){
                this.image = this.sprites.takeHitFlipped.image
                this.framesMax = this.sprites.takeHitFlipped.framesMax
                this.caseFlipped()
            }
            break 
        case 'DeathFlipped':
            if(this.image !== this.sprites.DeathFlipped.image){
                this.image = this.sprites.DeathFlipped.image
                this.framesMax = this.sprites.DeathFlipped.framesMax
                this.caseFlipped()
            }
            break    
    }
   }

    caseFlipped(){
        if(this.checkPlayer()){
            if(this.flipped === 1)
                        this.framesCurrent = this.framesMax-1
                    else
                        this.framesCurrent = 0
        } else{
            //flip animation
            if(this.flipped === 1)
                this.framesCurrent = 0
            else
                this.framesCurrent = this.framesMax-1
            
        }
    }


    //function to update sprites or charcters
    update(){
        this.draw()
        if(this.dead != true){
            this.animateFrames()       
        }
        //attack box creation
        if(this.checkPlayer()){
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x   //have offset so that enemys attack box will face the left 
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        }
        else{
            this.attackBox.position.x = this.position.x + this.attackBox.offsetFlipped.x   //flip attack boxes when characters go on either side 
            this.attackBox.position.y = this.position.y + this.attackBox.offsetFlipped.y 
        }
        //shows attack boxes on screen
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        
        /*
        // Show player hitboxes
        c.fillRect(player.position.x, player.position.y, player.width, player.height)
        c.fillRect(enemy.position.x, enemy.position.y, enemy.width, enemy.height)
        /**/

        //if(this.animateFrames && (this.takeHit))
        this.position.x += this.velocity.x  //moves character on x axis
        this.position.y += this.velocity.y //moves characte(r down with given velocity through construvto 0 is at the top
         
        //gravity
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            this.position.y = 426
        } else{
            this.velocity.y += gravity
        }   //only want to add gravity if u above the bottom of the canvas
        
    }

    attack(){
        if(this.checkPlayer()){this.switchSprite('attack1')}
        else{this.switchSprite('attack1Flipped')}
        this.isAttacking = true
        //after 100ms isAttacking will be set to false with arrow function
        /*setTimeout(() =>{
            this.isAttacking = false
        }, 100)*/
    }

    takeHit(){    
        this.health -=20 
        if(this.checkPlayer()){
            if(this.health <= 0){this.switchSprite('Death')}
            else{this.switchSprite('takeHit')}
        }else{
            if(this.health <= 0){this.switchSprite('DeathFlipped')}
            else{this.switchSprite('takeHitFlipped')}
        }
    }

    checkPlayer(){
        return player.position.x + player.width <= enemy.position.x + enemy.width
    }
}