import React, { useContext, useState } from 'react'
import s from './Balance.module.scss'
import cn from 'classnames'
import { GlobalContext } from '../context/GlobalContext'
import { GoChecklist } from "react-icons/go"
import { TransactionList } from './TransactionList'

export const Balance = () => {
  const { transactions } = useContext(GlobalContext)
  const [isOpen, setIsOpen] = useState(false)
  const amounts = transactions.map(transaction => transaction.amount)
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

  return (
    <div className={s.balance}>
      <div className={s.balance__wrap}>
        <span className={s.balance__subtitle}>Your balance</span>
        <h2 className={cn(s.balance__title, 'h2')}>${total}</h2>
      </div>
      <div className={s.balance__wrap}>
        <button className={cn(s.balance__btn, 'btnIcon btnIcon_lg')} title='View history'
          onClick={() => setIsOpen(true)}><GoChecklist /></button>
      </div>
      {isOpen && (
        <div className='modal' onClick={() => setIsOpen(false)}>
          <TransactionList onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div >
  )
}