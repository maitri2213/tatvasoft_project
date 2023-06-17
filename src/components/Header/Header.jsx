import React, { useMemo, useState } from "react";
import Logo from "../Image/Logo/tatva.png";
import cartIcon from "../Image/cart.png";
import searchIcon from "../Image/search.png";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { AppBar, Button, List, ListItem, TextField } from "@mui/material";
import Shared from "../../utils/shared";

import { RoutePaths } from "../../utils/enum";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bookService from "../../service/book.service";

import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../state/slice/cartSlice";
import { signOut } from "../../state/slice/authSlice";


function Header(){
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);
  const authData = useSelector((state) => state.auth.user);
  const [query, setquery] = useState("");
  const [bookList, setbookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const navigate = useNavigate();

  // for mobile menu
  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };

  const items = useMemo(() => {
    return Shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authData.user.roleId)
    );
  }, [authData.user]);

  const logOut = () => {
    //authContext.signOut();
    //cartContext.emptyCart();
    dispatch(signOut());
  };

  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setbookList(res);
  };

  const search = (defaultFilter) => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchResult(true);
  };

  const addToCart = (book) => {
    if (!authData.user.id) {
      navigate('/login');
      toast.error("Please login before adding books to cart");
    } else {
      Shared.addToCart(book, authData.user.id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Item added in cart");
          dispatch(fetchCartData(authData.id));
        }
      });
    }
  };

    return(

       <div class="jss1">
       <AppBar className="site-header" id="header" position="static">
       <div class="top-header">
       </div>
       <div class="bottom-header">
       <div class="container">
       <div class="header-wrapper">
       <div class="logo-wrapper">
       <Link to="/" className="site-logo" title="logo">
                  <img src={Logo} alt="logo" />
       </Link>
       </div>
       <div class="nav-wrapper">
       <div class="top-right-bar">
       <List className="top-nav-bar">
       {!authData.user.id && (
                      <>
                        <ListItem>
                          <NavLink to={RoutePaths.Login} title="Login">
                            Login
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <Link to={RoutePaths.Register} title="Register">
                            Register
                          </Link>
                        </ListItem>
                      </>
                    )}
                    {items.map((item, index) => (
                      <ListItem key={index}>
                        <Link to={item.route} title={item.name}>
                          {item.name}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  <List className="cart-country-wrap">
                    <ListItem className="cart-link">
                      <Link to="/cart" title="Cart">
                        <img src={cartIcon} alt="cart.png" />
                        <span>{cartData.cartData.length}</span>
                        Cart
                      </Link>
                    </ListItem>
                    <ListItem className="hamburger" onClick={openMenu}>
                      <span></span>
                    </ListItem>
                  </List>
                  {authData.user.id && (
                    <List className="right">
                      <Button onClick={() => logOut()} variant="outlined">
                        Log out
                      </Button>
                    </List>
                  )}
       </div>
       </div>
       </div>
       </div>
       </div>
       <div className="search-overlay"onChange={() => {
            setOpenSearchResult(false);
            document.body.classList.remove("search-results-open");
          }}></div>
          <div className="header-search-wrapper">
            <div className="container">
              <div className="header-search-outer">
                <div className="header-search-inner">
                  <div className="text-wrapper">
                    <TextField
                      id="text"
                      name="text"
                      placeholder="What are you looking for..."
                      variant="outlined"
                      value={query}
                     onChange={(e) => setquery(e.target.value)}
                      />
                      {openSearchResult && (
                    <>
                      <div className="product-listing">
                        {bookList?.length === 0 && (
                          <p className="no-product">No product found</p>
                        )}

                        {/* <p className="loading">Loading....</p> */}
                        <List className="related-product-list">
                          {bookList?.length > 0 &&
                            bookList.map((item, i) => {
                              return (
                                <ListItem key={i}>
                                  <div className="inner-block">
                                    <div className="left-col">
                                      <span className="title">{item.name}</span>
                                      <p>{item.description}</p>
                                    </div>
                                    <div className="right-col">
                                      <span className="price">
                                        {item.price}
                                      </span>
                                      <Link onClick={() => addToCart(item)}>
                                        Add to cart
                                      </Link>
                                    </div>
                                  </div>
                                </ListItem>
                              );
                            })}
                        </List>
                      </div>
                    </>
                  )}
                </div>
                     <Button
                     type="submit"
                     className="green-btn btn"
                     variant="contained"
                     color="primary"
                     disableElevation
                     onClick={search}>
                    <em>
                      <img src={searchIcon} alt="search" />
                    </em>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
       
      </AppBar>
       </div>


    )
}

export default Header;