import { Navigate, Route, Routes } from "react-router-dom";
import Register from '../pages/Register';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import BookList from '../pages/BookList';
import UpdateProfile from '../pages/UpdateProfile';
import Book from '../pages/Book';
import Category from '../pages/Category';
import User from '../pages/User';
import EditBook from '../pages/EditBook';
import EditCategory from '../pages/EditCategory';
import EditUser from '../pages/EditUser';
import { useSelector } from "react-redux";

const AppRoutes=()=>{
    const authData = useSelector((state) => state.auth.user);
    
    return(
        <Routes>
            <Route exact path='/login' element={!authData.user.id? <Login/>  :<Navigate to = '/bookList'/>}/>
            <Route exact path='/' element={authData.user.id? <Navigate to = '/bookList'/> : <Navigate to ='/login'/>}/>
            <Route exact path='/register' element={!authData.user.id?<Register/> :<Navigate to = '/bookList'/> } />
            <Route exact path="/bookList" element={authData.user.id?<BookList/> :<Navigate to = '/login'/> }/>
            <Route exact path='/book' element={<Book />} />
            <Route exact path='/category' element={<Category />} />
            <Route exact path='/add_book' element={<EditBook />} />
            <Route exact path='/edit_book/:id' element={<EditBook />} />
            <Route exact path='/edit_user/:id' element={<EditUser />} />
            <Route exact path='/edit_category/:id' element={<EditCategory />} />
            <Route exact path='/add_category' element={<EditCategory />} />
            <Route exact path='/update-Profile' element={<UpdateProfile />} />
            <Route exact path='/user' element={<User/>} />
            <Route exact path='/cart' element={<Cart />} />
        </Routes>
    );
}
export default AppRoutes;