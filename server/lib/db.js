data = {};

module.exports = {
  get: function(key, cb){
    cb(null, data[key]);
  },
  save: function(key, value, cb){
    data[key] = value;
    cb(null);
  },
  delete: function(key, cb){
    delete(data[key]);
    cb(null);
  }
}
