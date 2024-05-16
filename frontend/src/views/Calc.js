import Header from "../components/Header";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import './Calc.css'

import React from "react";
import { useParams } from "react-router-dom";

function Calc() {
  const { id } = useParams()
  const [calc, setCalc] = useState({})
  const [result, setResult] = useState({
    price: 0,
    commonPercent: 0,
    sumPerMonth: 0,
    neededMoney: 0
  })

  useEffect(() => {
    const api = `http://127.0.0.1:9001/calculator/get/one/` + id;

    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        // console.debug(result)
        setCalc(result.data)
      });
  }, [id]);

  const calculate = (event) => {
    const percent = calc.percent
    const time = document.getElementById("time").value
    const sum = document.getElementById("sum").value
    const firstSum = document.getElementById("firstSum").value

    const price = sum - firstSum
    const percentPerMonth = percent / 12 / 100
    const commonPercent = (1 + percentPerMonth) ** (time * 12)
    const sumPerMonth = price * percentPerMonth * commonPercent / (commonPercent - 1)
    const neededMoney = sumPerMonth * 2.5

    setResult({
      price,
      time,
      commonPercent: commonPercent.toFixed(2),
      sumPerMonth: Math.round(sumPerMonth),
      neededMoney: Math.round(neededMoney)
    })
  }

  const Result = () => {
    if (result.price <= 0 || result.time <= 0) {
      return (
        <>
          <p>Поля пустые</p>
        </>
      )
    } else {
      return (
        <>
          <p>Стоимость кредита: {result.price} рублей</p>
          <p>Общая ставка кредита: {result.commonPercent}%</p>
          <p>Ежемесячный платёж: {result.sumPerMonth} рублей (без учёта копеек)</p>
          <p>Необходимый доход: {result.neededMoney} рублей (без учёта копеек)</p>
        </>
      )
    }
  }

  return (
    <>
      <Header />
      <div className="clc">
      <div className="Calc">
        <p>{calc.nameCalc}</p>
        <input id="sum" type="number" placeholder="Сумма (в рублях)" />
        <input id="time" type="number" placeholder="Срок (в годах)" />
        <input id="firstSum" type="number" placeholder="Первоначальная сумма (в рублях)" />
        <button id="result" onClick={calculate}>Вычислить</button>
        <Result />
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Calc;
