import jwt from 'jsonwebtoken';

export function Authenticate(req, res, next){

    const authHeader = req.headers["authorization"]; //recibo el token a traves del header
    const token = authHeader && authHeader.split(" ")[1];//como el token viene acompañado de la palabra Bearer lo spliteo, como split devuelve un array con los elementos separados le digo que quiero acceder al primer elemento de ese array.

    if(!token) return res.status(404).json({
        ok:false,
        error_msg:"Usuario no autorizado 1",
    });//esto es en caso de no recibir ese token.
    
    jwt.verify(token, "Mi secreto", (error, payload) => {
        if(error){
            return res.status(404).json({
                ok: false,
                error_msg:"Usuario no autorizado 2",
            })
        };
        // console.log(payload);//lo uso para ver por el momento que retorne el token y que entra a la autorizacion
        req.payload = payload 
        next();
    })
}