//session
//persistent
import Korisnik from '../model/korisnik.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/database.js'

class Session {
    constructor(email, expiresAt) {
        this.email = email
        this.expiresAt = expiresAt
    }

    isExpired() {
        this.expiresAt < (new Date())
    }
}

const sessions = {}

async function loginCookie(req,res){
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
        //moze token ili UUID
        const token = jwt.sign(userToken, config.SECRET)
        //res.status(200).send(token)
        //dodat expire time
        const now = new Date()
        const expiresAt = new Date(+now + 120 * 1000)
        console.log('exp',expiresAt)

        // create a session containing information about the user and expiry time
        const session = new Session(email, expiresAt)
        console.log('ssssss',session)
        // add the session information to the sessions map
        sessions[token] = session
        
        res.cookie(`korisnik`, token, { expires: expiresAt, secure: true, sameSite: 'none'})
        res.end()
    }
    catch(err){
        res.status(400).send('Greska pri logiranju')
    }
}

const welcomeCookie = (req,res) =>{
    try{
        if (!req.cookies) {
            res.status(401).end()
            return
        }

        const korisnik = req.cookies['korisnik']
        
        if (!korisnik) {
            res.status(401).end()
            return
        }
        let userSession = sessions[korisnik]
        if (!userSession) {
            // If the session token is not present in session map, return an unauthorized error
            res.status(401).end()
            return
        }
        if (userSession.isExpired()) {
            delete sessions[korisnik]
            res.status(401).end()
            return
        }
        res.send(`Welcome  ${userSession.email}!`).end()

    }
    catch(err){
        res.status(401).send('Greska')
    }
}

export default {loginCookie, welcomeCookie}
