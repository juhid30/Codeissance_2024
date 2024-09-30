import React, { useState } from 'react'
import { AddMoney } from './AddMoney'
import { AddPaycheck } from './AddPaycheck'
import {Chart as ChartJS} from "chart.js/auto"
import {Bar , Doughnut , Line} from "react-chartjs-2"
import fries from '../assets/fries.png'; 
import money from '../assets/money.png'
import tickets from '../assets/tickets.png'
import books from '../assets/books.png'

export const Activity = (props) => {

  const {
    isExpenseOpen,
    expenseArr,     
    isPaycheckOpen,
    setIsPaycheckOpen,
    setExpenseArray,
    handleIsExpenseOpen,
    handleIsPaycheckOpen,
    total,
    paycheckAmt,
    setPaycheckAmt
  } = props;


  

  return (
  <div>
    <div className={`h-[100vh] ${(isExpenseOpen || isPaycheckOpen) ? 'filter blur-[3px]' : ''}`}>
      {/* <Navbar handleIsExpenseOpen={handleIsExpenseOpen} handleIsPaycheckOpen= {handleIsPaycheckOpen} /> */}
      <div className='flex h-[90%]'>
            <div className='w-[17.1%] flex flex-col '>
                {/* <Sidebar /> */}
            </div>
            <div className='w-[83%] bg-[#f2f4f3] flex'>
              <div className='bg-white w-[70%] m-[1%] flex flex-col rounded-[30px]'>
                <div className='h-[25%] m-[1%] flex'>
                  <div className='w-[25%] m-[0.5%] border border-[#e7e7e7] relative overflow-hidden rounded-[30px] flex flex-col items-center '>
                    <img className='float-end absolute bottom-[-20px] h-[65%] right-[-25px] ' src={fries}></img>
                    <div className='h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#F57D98]'> Food </div>
                    <div className='h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]'> ₹{total.food} </div>
                  </div>
                  <div className='w-[25%] m-[0.5%] border border-[#e7e7e7] relative overflow-hidden rounded-[30px] flex flex-col items-center '>
                    <img className='float-end absolute bottom-[-20px] right-[-20px] h-[65%] transform rotate-[-20deg]' src={money}></img>
                    <div className='h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#4FD9C5]'> Bills </div>
                    <div className='h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]'> ₹{total.bills} </div>
                  </div>
                  <div className='w-[25%] m-[0.5%] border border-[#e7e7e7] relative overflow-hidden rounded-[30px] flex flex-col items-center'>
                    <img className='float-end absolute bottom-[-35px] right-[-30px] h-[65%] transform rotate-[45deg]' src={tickets}></img>
                    <div className='h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#58BDE7]'> Entertainment </div>
                    <div className='h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]'> ₹{total.entertainment} </div>
                  </div>
                  <div className='w-[25%] m-[0.5%] border border-[#e7e7e7] relative overflow-hidden rounded-[30px] flex flex-col items-center'>
                    <img className='float-end absolute bottom-[-35px] right-[-40px] h-[65%] transform rotate-[0]' src={books}></img>
                    <div className='h-[30%] w-[100%] flex items-center justify-center font-medium bg-[#518EE0]'> Misc </div>
                    <div className='h-[70%] w-[100%] flex items-center justify-center text-[18px] z-[1]'> ₹{total.misc} </div>
                  </div>
                </div>
                <div className='h-[75%] border border-[#e7e7e7] m-[1%] pt-[50px] p-[2%] rounded-[30px]'>
                <Bar
                  data={{
                    labels: ["FOOD", "BILLS", "ENTERTAINMENT", "MISC"],
                    datasets: [
                      {
                        label: ["FOOD", "BILLS", "ENTERTAINMENT", "MISC"],
                        data: [total.food, total.bills, total.entertainment, total.misc],
                        backgroundColor: ['#F57D98', '#4FD9C5', '#58BDE7', '#518EE0'],
                      }
                    ]
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                        position: 'bottom',
                        labels: {
                          usePointStyle: true,
                          boxWidth: 10,
                          boxHeight: 10,
                          padding: 20,
                          generateLabels: function(chart) {
                            return chart.data.labels.map(function(label, i) {
                              return {
                                text: label,
                                fillStyle: chart.data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                              };
                            });
                          }
                        }
                      }
                    }
                  }}
                />

                </div>
              </div>
              <div className='w-[30%] m-[1%] flex flex-col '>
                <div className=' bg-white rounded-t-[10px] border-[1px] border-b-[0px] h-[10%] flex items-center justify-center'>
                  <i class="ri-calendar-todo-line text-[22px] mr-[3.5%]"></i>
                  <span className='text-[15px] font-semibold'>Your Transaction History</span>
                </div>
                <div className=' bg-white rounded-b-[10px] border-[1px] border-t-[0px] h-[90%] overflow-auto'>
                {[...expenseArr].reverse().map((expense , i) => {

                    return (<>
                              <div className=' h-[13%] flex border border-x-[0px]'>
                                  <div className=' w-[25%] h-full flex justify-center items-center'>
                                    <div className='w-[65%] h-[50%] bg-[#F2F4F3] flex justify-center items-center rounded-[5px]'>
                                     <i className={expense.icon}></i>
                                    </div>
                                    
                                  </div>
                                  <div className=' w-[50%] h-full flex flex-col justify-center '>
                                    <div className='text-[15px]'>{expense.name}</div>
                                    <div className='text-[10px] text-[#828583]'>{expense.date}</div>
                                  </div>
                                  <div style={expense.spent ? {color: '#ff3636'} : {color: '#67CEA5'}} className=' w-[25%] text-[15px] font-semibold h-full flex justify-center items-center'>₹{expense.amount}</div>
                                </div>
                              </>)
                   })}
                </div>
              </div>
            </div>
      </div>     
         
    </div>

    {isExpenseOpen ? (<AddMoney 
expenseArr={expenseArr} 
setExpenseArray={setExpenseArray}
handleIsExpenseOpen= {handleIsExpenseOpen}
isExpenseOpen = {isExpenseOpen}
/>) : <></>}
{isPaycheckOpen ? (<AddPaycheck 
expenseArr={expenseArr} 
setExpenseArray={setExpenseArray}
handleIsPaycheckOpen= {handleIsPaycheckOpen}
paycheckAmt = {paycheckAmt}
setPaycheckAmt = {setPaycheckAmt}

/>) : <></>}  

  </div>
  )
}
//paycheckAmt , setPaycheckAmt



//E7E7E7



