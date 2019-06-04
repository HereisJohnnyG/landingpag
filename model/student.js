const mongoClient = require("mongodb").MongoClient;
const mdbURL = "mongodb+srv://admin:admin@cluster0-th9se.mongodb.net/test?retryWrites=true&w=majority";

var db;

mongoClient.connect(mdbURL, {useNewUrlParser: true}, (err, database) => {
  if(err){
    console.error("Ocorreu um erro ao conectar ao MongoDB");
    send.status(500); //Internal server error
  }
  else{
    db = database.db('trainee-prominas');
    db.collection('student').find({}).toArray((err, user) =>{id = user.length});
  }
});

exports.get = (where, collun) => {
    return db.collection('student').find(where, collun).toArray();
}

exports.updateCourse = (id) => {
    return db.collection('student').updateMany({}, {$pull: {course: {"id": id}}});
}

exports.insertCourse = (courses) => {
    return db.collection('student').insertOne(courses);
}

exports.delete = (where, set) => {
    return db.collection('student').findOneAndUpdate(where, set); 
}