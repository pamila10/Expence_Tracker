import React, { useState, useContext } from 'react'
import { GlobalContext, GlobalContextType } from '../context/GlobalContext'
import { nanoid } from 'nanoid'

export const AddTransaction = () => {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState<number | string>(0)
  const { addTransaction } = useContext(GlobalContext) as GlobalContextType

  const onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()

    const newTransaction = {
      id: nanoid(),
      text,
      amount: +amount
    }

    addTransaction(newTransaction)

    setText('')
    setAmount(0)
  }

  return (
    <section className='section'>
      <div className='section__titleWrap'>
        <h3 className='h3'>Add new transaction</h3>
      </div>
      <form className='form' onSubmit={onSubmit}>
        <div className='form__control'>
          <label className='form__label' htmlFor='text'>Transaction name</label>
          <input className='form__input' type='text'
            value={text} onChange={(e) => setText(e.target.value)}
            placeholder='Enter transaction name' />
        </div>
        <div className='form__control'>
          <label className='form__label' htmlFor='amount'>Amount (positive - income, negative - expense)</label>
          <input className='form__input' type='number'
            value={amount} onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount' />
        </div>
        <button className='btn form__btn' type="submit">Add transaction</button>
      </form>
    </section>
  )
}