import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Breadcrumbs, Button, FormControl, InputLabel, Select, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
function Register(){
 return(
        <>
    <Header/>
           
    <div className="jss9">
      <div className="create-account-page-wrapper">
        <div className="container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="breadcrumb-wrapper"
          >
            <Link color="inherit" href="/" title="Home">
              Home
            </Link>
            <Typography color="textPrimary">Create an Account</Typography>
          </Breadcrumbs>

          <Typography variant="h1">Login or Create an Account</Typography>
          <div className="create-account-row">
            <Formik
                          >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-block">
                    <div className="personal-information">
                      <Typography variant="h2">Personal Information</Typography>
                      <p>
                        Please enter the following information to create your
                        account.
                      </p>
                      <div className="form-row-wrapper">
                        <div className="form-col">
                          <TextField
                            id="first-name"
                            name="firstName"
                            label="First Name *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                                                  </div>
                        <div className="form-col">
                          <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="last-name"
                            name="lastName"
                            label="Last Name *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                          />
                         
                        </div>
                        <div className="form-col">
                          <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="email"
                            name="email"
                            label="Email Address *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                          />
                          
                        </div>
                        <div className="form-col">
                          <FormControl
                            className="dropdown-wrapper"
                            variant="outlined"
                          >
                            <InputLabel htmlFor="select">Roles</InputLabel>
                          
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="login-information">
                      <Typography variant="h2">Login Information</Typography>

                      <div className="form-row-wrapper">
                        <div className="form-col">
                          <TextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="password"
                            type="password"
                            name="password"
                            label="Password *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                          />
                          
                        </div>
                        <div className="form-col">
                          <TextField
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            id="confirm-password"
                            name="confirmPassword"
                            label="Confirm Password *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                          />
                          
                        </div>
                      </div>
                      <div className="btn-wrapper">
                        <Button
                          className="pink-btn btn"
                          variant="contained"
                          type="submit"
                          color="primary"
                          disableElevation
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>       
<Footer/>
        </>
    );
};
export default Register;