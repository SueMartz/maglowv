import React, { useEffect, useState } from 'react'
import Config from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';


const Register = () => {

    const { getToken } = AuthUser()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()


    useEffect(() => {
        if (getToken()) {
            navigate("/")
        }
    }, [])

    const submitRegistro = async (e) => {
        e.preventDefault();

        Config.getRegister({ name, email, password })

            .then(({ data }) => {
                if (data.success) {
                    navigate("/login")
                }

            })

    }




    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100 justify-content-center">
                <div className="col-sm-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center fw-bolder mb-4">REGISTRO</h1>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Nombre:"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

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

                            <button onClick={submitRegistro} className="btn btn-primary w-100">
                                ENVIAR
                            </button>

                            <p className="text-center mt-3">
                                <a href="/terminos" className="small text-decoration-none">
                                    Términos y condiciones
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
