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
            <Route path='/update-profile' element={!authContext.user.id ?<UpdateProfile /> : Redirect}/>
            <Route path='/book' element={!authContext.user.id ?<Book/> : Redirect} />
            <Route path='/edit_book/:id' element={!authContext.user.id ?<EditBook/>: Redirect}/>
            <Route path='/category' element={!authContext.user.id ?<Category/>: Redirect}/>
            <Route path='/edit_category/:id' element={!authContext.user.id ?<EditCategory/>: Redirect}/>
            <Route path='/cart' element={!authContext.user.id ?<Cart /> : Redirect}/>
            <Route path='/user' element={!authContext.user.id ?<User/>: Redirect}/>
            <Route path='/edit_user/:id' element={!authContext.user.id ?<EditUser/>: Redirect}/>
            <Route path='/add_book' element={!authContext.user.id ?<EditBook/>: Redirect}/>
            <Route path='/add_category' element={!authContext.user.id ?<EditCategory/>: Redirect}/>
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
