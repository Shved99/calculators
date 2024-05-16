import Header from "../components/Header";
import { useState, useEffect } from "react";



import Footer from "../components/Footer";
import './Calculator.css'
import { parse } from 'mathjs';

import React from "react";
import { useParams } from "react-router-dom";

function Calc() {


  const { id } = useParams()
  const [calc, setCalc] = useState({})
  const [result, setResult] = useState(0)



  useEffect(() => {
    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;
    //получение калькулятора
    fetch(api)
      .then((res) => res.json())
      .then((result) => {

        setCalc(result.data)
      });
  }, [id]);


  let formulacalc

  if (Object.hasOwn(calc, 'formula')) {
    formulacalc = parse(calc.formula);

  }

  const calculate = (event) => {
    const fields = calc.numberFields?.map((item) => item.field)
    let obj

    fields.forEach((key) => {
      obj = {...obj, [key]: document.getElementById(key).value}
    })

    setResult(formulacalc?.compile().evaluate(obj))
  }

  return (
    <>
      <Header />
      <div className="Calc">
        <p className="result">Название калькулятора: <strong>{calc.Calc}</strong></p>
        <p>Данный калькулятор расчитывает по формуле <br />{calc.formula}</p>
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

export default Calc;
