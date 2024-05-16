import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './Admin.css';
import { useNavigate } from 'react-router-dom';



function Admin() {
  const [token, setToken] = useState('')
  const [calcs, setCalcs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem('jwt'))

    if (token === null) {
      navigate('/admin')
    }

    const calcsApi = 'http://127.0.0.1:9001/calculator/get/all'

    fetch(calcsApi)
      .then((result) => result.json())
      .then((result) => {
        // console.debug(result.data)
        setCalcs(result.data)
      })
  }, [token, navigate])

  const addCalc = async () => {
    const nameCalc = document.getElementById('name').value
    const percent = document.getElementById('percent').value

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

  const editCalc = async (id) => {
    navigate('/admin/edit/' + id)
  }

  const deleteCalc = async (id) => {
    if (token !== null) {
      const api = 'http://127.0.0.1:9001/calculator/delete/' + id
      
      const data = {
        token
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
      <div className='adm'>
      <div className='Admin'>
        <div className='calcs1'>
        <p>Создать калькулятор:</p>
        <input id="name" type="text" placeholder="Имя калькулятора" />
        <input id="percent" type="number" placeholder="Процент кредита" />
        <button id="create" onClick={addCalc}>Подтвердить</button>
        <p id='message'></p>
        </div>
        <div className='calcs'>
          {calcs.map((item) => (
            <div className='calc' key={item._id}>
              <p className='calc-name'>Имя калькулятора: {item.nameCalc}</p>
              <p className='calc-percent'></p>
              <button className='calc-delete' onClick={() => deleteCalc(item._id)}>Удалить калькулятор</button>
              <button className='calc-edit' onClick={() => editCalc(item._id)}>Изменить калькулятор</button>

            </div>
          ))}
        </div>
      </div>
      </div>
<Footer />
    </>
  );
}

export default Admin;