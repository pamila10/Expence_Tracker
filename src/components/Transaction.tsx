import React, { useContext } from 'react'
import s from './TransactionList.module.scss'
import cn from 'classnames'
import { AiOutlineDelete } from "react-icons/ai"
import { GlobalContext, GlobalContextType, TransactionItemType } from '../context/GlobalContext'

type PropsType = {
  transaction: TransactionItemType,
  idx: number,
}

export const Transaction = ({ transaction, idx }: PropsType) => {
  const { deleteTransaction } = useContext(GlobalContext) as GlobalContextType

  const sign = transaction.amount < 0 ? '-' : '+'

  const currentAmount = Math.abs(transaction.amount)

  return (
    <>
      <li className={cn(s.list__item, transaction.amount >= 0 ? s.plus : s.minus)}>
        <div className={s.list__itemWrap}>
          <span>{transaction.text ? transaction.text : `Transaction ${idx + 1}`}</span>
          <span>{sign}{(Math.round(currentAmount * 10000) / 10000)}</span>
        </div>
        <button className={cn('btnIcon', s.list__delItemBtn)}
          onClick={() => deleteTransaction(transaction.id)}
          title='Remove the transaction'><AiOutlineDelete /></button>
      </li>
    </>
  )
}