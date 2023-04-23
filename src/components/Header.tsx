import s from './Header.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <h1 className='h1'>Expense Tracker</h1>
    </header>
  )
}