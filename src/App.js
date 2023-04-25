import './App.css';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom'
import ProductInfo from './components/productinfo';
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={<ProductInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
