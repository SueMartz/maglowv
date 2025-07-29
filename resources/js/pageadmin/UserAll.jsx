import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Config from '../Config';
import { Link } from 'react-router-dom';

const UserAll = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAll();
  }, []);

  const getUserAll = async () => {
    try {
      const response = await Config.getUserAll();
      console.log("Respuesta de la API:", response);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="container bg-light">
      <div className='row'>
        <Sidebar />
        <div className="col-sm-9 mt-3">
          <div className="card">
            <div className="card-body">
              {users.length === 0 ? (
                <p>No hay usuarios para mostrar.</p>
              ) : (
                <table className='table'>
                  <thead>
                    <tr>
                      <th>ORDEN</th>
                      <th>NAME</th>
                      <th>ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>
                          <Link to={`/admin/user/edit/${user.id}`} className='btn btn-primary'>
                            Editar
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAll
