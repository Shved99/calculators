import React, { useEffect } from 'react';
import Header from '../components/Header';

import './Admin.css';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      navigate('/admin/main')
    }
  })

  const getToken = async () => {
    const login = document.getElementById('login-field').value
    const password = document.getElementById('pass').value

    const loginApi = 'http://127.0.0.1:9001/login'
    let jwt
    const loginJson = {
      login,
      password
    }

    await fetch(loginApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginJson)
    })
      .then((result) => result.json())
      .then((result) => {
        if (Object.hasOwn(result, 'token')) {
          jwt = result.token
        } else {
          document.getElementById('message').innerText = result.message
        }
      })

    if (jwt === null) {
      return
    }

    localStorage.setItem('jwt', jwt)
    navigate('/admin/main')
  }

  return (
    <>
      <Header />
      <div className='adm'>
      <div className='Admin'>
        <div>
        <p>Вход в админку</p>
        <input id="login-field" type="text" placeholder="Введите логин от админа" />
        <input id="pass" type="password" placeholder="Введите пароль от админа" />
        <button id="login-button" onClick={getToken}>Подтвердить</button>
        <p id='message'></p>
        </div>
      </div>
</div>
    </>
  );
}

export default AdminLogin;