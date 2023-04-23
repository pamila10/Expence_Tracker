import React, { useContext } from 'react'
import s from './TransactionList.module.scss'
import { Transaction } from './Transaction'
import { GlobalContext } from '../context/GlobalContext'
import { AiOutlineClose } from 'react-icons/ai'

type props = {
  onClose: Function
}

export const TransactionList = ({ onClose }: props) => {
  const { transactions } = useContext(GlobalContext)

  return (
    <section className='section modal__content'
      onClick={(e) => e.stopPropagation()}>
      <div className='section__titleWrap'>
        <h3 className='h3'>History</h3>
        <button className={'btnIcon modal__closeBtn'}
          onClick={() => onClose()}>
          <AiOutlineClose />
        </button>
      </div>
      {transactions.length > 0 ?
        <ul className={s.list}>
          {transactions.map((transaction, idx) => (
            <Transaction key={transaction.id} transaction={transaction} idx={idx} />
          ))}
        </ul> :
        <p>The transactions list is empty</p>
      }
    </section>
  )
}