const jwt = require('jsonwebtoken');
const authConfig = require('./configToken.json')

exports.generateToken = (payload) => {
    return jwt.sign(payload, authConfig.secret,{expiresIn:86400});
}

exports.getMiddleware = (req,res,next) =>{
    
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return  res.status(401).send({error:'No token provided'})
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2 ){
        return res.status(401).send({error:'Token error'});
    }

    const [ scheme,token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error:'Token malformated'});
    }
    
    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        
        if(err) return res.status(401).send({err:'Token invalid'});
        
        req.userId = decoded.id;
        req.userLevel = decoded.level;
        return next();
    })

}

 
exports.hasPermissions = (req,res,min_level_required) => {
    
    console.log(req.userLevel);
    

    if(!req.userLevel){
        return  res.status(401).send({error:'Level invalid'})
    }

    if(req.userLevel < min_level_required){
        return  res.status(401).send({error:'No permission'})
    }
    
}