import React from 'react'
import { useState } from 'react'
import moment from 'moment'

export const AddPaycheck = ({expenseArr , setExpenseArray, automateBudget  , handleIsPaycheckOpen, paycheckAmt , setPaycheckAmt}) => {

  const [inputComment, setInputComment] = useState('');
  const [inputPaycheckAmt , setInputPaycheckAmt] = useState(0);

  function handleCommentChange(event){
    setInputComment(event.target.value);
  }

  function handlePaycheckChange(event){
    setInputPaycheckAmt(Number(event.target.value));
  }
  
  const currentDate = moment().format('Do MMMM YYYY');



//paycheckAmt = {paycheckAmt}
//setPaycheckAmt = {setPaycheckAmt}
  return (

    <>
        <div className='fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50  w-[30%] h-[60%]'>
          <div className='h-[30%] bg-[#66CEA5] w-[100%] rounded-t-[20px] border border-[#828583] border-b-[0px] text-[20px] text-[#f2f4f3] font-semibold flex justify-center items-center'>ADD PAYCHECK</div>
            <div className='h-[70%] w-[100%] bg-[#f2f4f3] rounded-b-[20px] border border-[#828583] border-t-[0px] p-[2%]'>
              <div className='m-[2%] flex flex-col'>
                <label>Comment</label>
                <input className='py-[2%] px-[2%] border border-[#828583]' type='text' value={inputComment} onChange={handleCommentChange} placeholder='ENTER TEXT'/>
              </div>
              <div className='m-[2%] flex flex-col'>
                <label>Amount</label>
                <input className='py-[5%] px-[2%] border border-[#828583] text-[15px]' type='number' value={inputPaycheckAmt} onChange={handlePaycheckChange} placeholder='ENTER AMOUNT' />
              </div>
                
              <div className='flex items-center justify-center'>
                <button className='bg-white border border-[#828583] p-[2%] cursor-pointer mt-[5%] rounded-[20px]'
                  onClick={() => {
                    
                    // let temp = Number(paycheckAmt + inputPaycheckAmt);
                    setPaycheckAmt(prevAmount => (prevAmount + inputPaycheckAmt));

                    setExpenseArray([...expenseArr , {
                      name: inputComment,
                      amount: Number(inputPaycheckAmt),
                      icon: `ri-arrow-right-down-line text-[20px]`,
                      date: currentDate,
                      spent: false
                    } ]);
                    // automateBudget()
                    handleIsPaycheckOpen();
                    
                    
                }}
                >
                  SUBMIT
                </button>
              </div>

                
            </div>
          
        </div>
    </>
  )
}


