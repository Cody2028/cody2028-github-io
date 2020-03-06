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
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 105},
                { "type": "sawblade", "x": 900, "y": groundY - 105},
                { "type": "sawblade", "x": 1600, "y": groundY - 105},
                { "type": "sawblade", "x": 2400, "y": groundY - 105},
                 { "type": "sawblade", "x": 3100, "y": groundY - 105},
                { "type": "spikes", "x": 700, "y": groundY - 15},
                { "type": "spikes", "x": 1100, "y": groundY - 15},
                { "type": "spikes", "x": 2000, "y": groundY - 15},
                 { "type": "spikes", "x": 3600, "y": groundY - 15},
                { "type": "enemy", "x": 600, "y": groundY - 50},
                { "type": "enemy", "x": 2000, "y": groundY - 50},
                { "type": "enemy", "x": 2700, "y": groundY - 50},
                 { "type": "enemy", "x": 3900, "y": groundY - 50},
                { "type": "reward", "x": 300, "y": groundY - 130},
                { "type": "reward", "x": 1200, "y": groundY - 130},
                { "type": "reward", "x": 1800, "y": groundY - 130},
                 { "type": "reward", "x": 2800, "y": groundY - 130},
                 { "type": "reward", "x": 4000, "y": groundY - 130}
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
     
     // Sawblades  
       function createSawBlade (x, y) {
   
	        var hitZoneSize = 25;
			var damageFromObstacle = 10;
			var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);		
			sawBladeHitZone.x = x;
			sawBladeHitZone.y = y;
			
			game.addGameItem(sawBladeHitZone);    
			
		        var obstacleImage = draw.bitmap('img/sawblade.png');
			sawBladeHitZone.addChild(obstacleImage);		
			obstacleImage.x = -25;
			obstacleImage.y = -25;
		}
		
	  // 		createSawBlade(400, groundY - 115);
	  //      createSawBlade(600, groundY - 110);
	  //     createSawBlade(800, groundY - 110);
     
      
       for (var key = 0; key < levelData.gameItems.length; key++) {
		    var gameItemObject = levelData.gameItems[key];
		    if (gameItemObject.type === 'sawblade') {
		        createSawBlade(gameItemObject.x, gameItemObject.y);
		    }
		   
		   	if (gameItemObject.type === 'spikes') {
		        createSpikes(gameItemObject.x, gameItemObject.y);
		    }
		    
		    if (gameItemObject.type === 'enemy') {
		        createEnemy(gameItemObject.x, gameItemObject.y);
		    }
		    
		    if (gameItemObject.type === 'reward') {
		        createReward(gameItemObject.x, gameItemObject.y);
		    }
		  	   
		}
       
     // Spikes   
       function createSpikes(x,y) {
		    var hitZoneSize = 20;
		    var damageFromObstacle = 10;
		    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);	    
		    sawBladeHitZone.x = x;
		    sawBladeHitZone.y = y;
		    
		    game.addGameItem(sawBladeHitZone);    
		    
		    var obstacleImage = draw.bitmap('img/spikes.png');
		    sawBladeHitZone.addChild(obstacleImage);	    
		    obstacleImage.x = -50;
		    obstacleImage.y = -25;
		    obstacleImage.scaleX = .2
		    obstacleImage.scaleY = .2
		};
	
	 // enemies 	
       function createEnemy(x,y) {
			var enemy =  game.createGameItem('enemy',25);
			enemy.x = x;
			enemy.y = y;
			enemy.velocityX = -1;
			
			//var redSquare = draw.rect(50,50,'red');
			var redSquare = draw.bitmap('img/ltblueghost.png');
			redSquare.x = -25;
			redSquare.y = -25;
			redSquare.scaleX = .3
			redSquare.scaleY = .3
			enemy.addChild(redSquare);
			
			game.addGameItem(enemy);
       
	       enemy.onPlayerCollision = function() {
			    game.changeIntegrity(-30);
			    enemy.fadeOut();
			};
		
			enemy.onProjectileCollision = function () {
			    game.increaseScore(50);
			    game.changeIntegrity(20);
			    enemy.fadeOut();
			};
		
       }
       
       // reward
        function createReward (x,y) {
            var reward = game.createGameItem('reward', 20);
                reward.x = x;
                reward.y = y;
                reward.velocityX = -1.5;
                
            var coin = draw.bitmap('img/coin.png');
                coin.x = -20;
                coin.y = -20;
                coin.scaleX = .2
				coin.scaleY = .2
                
            reward.addChild(coin);
            
            game.addGameItem(reward);
            
            reward.onPlayerCollision = function() {
                game.increaseScore(30);
                reward.fadeOut();
            };
        }
       

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
