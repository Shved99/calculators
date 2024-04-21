import Header from "../components/Header";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import './InterfaceCalc.css'
import { parse } from 'mathjs'

import React from "react";
import { useParams } from "react-router-dom";

function InterfaceCalc() {
  const { id } = useParams()
  const [calc, setCalc] = useState({})
  const [result, setResult] = useState(0)

  useEffect(() => {
    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;

    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        // console.debug(result)
        setCalc(result.data)
      });
  }, [id]);

  let expression

  if (Object.hasOwn(calc, 'formula')) {
    expression = parse(calc.formula);
    // console.debug(expression)
  }

  const calculate = (event) => {
    const fields = calc.numberFields?.map((item) => item.field)
    let obj

    fields.forEach((key) => {
      obj = {...obj, [key]: document.getElementById(key).value}
    })
    // console.debug(obj)

    setResult(expression?.compile().evaluate(obj))
  }

  return (
    <>
      <Header />
      <div className="InterfaceCalc">
        <div className="info">
        <p>{calc.nameCalc}</p>
        <p>Калькулятор расчитывает по формуле <br />{calc.formula}</p>
        </div>
        {calc.numberFields?.map((item) => (
          <input id={item.field} type="number" placeholder={item.fieldName} key={item.field}/>
        ))}
        <button id="result" onClick={calculate}>Расчитать</button>
        <p className="result">Результат: {result}</p>
      </div>
      <Footer />
    </>
  );
}

export default InterfaceCalc;
