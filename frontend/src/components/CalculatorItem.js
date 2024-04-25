import React from "react";
import "./CalculatorItem.css";
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
      <p>{calc.Calc}</p>
      <a href={`/Calculator/${calc._id}`} className="btn">Расчитать</a>

    </div>
  );
}

export default Item;
