import {NavLink, BrowserRouter, Route, Routes, HashRouter} from "react-router-dom";
import AuthorizationPage from './components/AuthorizationPage';
import ContactsPage from './components/ContactsPage';
import './App.css'

function App() {
  return (
    <HashRouter>
    <div className="App">
      <h1> Личный кабинет </h1>
      <h2> Тестовое задание на вакансию Front-end Developer (React) </h2>
      <div className="navbar">
          <NavLink to='/authorization'>Авторизация</NavLink>
          <NavLink to='/contacts'>Контакты</NavLink>
        </div>
      <Routes>
        <Route path='/authorization' element={<AuthorizationPage />} />
        <Route path='/contacts' element={<ContactsPage />}/>
      </Routes>
    </div>
    </HashRouter>
  );
}

export default App;
