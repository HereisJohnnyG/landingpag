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
    db.collection('teacher').find({}).toArray((err, teacher) =>{id = teacher.length});
  }
});

exports.get = (where, collun) =>  {
    return db.collection('teacher').find(where, collun).toArray();
}

exports.insert = (document) => {
    return db.collection('teacher').insertOne(document);
}

exports.troca = (where, document) => {
    return db.collection('teacher').updateOne(where, {$set: document});
}

exports.deleta = (where) => {
    return db.collection('teacher').findOneAndUpdate(where, {$set: {status: 0}});
}