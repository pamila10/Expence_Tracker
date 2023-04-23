import { createContext, ReactElement, useEffect, useReducer } from "react"

export type TransactionItemType = {
  id: string;
  text: string;
  amount: number;
}

type TransactionsStateType = { transactions: TransactionItemType[] }

const initialState: TransactionsStateType = {
  transactions:
    localStorage.getItem('transactions') === null
      ? []
      : JSON.parse(localStorage.getItem('transactions')!).transactions
}

enum REDUCER_ACTION_TYPE {
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  DELETE_TRANSACTION = 'DELETE_TRANSACTION',
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE.ADD_TRANSACTION;
  payload: TransactionItemType;
} | {
  type: REDUCER_ACTION_TYPE.DELETE_TRANSACTION;
  payload: string;
}

export const appReducer = (state: TransactionsStateType, action: ReducerAction): TransactionsStateType => {
  const { type, payload } = action

  switch (type) {
    case REDUCER_ACTION_TYPE.ADD_TRANSACTION:
      if (!payload) {
        throw new Error('payload missing in ADD_TRANSACTION action')
      }

      return {
        ...state,
        transactions: [payload, ...state.transactions]
      }

    case REDUCER_ACTION_TYPE.DELETE_TRANSACTION:
      if (!payload) {
        throw new Error('payload missing in DELETE_TRANSACTION action')
      }

      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== payload),
      }

    default:
      return state;
  }
}

export type GlobalContextType = {
  transactions: TransactionItemType[];
  addTransaction: (transaction: TransactionItemType) => void;
  deleteTransaction: (id: string) => void;

}

export const GlobalContext = createContext<GlobalContextType | TransactionsStateType>(initialState)

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const GlobalProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state))
  }, [state])

  const value = {
    transactions: state.transactions,
    addTransaction: (transaction: TransactionItemType) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.ADD_TRANSACTION,
        payload: transaction
      })
    },
    deleteTransaction: (id: string) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.DELETE_TRANSACTION,
        payload: id
      })
    }
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}
