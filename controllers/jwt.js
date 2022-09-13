import Korisnik from '../model/korisnik.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/database.js'

async function loginJWT(req,res){
    const email = req.body.email
    const password = req.body.password

    try{
        let pronadenKorisnik = new Korisnik
        pronadenKorisnik = await Korisnik.findOne({email:email})

        if(!pronadenKorisnik)
            return res.send('korisnik s ovim emailom ne postoji')

        if(!(await bcrypt.compare(password, pronadenKorisnik.password)))
            return res.send('Kriva lozinka')
        console.log('logiran')

        const userToken = {
            email: pronadenKorisnik.email,
            id: pronadenKorisnik._id,
            name: pronadenKorisnik.name
        }

        const token = jwt.sign(userToken, config.SECRET, {expiresIn: "2h"})

        res.status(200).send(token)
    }
    catch(err){
        res.status(400).send('Greska pri logiranju')
    }
}

export default loginJWT
