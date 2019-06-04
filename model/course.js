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
    db.collection('course').find({}).toArray((err, user) =>{id = user.length});
  }
});

exports.get = (where, collun) =>  {
    return db.collection('course').find(where, collun).toArray();
}

exports.deleta = (id) => {
    return db.collection('course').findOneAndUpdate({"id": id, "status": 1}, {$set: {status: 0}});
}