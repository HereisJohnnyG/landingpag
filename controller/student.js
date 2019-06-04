const modelStudent = require("../model/student");
const modelCourse = require("../model/course")

exports.getAll = (req, res) => {
    let where = {status:1};
    let collun = {projection: {"_id": 0, "status": 0, "course._id": 0, "course.status": 0, "course.teacher._id": 0, "course.teacher.status": 0}};
    modelStudent.get(where, collun).then(estudantes =>{
    if(estudantes == []){
        res.status(404).send("Usuário não encontrado");
    }else res.send(estudantes);
    }).catch(err => {
        console.error("Ocorreu um erro ao conectar a collection Student");
        send.status(500);
    })
}
  
exports.getOne = (req, res) => {
    let id = parseInt(req.params.id);
    let where = {"id": id, status:1};
    let collun = {projection: {"_id": 0, "status": 0, "course._id": 0, "course.status": 0, "course.teacher._id": 0, "course.teacher.status": 0}};
    modelStudent.get(where, collun).then(estudantes =>{
    if(estudantes == []){
        res.status(404).send("Usuário não encontrado");
    }else res.send(estudantes);
    }).catch(err => {
        console.error("Ocorreu um erro ao conectar a collection Student");
        send.status(500);
    })
}


exports.post = (req, res) => {
    let students = {};
    students.name = req.body.name;
    students.lastname = req.body.lastname;
    students.age = req.body.age;
    students.course = [];
    let student_temp = req.body.course;
  
    if(students.name && students.lastname && students.age && req.body.course){
        students.status = 1;
        students.id = ++id;
        student_temp.forEach(element => {
            where = {id: element, status: 1}
            let courses = modelCourse.get(where);
            if(courses != null){
                console.log(courses);
                students.course.push(courses); 
            }
        })
        if(students.course.length > 0){
          modelStudent.updateCourse(courses).then(result => {
              res.status(200).send("Estudante Cadastrado com Sucesso.");
            });
        }else res.status(201).send("Erro ao criar Um novo estudante, curso invalido");
    }else{
        res.status(500).send("Erro ao Criar Um Novo estudante");
    }
}



exports.delete = (req, res) => {
    let id = parseInt(req.params.id);
    where = {"id": id, "status": 1};
    set = {$set: {status: 0}}
    modelStudent.delete(where, set).then(results => { 
      if(results.value == null) {
        res.status(204).send("Não foi possivel encontrar o usuário")
      }else res.send("Usuário excluido com sucesso");
    }).catch(e => {
        console.error("Ocorreu um erro ao deletar os usuários da coleção");
        res.status(500);
    })
}