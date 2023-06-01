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
import Book from './pages/Book';
import Category from './pages/Category';
import User from './pages/User';
import EditBook from './pages/EditBook';
import EditCategory from './pages/EditCategory';
import EditUser from './pages/EditUser';
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
            <Route path='/book' element={<Book/>}/>
            <Route path='/edit_book' element={<EditBook/>}/>
            <Route path='/category' element={<Category/>}/>
            <Route path='/edit_category' element={<EditCategory/>}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/edit_user' element={<EditUser/>}/>
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
