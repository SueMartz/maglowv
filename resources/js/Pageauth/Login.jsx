import React, { useEffect, useState } from 'react'
import AuthUser from './AuthUser';
import { useNavigate } from 'react-router-dom';
import Config from '../Config';
import axios from 'axios';

const Login = () => {

  const { setToken, getToken } = AuthUser()
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (getToken()) {
      navigate("/")
    }
  }, [])

  const submitLogin = async (e) => {
    e.preventDefault();
    await axios.get('/sanctum/csrf-cookie').then((response)=>{
       Config.getLogin({email, password})
      .then(({ data }) => {
        if(data.success){

          //console.log(data.message)
          setToken(
            data.user,
            data.token,
            data.user.roles[0].name
          )

        }else{
          console.log(data.message)
        }

      })

    })

   
    }
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100 justify-content-center">
                <div className="col-sm-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center fw-bolder mb-4">LOGIN</h1>
                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email:"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password:"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button onClick={submitLogin} className="btn btn-primary w-100">
                                ENVIAR
                            </button>

                            <p className="text-center mt-3">
                              {message}
                            </p>
                            <hr/>
                            <p className='text-center mt-3'>Primera vez.... debe registrarse</p>
                            <a href='/register'className="btn btn-primary w-100">REGISTRO</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
  }

  export default Login
