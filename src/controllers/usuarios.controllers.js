// => CONTROLLERS 


module.exports = {
    index(req,res){
        res.json({message:'Olá - mundo!'});
    },

    create(req,res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;

        let data = {};

        let user = Usuario.findOne({email_usuario});
    }
}