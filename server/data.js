//create database instances (new instance per room)
var Data = function(paramsHash){
  this.roomname = paramsHash.roomname || 'lobby';

  this._storage = [];
    // store messages with key of createdAt
};

//add message to data
Data.prototype.add = function(message){
  //possible future feature: resolving collisions within the same millisecond occur
  return this._storage.push(message);
};

//retrieve most recent x messages
Data.prototype.retrieve = function(paramsHash){
  //paramsHash: limit (for use if you want a certain number of most recent messages), username, search text
  var limit = paramsHash.limit || 2;
  var order = paramsHash.order || '-createdAt';
  var len = this._storage.length;
  var terminus = len > limit ? len - limit : 0;
  // to return only the most recent messages
  if( paramsHash.where ){
    var targetDate = new Date(JSON.parse(paramsHash.where).createdAt.$gte.iso).valueOf();
    var dateIndex = this.findClosestValue(this._storage, targetDate);
    return this._storage.slice(dateIndex);
  }
  if( order === '-createdAt' ){
    return this._storage.slice(terminus);
  }
};

//binary search tree that finds the closest index for a given timestamp limit in storage (needs slight fixing)
Data.prototype.findClosestValue = function(array, target, start, end) {
  start = start || 0;
  end = end || array.length - 1;
  var median = Math.floor((end - start)/2) + start;
  //console.log('target: ', target, 'start: ', start, 'median: ', median, 'end: ', end);

  if(array[median]['createdAt'] === target){ return median; }
  else if(end - start <= 1) {
    // the logic here is messed up slightly, where median + 1 will return the correct value sometimes and not
    // others - it may have to do with needing a flag that determines which direction the last move went
    return array[median]['createdAt'] < target ? median + 1 : median - 1;
  }
  else if(array[median]['createdAt'] > target) { return this.findClosestValue(array, target, start, median - 1); }
  else if (array[median]['createdAt'] < target) { return this.findClosestValue(array, target, median + 1, end); }
};

var Message = function(username, text, roomname) {
  this.username = username;
  this.text = text;
  this.roomname = roomname;
  this.createdAt = new Date().valueOf();
  // if we wanted to use an object instead of an array...
  // this.objectID = _.uniqueID('message_');
};

module.exports = {Data: Data, Message: Message};
