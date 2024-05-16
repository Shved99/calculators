import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      setIsLogin(true)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('jwt')
    setIsLogin(false)
    navigate('/')
  }

  const LogoutButton = () => {
    if (isLogin === true) {
      return (
        <div className='LogoutButton'>
          <button onClick={logout}>Выход из админки</button>
        </div>
      )
    }
  }

  return (
    <div className='Header'>
      <div>
      <Link className="HeaderLink" to="/">Список калькуляторов</Link>
      <Link className="HeaderLink" to="/admin">Админ-панель</Link>
      
    </div>
    <LogoutButton />
    </div>
  );
}

export default Header;