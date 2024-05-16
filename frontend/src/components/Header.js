import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <div className='Header'>
        <Link className="HeaderLink" to="/">Кредитные калькуляторы</Link>
        <Link className="HeaderLink" to="/Admin">Админ-панель</Link>
    </div>
  );
}

export default Header;