var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:150},
                {type: 'sawblade',x:1200,y:groundY},
                {type: 'sawblade',x:1500,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:150},
                {type: 'spark', x:1800,y:groundY},
                {type: 'enemy', x:1500,y:groundY-50},
                {type: 'enemy', x:1800,y:groundY-50},
                {type: 'enemy', x:1000,y:groundY-50}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            game.addGameItem(myObstacle);  
        } 
        function createSpark(x,y) {
            var hitZoneSize = 50;
            var damageFromObstacle = 50;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            var obstacleImage = draw.bitmap('img/op-spark-logo.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -175;
            obstacleImage.y = -50;
            game.addGameItem(myObstacle);  
            
        } 
        
        function createEnemy(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;//400;
            enemy.y = y; //groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-40);
                enemy.fadeOut();
                
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                enemy.shrink();
                
                
        };
        }
        
        function createReward(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'yellow');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;//400;
            enemy.y = y; //groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 20;
            enemy.onPlayerCollision = function() {
                game.increaseScore(1000);
                enemy.fadeOut();
                
            };
        }
        createReward(2000, groundY-125);
        
        for (var item in levelData.gameItems) {
            if (levelData.gameItems[item].type === "sawblade")
            {
                createSawBlade(levelData.gameItems[item].x, levelData.gameItems[item].y);
            }
            else if (levelData.gameItems[item].type === "spark")
            {
                createSpark(levelData.gameItems[item].x, levelData.gameItems[item].y);
            }
            else if (levelData.gameItems[item].type === "enemy")
            {
                createEnemy(levelData.gameItems[item].x, levelData.gameItems[item].y);
            }
        }
        
        
        

    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}