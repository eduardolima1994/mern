// => CONTROLLERS 

module.exports = {
    index(req,res){
        res.json({message:'Olá - mundo!'});
    },

    create(req,res){
        let msg = ''
        res.json({msg:msg});
    }
}