var dbHost, dbPort, dbUser, dbPass, dbName, mongoUri;

if (!process.env.OPENSHIFT_NODEJS_IP) {
  dbHost = 'localhost';
  dbPort = 27017;
  dbUser = null;
  dbPass = null;
  dbName = 'calendar_scheduler';
  //mongoUri = 'mongodb://localhost/calendar_scheduler';
} else {
  //dbHost = $OPENSHIFT_MONGODB_DB_HOST;
  //dbPort = $OPENSHIFT_MONGODB_DB_PORT;
  dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST;
  dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT;
  dbUser = 'admin';
  dbPass = '5ePjWTMZljww';
  dbName = 'calendarscheduler';
  //mongoUri = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';

  console.log('process.env.OPENSHIFT_MONGODB_DB_HOST', process.env.OPENSHIFT_MONGODB_DB_HOST);
  console.log('process.env.$OPENSHIFT_MONGODB_DB_HOST', process.env.$OPENSHIFT_MONGODB_DB_HOST);
  console.log('$OPENSHIFT_MONGODB_DB_HOST', $OPENSHIFT_MONGODB_DB_HOST);
}

mongoUri = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;
//var mongoUri = 'mongodb://' + dbUser + ':' + dbPass + '@' + '$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/' + dbName;
//console.log('mongoUri', mongoUri);

exports.mongoUri = mongoUri;
exports.dbUser = dbUser;
exports.dbPass = dbPass;
exports.dbName = dbName;
exports.dbHost = dbHost;
exports.dbPort = dbPort;
