import React, { useContext } from 'react'
import s from './IncomeExpence.module.scss'
import cn from 'classnames'
import { GlobalContext } from '../context/GlobalContext'

export const IncomeExpence = () => {
  const { transactions } = useContext(GlobalContext)

  const amounts = transactions.map(transaction => transaction.amount)

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2)

  return (
    <div className={s.incExp}>
      <div className={s.incExp__wrap}>
        <span className={s.incExp__subtitle}>Income</span>
        <span className={cn(s.incExp__title, s.incExp__title_plus)}>{income}</span>
      </div>
      <div className={s.incExp__wrap}>
        <span className={s.incExp__subtitle}>Expence</span>
        <span className={cn(s.incExp__title, s.incExp__title_minus)}>{expense}</span>
      </div>
    </div>
  )
}