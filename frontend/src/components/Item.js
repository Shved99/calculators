import React from "react";
import { Link } from 'react-router-dom';
import "./Item.css";
import { useEffect, useState } from "react";

function Item({ id }) {
  const [calc, setCalc] = useState({});

  useEffect(() => {
    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;

    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        setCalc(result.data);
      });
  });

  return (
    <div className="Item">
      
      <p>{calc.nameCalc}</p>
      <Link to={`/Calc/${calc._id}`} className="btn">Перейти</Link>
    </div>
  );
}

export default Item;
