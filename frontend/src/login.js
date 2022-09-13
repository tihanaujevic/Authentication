import React from "react";

function Login (props) {

    return (
      <div className="auth-wrapper">
          <div className="auth-inner">
      <div className="mb-3">
        <h3>Log In</h3>
        <label>Email</label>
        <input type="email" className="form-control" placeholder="Email" onChange={(event)=>{
          props.setEmail(event.target.value)
        }}/>
        </div>
        <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" onChange={(event)=>{
          props.setPassword(event.target.value)
        }}/>
        </div>
        <div className="d-grid">
        <button className="btn btn-primary" onClick={props.prijava}>Login</button>
        </div>
      </div>
      </div>
    );
};

export default Login

