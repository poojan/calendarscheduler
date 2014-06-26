var dbHost, dbPort, dbUser, dbPass, dbName, mongoUri;

if (typeof($OPENSHIFT_MONGODB_DB_HOST) === 'undefined') {
  dbHost = 'localhost';
  dbPort = 27017;
  dbUser = null;
  dbPass = null;
  dbName = 'calendar_scheduler';
  mongoUri = 'mongodb://localhost/calendar_scheduler';
} else {
  dbHost = $OPENSHIFT_MONGODB_DB_HOST;
  dbPort = $OPENSHIFT_MONGODB_DB_PORT;
  dbUser = 'admin';
  dbPass = '5ePjWTMZljww';
  dbName = 'calendarscheduler';
  mongoUri = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
}
//var mongoUri = 'mongodb://' + dbUser + ':' + dbPass + '@' + '$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/' + dbName;
//console.log('mongoUri', mongoUri);

exports.mongoUri = mongoUri;
exports.dbUser = dbUser;
exports.dbPass = dbPass;
exports.dbName = dbName;
exports.dbHost = dbHost;
exports.dbPort = dbPort;
