namespace SpriteKind {
    export const bonus = SpriteKind.create()
    export const gun = SpriteKind.create()
    export const boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    game.over(false, effects.melt)
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.rock1, function (sprite, location) {
    level += 1
    make_tilemap(level)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (loaded > 0) {
        if (direction == 1) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
                . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
                . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                . . . . 4 4 2 2 2 2 4 4 . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, ali, 120, 0)
        } else if (direction == 0) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
                . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
                . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                . . . . 4 4 2 2 2 2 4 4 . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, ali, -120, 0)
        }
        loaded += -1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.gun, function (sprite, otherSprite) {
    fireball.destroy(effects.confetti, 500)
    loaded = 5
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.bonus, function (sprite, otherSprite) {
    chest.setImage(img`
        . b b b b b b b b b b b b b b . 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e e 4 4 4 4 4 4 4 4 4 4 e e b 
        b b b b b b b d d b b b b b b b 
        . b b b b b b c c b b b b b b . 
        b c c c c c b c c b c c c c c b 
        b c c c c c c b b c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b b b b b b b b b b b b b b b b 
        b e e e e e e e e e e e e e e b 
        b e e e e e e e e e e e e e e b 
        b c e e e e e e e e e e e e c b 
        b b b b b b b b b b b b b b b b 
        . b b . . . . . . . . . . b b . 
        `)
    pause(200)
    // "otherSprite" variablen kommer fra "of kind bonus"
    otherSprite.destroy(effects.fountain, 100)
    for (let value of wall) {
        // "value" variablen kommer fra "for element"
        tiles.setTileAt(value, myTiles.transparency16)
        tiles.setWallAt(value, false)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ali.vy == 0) {
        ali.vy = -150
    }
})
function make_tilemap (levels: number) {
    if (levels == 1) {
        tiles.setTilemap(tiles.createTilemap(hex`38001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000070000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0908000000000000000000070000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0909090908000000000700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a080000000700000000000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000700000c000000000000000000000001010101010101010101010101010000010000010101020000000000000000000000000000000001010101010101010100000000000000000103030303030303030303030303030303030303030301010101010101050000000000000601010103030303030303010101010101010101010303030303030303030303030303030304040403030303030303030101010101010101010103030303030303030303030303030303030303030303030303030303030303030303030403030303030303040403030303030303030303030303030303030303030303040403030303030303030303040404030303040403030304040304030303030304030403030303030303030303030304040404030303030404030404030303030303030404030404030404030404040404040403030303030403030403030303030303040404040303030304040404040303030404040404030404030303030404030303040404030303030303030303040403040404040404040404030403030303030404030404040404030403030404040304040404030404040404030303030303030303030303030404030303030303030303030303030303030303030303030304040404030303030303040403030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303`, img`
            ........................................................
            ...................2....................................
            ...................2....................................
            .......222.........2....................................
            .........222222....2....................................
            ..............22...2....................................
            ...................2..............22222222222222..2..222
            .................222222222........2.....................
            2222222........222.......2222222222.....................
            ......2222222222........................................
            ........................................................
            ........................................................
            ........................................................
            ........................................................
            ........................................................
            ........................................................
            `, [myTiles.transparency16,sprites.builtin.oceanDepths0,myTiles.tile1,sprites.dungeon.hazardLava0,sprites.dungeon.hazardLava1,sprites.builtin.coral0,sprites.builtin.coral5,sprites.builtin.forestTiles0,sprites.builtin.forestTiles3,sprites.builtin.forestTiles2,sprites.builtin.forestTiles1,sprites.castle.rock1,sprites.castle.saplingOak], TileScale.Sixteen))
        make_boss(33, 7)
    } else if (levels == 2) {
        tiles.setTilemap(tiles.createTilemap(hex`38001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000070000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0908000000000000000000070000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0909090908000000000700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a080000000700000000000000000000000000000000000000000000000000000000000000000000000b0000000000000000000000000000000000000007000000000000000000000000000001010101010101010101010101010000010000010101020000000000000000000000000000000001010101010101010100000000000000000100000000000000000000000000000000000000000001010101010101050000000000000601010100000000000000010101010101010101010000000000000000000000000000000004040400000000000000000101010101010101010100000000000000000000000000000000000000000000000000000000000000000000000400000000000000040400000000000000000000000000000000000000000000040400000000000000000000040404000000040400000004040004000000000004030000000000000000000000000004040404000000000404030404000000000000000404030404000404030404040404040400000000000403030400000000000000040404040000000004040404040303030404040404000404030303030404030303040404000000000000000000040403040404040404040404000400000000000404000404040404030403030404040004040404000404040404000000000000000000000000000404000000000000000000000000000000000000000000000004040404000000000000040400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
            ........................................................
            ...................2....................................
            ...................2....................................
            .......222.........2....................................
            .........222222....2....................................
            ..............22...2....................................
            ...................2..............22222222222222..2..222
            .................222222222........2.....................
            2222222........222.......2222222222.....................
            ......2222222222........................................
            ........................................................
            ........................................................
            ........................................................
            ........................................................
            ........................................................
            ........................................................
            `, [myTiles.transparency16,sprites.builtin.oceanDepths0,myTiles.tile1,sprites.dungeon.hazardLava0,sprites.dungeon.hazardLava1,sprites.builtin.coral0,sprites.builtin.coral5,sprites.builtin.forestTiles0,sprites.builtin.forestTiles3,sprites.builtin.forestTiles2,sprites.builtin.forestTiles1,sprites.castle.rock1], TileScale.Sixteen))
        loaded = 0
        tiles.placeOnRandomTile(ali, myTiles.tile1)
        ghost = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......fd1111111f.......
            ......fdd1111111df......
            ......fddd111111df......
            ......fdddddd111df......
            ......fbddddbfd1df......
            ......fcbbbdcfddbf......
            .......fcbb11111f.......
            ........fffff1b1f.......
            ........fb111cfbf.......
            ........ffb1b1ff........
            ......f.fffbfbf.........
            ......ffffffff..........
            .......fffff............
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(ghost, sprites.builtin.coral0)
        ghost.x += 14
        make_boss(50, 5)
    } else {
        game.over(true, effects.confetti)
    }
}
function make_boss (column: number, row: number) {
    monster = sprites.create(img`
        .....fccccf.....
        ..ccfbb33bbfcc..
        .cb33bbccbb33bc.
        .f3cccbccbccc3f.
        fcbbccbccbccbbcf
        c3ccb11cc11bcc3c
        c3ccc11cc11ccc3c
        .fbbccccccccbbf.
        ..fbbccccccbbf..
        ..ccc1f1f1fccc..
        .c3ff1f1f1fff3c.
        c3ff1f1f1f1fff3c
        f3cc1f1f1f1fcc3f
        fb3cbbfbbfbbc3bf
        bcbb33b33b33bbca
        bbffffffffffff3a
        baacb3ac333aacaa
        aaccb3acbb3aacac
        accbb3acbb3aacac
        bacbb3acb33accaa
        baccb3acb3aacbba
        baacb3acb3aacbba
        baacb3acc33acbba
        baccb33acc3accba
        bacbb.3aac3aacba
        bacb..33ac33acba
        bacb.33aac.aacba
        bacb.3aacc.aacba
        aacb.3acc...acca
        accb.3ac....aaca
        acbb...........a
        acb............a
        `, SpriteKind.boss)
    tiles.placeOnTile(monster, tiles.getTileLocation(column, row))
    boss_life = 3
    boss_pos = row * 16
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 100)
    boss_life += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    // "sprite" variablen kommer fra "of kind Player"
    // "otherSprite" variablen kommer fra "of kind Enemy"
    if (sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.fire, 100)
        chest = sprites.create(img`
            . . b b b b b b b b b b b b . . 
            . b e 4 4 4 4 4 4 4 4 4 4 e b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b b b b b b b d d b b b b b b b 
            c b b b b b b c c b b b b b b c 
            c c c c c c b c c b c c c c c c 
            b e e e e e c b b c e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `, SpriteKind.bonus)
        tiles.placeOnTile(chest, tiles.getTileLocation(7, 2))
        fireball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.gun)
        tiles.placeOnTile(fireball, tiles.getTileLocation(20, 6))
    } else {
        game.over(false, effects.melt)
    }
})
let boss_pos = 0
let boss_life = 0
let monster: Sprite = null
let chest: Sprite = null
let fireball: Sprite = null
let projectile: Sprite = null
let direction = 0
let loaded = 0
let ghost: Sprite = null
let ali: Sprite = null
let wall: tiles.Location[] = []
let level = 0
level = 1
make_tilemap(level)
// En liste over alle de lokationer af blokke vi gerne vil fjerne efter vi har dræbt vores "ENEMY"
wall = tiles.getTilesByType(sprites.builtin.forestTiles0)
ali = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f f f . . . . 
    . . . . f f e e e e f 2 f . . . 
    . . . f f e e e e f 2 2 2 f . . 
    . . . f e e e f f e e e e f . . 
    . . . f f f f e e 2 2 2 2 e f . 
    . . . f e 2 2 2 f f f f e 2 f . 
    . . f f f f f f f e e e f f f . 
    . . f f e 4 4 e b f 4 4 e e f . 
    . . f e e 4 d 4 1 f d d e f . . 
    . . . f e e e 4 d d d d f . . . 
    . . . . 4 d d e 4 4 4 e f . . . 
    . . . . e d d e 2 2 2 2 f . . . 
    . . . . f e e f 4 4 5 5 f f . . 
    . . . . f f f f f f f f f f . . 
    . . . . . f f . . . f f f . . . 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(ali, myTiles.tile1)
controller.moveSprite(ali, 100, 0)
ali.ay = 300
scene.cameraFollowSprite(ali)
ghost = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......fd1111111f.......
    ......fdd1111111df......
    ......fddd111111df......
    ......fdddddd111df......
    ......fbddddbfd1df......
    ......fcbbbdcfddbf......
    .......fcbb11111f.......
    ........fffff1b1f.......
    ........fb111cfbf.......
    ........ffb1b1ff........
    ......f.fffbfbf.........
    ......ffffffff..........
    .......fffff............
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Enemy)
tiles.placeOnRandomTile(ghost, sprites.builtin.coral0)
ghost.x += 14
loaded = 0
direction = 1
game.onUpdate(function () {
    if (ali.y > 200) {
        game.over(false, effects.melt)
    }
    if (ghost.tileKindAt(TileDirection.Left, sprites.builtin.coral0)) {
        ghost.vx = 50
        ghost.setImage(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......fd1111111f.......
            ......fdd1111111df......
            ......fddd111111df......
            ......fdddddd111df......
            ......fbddddbfd1df......
            ......fcbbbdcfddbf......
            .......fcbb11111f.......
            ........fffff1b1f.......
            ........fb111cfbf.......
            ........ffb1b1ff........
            ......f.fffbfbf.........
            ......ffffffff..........
            .......fffff............
            ........................
            ........................
            ........................
            ........................
            `)
    } else if (ghost.tileKindAt(TileDirection.Right, sprites.builtin.coral5)) {
        ghost.vx = -50
        ghost.setImage(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f1111111df.......
            ......fd1111111ddf......
            ......fd111111dddf......
            ......fd111ddddddf......
            ......fd1dfbddddbf......
            ......fbddfcdbbbcf......
            .......f11111bbcf.......
            .......f1b1fffff........
            .......fbfc111bf........
            ........ff1b1bff........
            .........fbfbfff.f......
            ..........ffffffff......
            ............fffff.......
            ........................
            ........................
            ........................
            ........................
            `)
    }
    if (controller.right.isPressed()) {
        direction = 1
        ali.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . 4 d d e 4 4 4 e f . . . 
            . . . . e d d e 2 2 2 2 f . . . 
            . . . . f e e f 4 4 5 5 f f . . 
            . . . . f f f f f f f f f f . . 
            . . . . . f f . . . f f f . . . 
            `)
    } else if (controller.left.isPressed()) {
        direction = 0
        ali.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d e e e e e f . . . 
            . . . f e 4 e d d 4 f . . . . . 
            . . . f 2 2 e d d e f . . . . . 
            . . f f 5 5 f e e f f f . . . . 
            . . f f f f f f f f f f . . . . 
            . . . f f f . . . f f . . . . . 
            `)
    }
    if (loaded > 0) {
        ali.say(loaded)
    } else {
        ali.say("")
    }
    if (boss_life <= 0) {
        monster.destroy(effects.warmRadial, 500)
    }
    if (monster.top <= boss_pos - 64) {
        monster.vy = 50
    } else if (monster.bottom >= boss_pos) {
        monster.vy = -50
    }
})
