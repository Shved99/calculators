import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Admin.css';

function Admin() {
  const getToken = async () => {
    const login = document.getElementById('login').value
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

    return jwt
  }

  const addCalc = async () => {
    const nameCalc = document.getElementById('name').value
    const percent = document.getElementById('percent').value

    const token = await getToken()

    if (token !== null) {
      const api = 'http://127.0.0.1:9001/calculator/add'
    const calculator = {
      nameCalc,
      percent
    }
    const data = {
      token,
      calculator
    }

    await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => {
        document.getElementById('message').innerText = result.message
      })
    }
  }


  return (
    <>
      <Header />
      <div className='Admin'>
        <div className='content'>
          <p className='op'>Создать калькулятор:</p>
          <input id="name" type="text" placeholder="Имя калькулятора" />
          <input id="percent" type="number" placeholder="Процент кредита" />
          <input id="login" type="text" placeholder="Введите логин от админа" />
          <input id="pass" type="password" placeholder="Введите пароль от админа" />
          <button id="create" onClick={addCalc}>Создать</button>
          <p id='message'></p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;