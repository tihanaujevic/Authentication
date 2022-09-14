import axios from "axios";
import React from "react";
import {useNavigate} from 'react-router-dom'

function Welcome (props) {
  //https://stackoverflow.com/questions/33702826/oauth-authorization-vs-authentication/33704657#33704657
  //https://www.youtube.com/watch?v=GihQAC1I39Q
    const[odgovor, setOdgovor]= React.useState('')
    const navigate = useNavigate();
    function aj () {
      navigate('/')
    }

    React.useEffect(()=>{
      if(props.way==='jwt'){
        const logiraniKorisnik = window.localStorage.getItem('korisnik')
        axios.get("http://localhost:3001/welcome",{headers: {Authorization: logiraniKorisnik}})
        .then((response) => setOdgovor(response.data))}
      else if(props.way==='cookie'){
        axios.get("http://localhost:3001/welcomeCookie",  { withCredentials: true, credentials: 'include' })
      .then((response) => setOdgovor(response.data))
      }
      else if(props.way==='google'){
        setOdgovor('Autentikacija pomoću Googlea')
      }
      else 
        aj()
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

