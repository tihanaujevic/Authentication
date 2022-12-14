import express from 'express'
import loginJWT from '../controllers/jwt.js'
import auth from '../middleware/auth.js'
import cookie from '../controllers/cookie.js'
import loginGoogle from '../controllers/google.js'

const router=express.Router()

router.post('/login/jwt', loginJWT)

router.post('/login/cookie', cookie.loginCookie)

router.post('/login/google', loginGoogle)

router.get("/welcome", auth, (req, res) => {
    res.status(200).send("JWT autentikacija");
  });

router.get("/welcomeCookie", cookie.welcomeCookie, (req, res) => {
    res.status(200).send("Cookie autentikacija");
  });


router.get('/', (req,res) => {
    if(req.oidc.isAuthenticated()){
        res.redirect("http://localhost:3000/welcome")
    }
    else
        res.redirect("http://localhost:3000/")
})

router.get('/setcookie',(req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date('01 12 2021'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});

router.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies);
})

router.get('/deletecookie', (req, res) => {
    //show the saved cookies
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
})

export default router