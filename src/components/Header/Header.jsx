import React from "react";
import Logo from "../Image/Logo/tatva.png";
import cartIcon from "../Image/cart.png";
import searchIcon from "../Image/search.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button, List, ListItem, TextField } from "@mui/material";



function Header(){
    return(

       <div class="jss1">
       <header class="MuiPaper-root MuiAppBar-root MuiAppBar-positionStatic MuiAppBar-colorPrimary site-header MuiPaper-elevation4" id="header">
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
                      <>
                        <ListItem>
                          <Link to="/Login" title="Login">
                            Login
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link to="/Register" title="Register">
                            Register
                          </Link>
                        </ListItem>
                      </>
                  </List>
                  <List className="cart-country-wrap">
                    <ListItem className="cart-link">
                      <Link to="/cart" title="Cart">
                        <img src={cartIcon} alt="cart.png" />
                        <span>0</span>
                        Cart
                      </Link>
                    </ListItem>
    
                  </List>
       </div>
       </div>
       </div>
       </div>
       </div>
       <div className="search-overlay"></div>
          <div className="header-search-wrapper">
            <div className="container">
              <div className="header-search-outer">
                <div className="header-search-inner">
                  <div className="text-wrapper">
                    <TextField
                      id="text"
                      name="text"
                      placeholder="What are you looking for..."
                      variant="outlined"/>
                      
                     <Button
                     type="submit"
                     className="green-btn btn"
                     variant="contained"
                     color="primary"
                     disableElevation>
                    <em>
                      <img src={searchIcon} alt="search" />
                    </em>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
       </header>
       </div>


    )
}

export default Header;