//create database instances (new instance per room)
var Data = function(paramsHash){
  this.roomname = paramsHash.roomname || 'lobby';

  this._storage = [];
    // store messages with key of createdAt
};

//add message to data
Data.prototype.add = function(message){
  //possible future feature: resolving collisions within the same millisecond occur
  this._storage[message.createdAt] = message;
};

//retrieve most recent x messages
Data.prototype.retrieve = function(paramsHash){
  //paramsHash: limit (default to most recent 100 among createdAt), username, search text
  var limit = paramsHash.limit || 100;
  var order = paramsHash.order || 'createdAt';
  var len = this._storage.length;
  var terminus = len > limit ? len - limit : 0;
  if( order === 'createdAt' ){
    return this._storage.slice(terminus);
  }
};

var Message = function(username, text, room) {
  this.username = username;
  this.text = text;
  this.room = room;
  this.createdAt = new Date();
  this.objectID = _.uniqueID('message_');
};
