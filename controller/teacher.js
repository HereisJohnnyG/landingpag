const modelTeacher = require("../model/teacher");

exports.getAll = (req, res) => {
    let where = {'status':1}
    let collun = {projection: {_id: 0, status: 0}}
    modelTeacher.get(where,collun)
        .then(teachers => {
            res.send(teachers);
        }).catch(err => {
        console.log(err);
        console.error("Ocorreu um erro ao enviar os usuários");
        res.status(500).send('Ocorreu um erro');
    });
}

exports.getOne = (req, res) => {
    let id = parseInt(req.params.id);
    let where = {"id": id, status:1};
    let collun = {projection: {_id: 0, status: 0}}
    modelTeacher.get(where,collun)
        .then(teachers => {
            res.send(teachers);
        }).catch(err => {
        console.log(err);
        console.error("Ocorreu um erro ao enviar os usuários");
        res.status(500).send('Ocorreu um erro');
    });
}

exports.post = (req, res) => {
    let usuario = {};
    usuario.name = req.body.name;
    usuario.lastname = req.body.lastname;
    if(usuario.name && usuario.lastname){
        usuario['id'] = ++id;
        if(typeof(req.body.phd) == 'boolean'){
        usuarios.phd = req.body.phd;
        }
        usuario.status = 1;
        modelTeacher.insert(usuario)
            .then(e => {
                res.status(201).send("Usuário cadastrado com sucesso");
            }).catch(e => {
                res.status(403).send("Campo invalido");
            });
    }
}

exports.edit = (req, res) => {
    if(req.body.name && req.body.lastname){ //Business rule (name and lastname must have a value
    let usuarios = {};
    //Fill teachers data
    usuarios.name = req.body.name;
    usuarios.lastname = req.body.lastname;
    
    //verify if PHD is boolean
    if(typeof(req.body.phd) == 'boolean'){
      usuarios.phd = req.body.phd;
    }
  
    let id = parseInt(req.params.id);
    usuarios.id = id;
    usuarios.status = 1;


    where = {"id": id, "status": 1};
    
    modelTeacher.troca(where, {...usuarios})
        .then(
            results => { 
                if(results == null) {
                    res.status(403).send("Não foi possivel completar a atualização")
                }
                else{ 
                    res.status(200).send("Professor cadastrado com sucesso")
                }
            })
            .catch(e => res.status(403).send("Não foi possivel completar a atualização"));
    }
} // error

exports.deleta = (req, res) => {
    let id = parseInt(req.params.id);
    where = {"id": id, "status": 1};
     modelTeacher.deleta(where).then(results => { 
         if (results.value == null) {
             res.status(204).send("Não foi possivel encontrar o usuário")
         }else{
             res.status(200).send("Professor removido do sistema");
         }
     })
     .catch(e => {
         console.error("Ocorreu um erro ao deletar os usuários da coleção");
          res.status(500);
     })
}