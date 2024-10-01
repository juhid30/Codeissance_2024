import React, { useState } from "react";
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { AddMoney } from "./AddMoney";
import { AddPaycheck } from "./AddPaycheck";
import { Bar, Line } from "react-chartjs-2";
import fries from "../assets/fries.png";
import money from "../assets/money.png";
import tickets from "../assets/tickets.png";
import books from "../assets/books.png";
import Layout from "./Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

Chart.register(...registerables);

export const Activity = (props) => {
  const {
    isExpenseOpen,
    isPaycheckOpen,
    setIsPaycheckOpen,
    setExpenseArray,
    handleIsExpenseOpen,
    handleIsPaycheckOpen,
    total,
    paycheckAmt,
    setPaycheckAmt,
  } = props;

  const chartRef = useRef(null);
  const [expenseArr, setExpenseArr] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenseCollection = collection(db, "Expenses");
        const expenseSnapshot = await getDocs(expenseCollection);
        const expenseList = expenseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(expenseList);
        setExpenseArr(expenseList); // Store fetched expenses in state
        setExpenseArray(expenseList); // Optional: If you need to update a parent state
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [setExpenseArray]); // Add dependencies as needed
  

  return (
    <div>
      <Layout>
        <div
          className={`h-[90vh] overflow-hidden ${
            isExpenseOpen || isPaycheckOpen ? "filter blur-[3px]" : ""
          }`}
        >
          {/* Main Content Area */}
          <div className="w-full h-full bg-[#E8F5E9] flex"> {/* Light green background */}
            {/* Bar Chart and Summary Cards */}
            <div className="w-[70%] bg-white m-[1%] flex flex-col rounded-[30px] shadow-md">
              <div className="h-[25%] m-[1%] flex">
                {/* Summary Cards */}
                <div className="w-[25%] m-[0.5%] border border-[#A5D6A7] relative overflow-hidden rounded-[30px] flex flex-col items-center ">
                  <img
                    className="float-end absolute bottom-[-20px] h-[65%] right-[-25px]"
                    src={fries}
                    alt="Food"
                  />
                  <div className="h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#81C784]">
                    Food
                  </div>
                  <div className="h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]">
                    ₹{total.food}
                  </div>
                </div>
                <div className="w-[25%] m-[0.5%] border border-[#A5D6A7] relative overflow-hidden rounded-[30px] flex flex-col items-center ">
                  <img
                    className="float-end absolute bottom-[-20px] right-[-20px] h-[65%] transform rotate-[-20deg]"
                    src={money}
                    alt="Bills"
                  />
                  <div className="h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#66BB6A]">
                    Bills
                  </div>
                  <div className="h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]">
                    ₹{total.bills}
                  </div>
                </div>
                <div className="w-[25%] m-[0.5%] border border-[#A5D6A7] relative overflow-hidden rounded-[30px] flex flex-col items-center">
                  <img
                    className="float-end absolute bottom-[-35px] right-[-30px] h-[65%] transform rotate-[45deg]"
                    src={tickets}
                    alt="Logistics"
                  />
                  <div className="h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#4CAF50]">
                    Logistics
                  </div>
                  <div className="h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]">
                    ₹{total.entertainment}
                  </div>
                </div>
                <div className="w-[25%] m-[0.5%] border border-[#A5D6A7] relative overflow-hidden rounded-[30px] flex flex-col items-center">
                  <img
                    className="float-end absolute bottom-[-35px] right-[-40px] h-[65%] transform rotate-[0]"
                    src={books}
                    alt="Misc"
                  />
                  <div className="h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#388E3C]">
                    Misc
                  </div>
                  <div className="h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]">
                    ₹{total.misc}
                  </div>
                </div>
              </div>
  
              {/* Line Chart */}
              <div className="h-[75%] border border-[#A5D6A7] m-[1%] pt-[50px] p-[2%] rounded-[30px]">
                <Line
                  data={{
                    labels: ["FOOD", "BILLS", "LOGISTICS", "MISC"],
                    datasets: [
                      {
                        label: "Actual Expenses",
                        data: [
                          total.food,
                          total.bills,
                          total.entertainment,
                          total.misc,
                        ],
                        fill: false,
                        borderColor: "#81C784",
                        tension: 0.2,
                        pointBackgroundColor: [
                          "#81C784",
                          "#66BB6A",
                          "#4CAF50",
                          "#388E3C",
                        ],
                        pointBorderColor: "#ffffff",
                        pointHoverBackgroundColor: "#ffffff",
                        pointHoverBorderColor: [
                          "#81C784",
                          "#66BB6A",
                          "#4CAF50",
                          "#388E3C",
                        ],
                      },
                      {
                        label: "Estimated Expenses",
                        data: [350  , 450, 300, 100],
                        fill: false,
                        borderColor: "#4CAF50",
                        tension: 0.2,
                        pointBackgroundColor: [
                          "#4CAF50",
                          "#4CAF50",
                          "#4CAF50",
                          "#4CAF50",
                        ],
                        pointBorderColor: "#ffffff",
                        pointHoverBackgroundColor: "#ffffff",
                        pointHoverBorderColor: "#4CAF50",
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                          usePointStyle: true,
                          boxWidth: 10,
                          boxHeight: 10,
                          padding: 20,
                        },
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Categories",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Amount",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
  
            {/* Transaction History & Buttons */}
            <div className="w-[30%] h-full m-[1%] flex flex-col ">
              <div className="bg-white rounded-t-[10px] border-[1px] border-b-[0px] h-[10%] flex items-center justify-center">
                <i className="ri-calendar-todo-line text-[22px] mr-[3.5%]"></i>
                <span className="text-[15px] font-semibold">
                  Your Transaction History
                </span>
              </div>
              <div className="bg-white rounded-b-[10px] border-[1px] border-t-[0px] h-[70%] overflow-auto">
                {[...expenseArr].reverse().map((expense, i) => (
                  <div key={i} className="h-[17%] flex border border-x-[0px]">
                    <div className="w-[25%] h-full flex justify-center items-center">
                      <div className="w-[65%] h-[50%] bg-[#E8F5E9] flex justify-center items-center rounded-[5px]">
                        <i className={expense.icon}></i>
                      </div>
                    </div>
                    <div className="w-[50%] h-full flex flex-col justify-center ">
                      <div className="text-[15px]">{expense.name}</div>
                      <div className="text-[10px] text-[#828583]">
                        {expense.date}
                      </div>
                    </div>
                    <div
                      style={
                        expense.spent
                          ? { color: "#ff3636" }
                          : { color: "#67CEA5" }
                      }
                      className="w-[25%] text-[15px] font-semibold h-full flex justify-center items-center"
                    >
                      ₹{expense.amount}
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Buttons for Add Money and Add Paycheck */}
              <div className="w-full flex justify-around p-4">
                <button
                  className="px-4 py-2 bg-[#388E3C] text-white rounded-md"
                  onClick={handleIsExpenseOpen}
                >
                  Add Money
                </button>
                {/* <button className='px-4 py-2 bg-[#388E3C] text-white rounded-md' onClick={handleIsPaycheckOpen}>Add Paycheck</button> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
  
      {/* Modals for Adding Expense and Paycheck */}
      {isExpenseOpen ? (
        <AddMoney
          expenseArr={expenseArr}
          setExpenseArray={setExpenseArray}
          handleIsExpenseOpen={handleIsExpenseOpen}
          isExpenseOpen={isExpenseOpen}
        />
      ) : null}
  
      {isPaycheckOpen ? (
        <AddPaycheck
          expenseArr={expenseArr}
          setExpenseArray={setExpenseArray}
          handleIsPaycheckOpen={handleIsPaycheckOpen}
          paycheckAmt={paycheckAmt}
          setPaycheckAmt={setPaycheckAmt}
        />
      ) : null}
    </div>
  );
  
};
