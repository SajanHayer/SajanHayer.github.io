/*
if wanted:
attack box increase for player? but i dont think it needs this
*/

//variables set to canvas and the context (how it will be on the screen)
const canvas = document.querySelector('canvas');     //geting a element from our html file
const c = canvas.getContext('2d');                   //getting canvas context used for sprites and characters in game 3d or 2d

//resizing canvas size
canvas.width = 1024 //changes canvas size
canvas.height = 576
//16:9 ratio 

//changing canvas colour
//c variable will be used to create images on the screen 
c.fillRect(0,0, canvas.width, canvas.height)  //fix 

//creating gravity
const gravity = 0.9

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './City3_paleResized.png'
    
})


//creating player
//send object to class so we can have it in 2d
const player = new Fighter({
    position: {x: 50, y: 0},
    //hit box stuff 
    width: 60,
    height: 150,
    velocity: {x: 0 ,y: 0},
    offset:{x: 50, y:0},
    //animation stuff
    imageSrc: './Martial_Hero/Sprites/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {x: 215, y: 180},
    sprites:{
        idle:{
            imageSrc: './Martial_Hero/Sprites/Idle.png',
            framesMax: 8 
        },
        run:{
            imageSrc: './Martial_Hero/Sprites/Run.png',
            framesMax: 8 
        },
        jump:{
            imageSrc: './Martial_Hero/Sprites/Jump.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './Martial_Hero/Sprites/Fall.png',
            framesMax: 2
        },
        attack1:{
            imageSrc: './Martial_Hero/Sprites/Attack1.png',
            framesMax: 6
        },
        takeHit:{
            imageSrc: './Martial_Hero/Sprites/Take Hit - white silhouette.png',
            framesMax: 4
        },
        Death:{
            imageSrc: './Martial_Hero/Sprites/Death.png',
            framesMax: 6
        },
        //flipped images face left
        idleFlipped:{
            imageSrc: './Martial_Hero/Sprites/IdleFlipped.png',
            framesMax: 8 
        },
        runFlipped:{
            imageSrc: './Martial_Hero/Sprites/RunFlipped.png',
            framesMax: 8 
        },
        jumpFlipped:{
            imageSrc: './Martial_Hero/Sprites/JumpFlipped.png',
            framesMax: 2
        },
        fallFlipped:{
            imageSrc: './Martial_Hero/Sprites/FallFlipped.png',
            framesMax: 2
        },
        attack1Flipped:{
            imageSrc: './Martial_Hero/Sprites/Attack1Flipped.png',
            framesMax: 6
        },
        takeHitFlipped:{
            imageSrc: './Martial_Hero/Sprites/Take Hit - white silhouetteFlipped.png',
            framesMax: 4
        },
        DeathFlipped:{
            imageSrc: './Martial_Hero/Sprites/DeathFlipped.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {x: 0, y: 25},
        width: 250,
        height: 50,
        offsetFlipped: {x: -200, y:23}
    }

})

//enemy creation
const enemy = new Fighter ({
    //hitbox stuff
    position: {x: 400, y: 100},
    width: 55,
    height: 150, 
    velocity:{x: 0, y: 0},
    offset:{x: 0, y:0},
    //animation stuff
    imageSrc: './Wizard_Pack/IdleFlipped.png',
    flipped: 1,
    framesMax: 6,
    scale: 1.7,
    offset: {x: 177,y: 114},
    sprites:{
        idle:{
            imageSrc: './Wizard_Pack/IdleFlipped.png',
            framesMax: 6,
            
        },
        run:{
            imageSrc: './Wizard_Pack/RunFlipped.png',
            framesMax: 8,
            
        },
        jump:{
            imageSrc: './Wizard_Pack/JumpFlipped.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './Wizard_Pack/FallFlipped.png',
            framesMax: 2
        },
        attack1:{
            imageSrc: './Wizard_Pack/Attack2Flipped.png',
            framesMax: 8
        },
        takeHit:{
            imageSrc: './Wizard_Pack/HitFlipped.png',
            framesMax: 4
        },
        Death:{
            imageSrc: './Wizard_Pack/DeathFlipped.png',
            framesMax: 7
        },
        //flipped images
        idleFlipped:{
            imageSrc: './Wizard_Pack/Idle.png',
            framesMax: 6,
            
        },
        runFlipped:{
            imageSrc: './Wizard_Pack/Run.png',
            framesMax: 8,
            
        },
        jumpFlipped:{
            imageSrc: './Wizard_Pack/Jump.png',
            framesMax: 2
        },
        fallFlipped:{
            imageSrc: './Wizard_Pack/Fall.png',
            framesMax: 2
        },
        attack1Flipped:{
            imageSrc: './Wizard_Pack/Attack2.png',
            framesMax: 8
        },
        takeHitFlipped:{
            imageSrc: './Wizard_Pack/Hit.png',
            framesMax: 4
        },
        DeathFlipped:{
            imageSrc: './Wizard_Pack/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {x: -155,y: -25},
        width: 120,
        height: 76,
        offsetFlipped: {x: 95, y:-25}
    }
    

})

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
    
}

decreaseTimer()
//check if players are in front of each other
function checkPlayer(){
    return player.position.x + player.width <= enemy.position.x + enemy.width
}

function floorCheck(player1){
    x = 0 //increase floor or decrease floor height 
    return player1.position.y + player1.height >= canvas.height - x
}

function checkRightWall(player1){
    x = 23 //move how far you want the player to be to wall
    return player1.position.x + player1.width <= canvas.width - x
}

function checkLeftWall(player1){
    x = 5 //how far from left wall
    return player1.position.x >= 0 + x
}

function animate(){
    window.requestAnimationFrame(animate)  //what function do i want to loop over and over again 
    //call animate and creates a infinite loop
    
    //clear canvas every frame
    c.fillStyle = 'black'  //change background back to black since we used red for our characters
    c.fillRect(0,0 ,canvas.width,canvas.height)
    background.update()
    //update player and eneym every frame
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    //better way to implement movement creates less error
    //player movement
    if(checkPlayer()){
        if(keys.a.pressed && player.lastkey === 'a' && checkLeftWall(player)){
            player.velocity.x = -5 //set how far you want the player to move
            player.switchSprite('run')
        } else if (keys.d.pressed && player.lastkey === 'd' && checkRightWall(player)){
            player.velocity.x = 5
            player.switchSprite('run')
        }else{
            player.switchSprite('idle')
        }
    } else{
        if(keys.a.pressed && player.lastkey === 'a' && checkLeftWall(player)){
            player.velocity.x = -5 //set how far you want the player to move
            player.switchSprite('runFlipped')
        } else if (keys.d.pressed && player.lastkey === 'd' && checkRightWall(player)){
            player.velocity.x = 5
            player.switchSprite('runFlipped')
        }else{
            player.switchSprite('idleFlipped')
        }
    }

    
    //enemy movement(
    if(checkPlayer()){
        if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'  && checkLeftWall(enemy)){
            enemy.velocity.x = -5
            enemy.switchSprite('run')
        } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight' && checkRightWall(enemy)){
            enemy.velocity.x = 5
            enemy.switchSprite('run')
        }else{
            enemy.switchSprite('idle')
        }
    }else{
        if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'  && checkLeftWall(enemy)){
            enemy.velocity.x = -5
            enemy.switchSprite('runFlipped')
        } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight' && checkRightWall(enemy)){
            enemy.velocity.x = 5
            enemy.switchSprite('runFlipped')
        }else{
            enemy.switchSprite('idleFlipped')
        }
    }

    //jumping movement
    if(player.velocity.y < 0){
        if(checkPlayer()){player.switchSprite('jump')}
        else{player.switchSprite('jumpFlipped')}
    }else if(player.velocity.y > 0){
        if(checkPlayer()){player.switchSprite('fall')}
        else{player.switchSprite('fallFlipped')}
    }

    if(enemy.velocity.y < 0){
        if(checkPlayer()){enemy.switchSprite('jump')}
        else{enemy.switchSprite('jumpFlipped')}
    }else if(enemy.velocity.y > 0){
        if(checkPlayer()){enemy.switchSprite('fall')}
        else{enemy.switchSprite('fallFlipped')}
    }
    
    if(keys.ArrowUp.pressed && floorCheck(enemy)){   //jumping mechanic the second statment checks if you are on the ground 
        enemy.velocity.y = -20
    }

    if(keys.w.pressed && floorCheck(player)){
        player.velocity.y = -20
    }


    detectAttack()

//if either players health reach 0, end the game
    if(enemy.health <= 0 || player.health <= 0){
        winner({player, enemy, timerId})
    }
}

animate()

function detectAttack(){
    //detect for collison and enemy gets hit
    if(rectangularCollision({
            rectangle1: player,
            rectangle2: enemy}) && player.isAttacking && playerFrames(player)){
        enemy.takeHit()
        player.isAttacking = false
        //enemy.health -= 20
        //document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    //player misses
    if(player.isAttacking && playerFrames(player)){
        player.isAttacking = false
    }

    //enemy attack and player get hit
    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking && enemyFrames(enemy)){
        player.takeHit()                        
        enemy.isAttacking = false
        //player.health -=20
       // document.querySelector('#playerHealth').style.width = player.health + '%'
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    //enemy misses
    if(enemy.isAttacking && enemyFrames(enemy)){
        enemy.isAttacking = false
    }
}

//player attack
function playerFrames(player1){
    if(checkPlayer()){return player1.framesCurrent === 4}
    else{return player1.framesCurrent === 1}
}


//enemy attack
function enemyFrames(player1){
    if(checkPlayer()){return player1.framesCurrent < 2}
    else{return player1.framesCurrent === 5}
}

//adding movement through event listeners 
//keydown represents pressing k
window.addEventListener('keydown', (event) =>{
    if(!player.dead){
    //swtich statement multiple cases and what happens with them 
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            //player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break
    }
}
    if(!enemy.dead){
    switch(event.key){
        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            break  
        case  'l':
            enemy.attack()
            break 
    }
}
})

//key up when you stop pressing key
window.addEventListener('keyup', (event) =>{
    //swtich statement multiple cases and what happens with them 
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }
    //enemy keys
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break

    }
})

