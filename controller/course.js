const modelCourse = require("../model/course");
const modelStudent = require("../model/student");

exports.getAll = (req, res) => {
    let courses;
    let where = {"status": 1};
    let collun = {projection: {'_id': 0, 'status':0, 'teacher.status': 0}};
    modelCourse.get(where,collun).then(
        users => {
            res.send(users);
            if(courses == []){
                res.status(404).send("Curso não encontrado");
            }
            else res.send(courses);
        } 
    ).catch(err => {
        console.log(err);
        console.error("Ocorreu um erro ao procurar o curso");
        res.status(500).send("Ocorreu um erro ao procurar o curso");
    });
};


exports.getOne = (req, res) => {
    let courses;
    let id = parseInt(req.params.id);
    let where = {"status": 1};
    let collun = {projection: {'_id': 0, 'status':0, 'teacher.status': 0}};
    modelCourse.get(where,collun).then(
        users => {
            res.send(users);
            if(courses == []){
                res.status(404).send("Curso não encontrado");
            }
            else res.send(courses);
        } 
    ).catch(err => {
        console.log(err);
        console.error("Ocorreu um erro ao procurar o curso");
        res.status(500).send("Ocorreu um erro ao procurar o curso");
    });
}

exports.post = (req, res) => {
   
}


exports.edit = (req, res) => {
  
}

exports.delete = (req, res) => {
    let id = parseInt(req.params.id);
    
    modelCourse.deleta(id).then(info => {
        if(info.value == null) {
            res.status(204).send("Não foi possivel encontrar o curso");
        }else{            
            modelStudent.updateCourse(id);
            res.send("Usuário excluido com sucesso");
        }
    }).catch(err => {
        console.error("Ocorreu um erro ao deletar o curso da coleção");
        res.status(500);
    });
}