import { useState, useEffect, useRef } from 'react'
import viteLogo from '../../../public/vite.svg'
import './style.css'
import Trash from '../../assets/16qg.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <div className='container'>
        <form action="">
          <h1>Cadastro de Usuários</h1>
          <input ref={inputName} placeholder='Nome...' type="text" name='name' required />
          <input ref={inputAge} placeholder='Idade...' type="number" name='age' required />
          <input ref={inputEmail} placeholder='E-mail...' type="email" name='email' required />
          <button onClick={createUsers} className='btn' type='button'>Cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: {user.name} </p>
              <p>Idade: {user.age} </p>
              <p>Email: {user.email} </p>
            </div>
            <button onClick={() => deleteUsers(user.id)}><img src={Trash} alt="icon de lixeira para deletar" /></button>
          </div>
        ))}
      </div>

    </>
  )
}

export default Home
