import { Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Movies from './components/Movies';
import NoPage from './components/common/NoPage';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import NewForm from './components/NewForm';
import './App.css';

 
function App() {
  return (
    <div className="App">
    <NavBar />
    <main className="container">
        <Routes>
          
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies/:id" element={<MovieForm />} />
        <Route index element={<Movies />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/new" element={<NewForm />} />
       
        <Route path="*" element={<NoPage />} />
      </Routes>
      </main>
    </div>

  );
}

export default App;
