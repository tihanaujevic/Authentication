import './App.css'
import Login from './login.js'
import {Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Welcome from './welcome.js'
import Home from './home.js'

function App(){

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [way, setWay] = useState("")

  const prijava =() =>{
    if(way==='jwt'){
    axios.post("http://localhost:3001/login/jwt", {email, password}).then((response)=>{
      if (response.data === "korisnik s ovim emailom ne postoji")
        alert("korisnik s ovim emailom ne postoji")
      else if (response.data === "Kriva lozinka")
        alert("Kriva lozinka")
      else{
        console.log(response.data)
        window.localStorage.setItem('korisnik', response.data)
        navigate('/welcome')
      }      
    })}
    else if(way==='cookie'){
      axios.post("http://localhost:3001/login/cookie", {email, password},  { withCredentials: true, credentials: 'include' }).then((response)=>{
      console.log(response)
      navigate('/welcome')
    }).catch((error)=>{
      if(error.response.statusText === 'Unauthorized'){
        alert('Neispravni podaci')
      }
    })
    }
  } 


  return (
    <div className='App'>    
            <Routes>
              <Route path='/' element={<Home setWay={setWay}/>}></Route>
              <Route path='/login' element={<Login prijava={prijava} setEmail={setEmail} setPassword={setPassword}/>}></Route>
              <Route path='/welcome' element={<Welcome way={way}/>}></Route>
            </Routes> 
  </div>
  );    
}

export default App;
