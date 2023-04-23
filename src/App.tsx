import './App.scss';
import { AddTransaction } from './components/AddTransaction';
import { Balance } from './components/Balance';
import { Header } from './components/Header';
import { IncomeExpence } from './components/IncomeExpence';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <div className="container">
          <Header />
          <main className="main">
            <Balance />
            <IncomeExpence />
            <AddTransaction />
          </main>
        </div>
      </div>
    </GlobalProvider>
  )
}

export default App;
