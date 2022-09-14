import jwt from 'jsonwebtoken'

async function loginGoogle(req,res){
    try{
        let token = req.body.token
        //ako nije u bazi moze se dodat...
        token = jwt.decode(token)
        let email = token.email

        res.status(200).send(email)
    }
    catch(err){
        res.status(400).send('Greska pri logiranju')
    }
}

export default loginGoogle
