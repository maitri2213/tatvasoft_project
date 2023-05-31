import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { AuthWrapper, useAuthContext } from './context/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BookList from './pages/BookList';
import UpdateProfile from './pages/UpdateProfile';

function App() {
  const authContext = useAuthContext();
  const Redirect = <Navigate to={"/login"} />
  return (
    <>
      <BrowserRouter>
        <AuthWrapper>
          <ToastContainer className="toast"
            autoClose="1000" />
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={!authContext.user.id ? <Register/> : Redirect} />
            <Route path='/booklist' element={ !authContext.user.id ?<BookList/> :Redirect }/>
            <Route path='/update-profile' element={<UpdateProfile />}/>
            <Route path='/cart' element={<Cart />}/>
            
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
