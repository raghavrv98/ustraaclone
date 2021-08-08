import './App.css';
import Header from './containers/header';
import Dashboard from './containers/dashboard';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;
