import "./Main.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalculatorItem from "../components/CalculatorItem";
import React, { useEffect, useState } from "react";

function Main() {
    const [calc, setCalc] = useState([])

    useEffect(() => {
        const api = 'http://127.0.0.1:9001/calculator/get/all'

        fetch(api)
            .then((result) => result.json())
            .then((result) => {
                // console.debug(result.data)
                setCalc(result.data)
            })
    }, [])

    return (
        <>
            <Header />
            <div className="Main">
                <div className="content">
                    {calc.map((item) => (
                        <CalculatorItem id={item._id} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Main;
