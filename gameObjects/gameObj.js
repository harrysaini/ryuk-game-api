var gameMap = {};


function setGameObjectInMap(id , obj){
	gameMap[id] = obj;
}


function getGameObjectFromMap(id){
	return gameMap[id];
}


module.exports = {
	setGameObjectInMap : setGameObjectInMap,
	getGameObjectFromMap : getGameObjectFromMap
}