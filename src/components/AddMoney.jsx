import React from 'react'
import { useState } from 'react'
import moment from 'moment'

export const AddMoney = ({expenseArr , setExpenseArray , handleArray , handleIsExpenseOpen}) => {

  const [selectedOption, setSelectedOption] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputAmount , setInputAmount] = useState(0);

  function handleInputNameChange(event){
    setInputName(event.target.value);
  }

  function handleOptionChange(event){
    setSelectedOption(event.target.value);
  }

  function handleAmountChange(event){
    setInputAmount(event.target.value);
  }

  const currentDate = moment().format('Do MMMM YYYY');

  return (

    <div>
        <div className='fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50 w-[30%] h-[70%]'>
            <div className='h-[30%] bg-[#ff3636] w-[100%] rounded-t-[20px] border border-[#828583] border-b-[0px] text-[20px] text-[#f2f4f3] font-semibold flex justify-center items-center'>ADD EXPENSES</div>
            <div className=' h-[70%] w-[100%] bg-[#f2f4f3] rounded-b-[20px] border border-[#828583] border-t-[0px] p-[2%]'>
              <div className='m-[2%] flex flex-col'>
                <label>Comment</label>
                <input className='py-[5%] px-[2%] border border-[#828583] text-[15px]' type='text' value={inputName} onChange={handleInputNameChange} placeholder='Enter text...'/>
              </div>
              <div className='m-[2%] flex flex-col'>
               <label>Amount</label>
               <input className='py-[2%] px-[2%] border border-[#828583]' type='number' value={inputAmount} onChange={handleAmountChange} placeholder='Enter amount...' />
              </div>
              <div className='flex flex-col m-[2%] '>
               <label>Category</label>
                <select className='py-[2%] px-[2%] border border-[#828583]' required value={selectedOption} onChange={handleOptionChange}>
                    <option value={"DefaultOption"}>Select Option</option>
                    <option value={"food"}>FOOD & BEVERAGES</option>
                    <option value={"bills"}>BILLS & PAYMENTS</option>
                    <option value={"entertainment"}>LOGISTICS</option>
                    <option value={"misc"}>MISCELLANEOUS</option>
                  </select>      
              </div> 
              <div className='flex items-center justify-center'>
                <button className='bg-white border border-[#828583] p-[2%] cursor-pointer mt-[5%] rounded-[20px]'
                  onClick={() => {
                    let expenseIcon = ``
                    if(selectedOption == 'food'){
                      expenseIcon = `ri-restaurant-fill text-[20px]`
                    }
                    
                    else if(selectedOption == 'bills'){
                      expenseIcon = `ri-bill-line text-[20px]`
                      
                    }
                    else if(selectedOption == 'entertainment'){
                      expenseIcon = `ri-sofa-line text-[20px]`
                      
                    }
                    else if(selectedOption == 'misc'){
                      expenseIcon = `ri-wallet-line text-[20px]`
                    }

                    setExpenseArray([...expenseArr , {
                      name: inputName,
                      amount: Number(inputAmount),
                      icon: expenseIcon,
                      type: selectedOption,
                      date: currentDate,
                      spent: true
                    } ]);
                    handleIsExpenseOpen();
                }}
                >
                  SUBMIT
                </button>
              </div>
                
            </div>
          
        </div>
    </div>
  )
}

