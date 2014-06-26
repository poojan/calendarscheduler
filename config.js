var dbUser = 'admin';
var dbPass = '5ePjWTMZljww';
var dbName = 'calendarscheduler';

//var mongoUri = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
var mongoUri = 'mongodb://' + dbUser + ':' + dbPass + '@' + '$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/' + dbName;
console.log('mongoUri', mongoUri);

//mongoUri = 'mongodb://localhost/calendar_scheduler';

exports.mongoUri = mongoUri;
