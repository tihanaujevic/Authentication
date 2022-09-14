import React from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Home (props) {
    const navigate = useNavigate();
    
    function set(way){
        props.setWay(way)
        navigate('/login')
    }

    React.useEffect(()=>{
        window.google.accounts.id.initialize({
          client_id: "316639475242-0vg6lfpd6lgl8dmcuuoo2bvn046dnf1a.apps.googleusercontent.com",
          callback: loginGoogle
        })
    
        window.google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {}
        )
      },[])
    
    function loginGoogle(response){
        axios.post("http://localhost:3001/login/google", {token: response.credential}).then((response)=>{
        props.setWay('google')
        navigate('/welcome')
      })      
    }
    return (
      <div style={{'width':'200px', marginLeft: '43%', marginTop:'10%'}}>
          <button onClick={()=>set('jwt')}>JWT</button><br/>
          <button onClick={()=>set('cookie')}>Cookie</button>
          <div id="signInDiv"></div>
      </div>
    );
};

export default Home

