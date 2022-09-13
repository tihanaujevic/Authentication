import axios from "axios";
import React from "react";

function Welcome () {

    const[odgovor, setOdgovor]= React.useState('')

    /* React.useEffect(()=>{
        const logiraniKorisnik = window.localStorage.getItem('korisnik')
        axios.get("http://localhost:3001/welcome",{headers: {Authorization: logiraniKorisnik}})
        .then((response) => setOdgovor(response.data))
    }, []) */
    React.useEffect(()=>{
      axios.get("http://localhost:3001/welcomeCookie",  { withCredentials: true, credentials: 'include' })
      .then((response) => console.log('aaaa', response))
  }, [])
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
            <h1>{odgovor}</h1>
        </div>
      </div>
    );
};

export default Welcome

