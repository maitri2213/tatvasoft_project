import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/login_style.css"
import { Breadcrumbs, Button,  TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { toast } from "react-toastify";
import ValidationErrorMessage from "../components/ValidationErrorMessage";
import authService from "../service/auth.service";
import { useAuthContext } from "../context/auth";
import * as Yup from "yup";
function Login(){
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be 5 characters at minimum")
      .required("Password is required"),
  });
  
  const onSubmit = (values) => {
    console.log("form data", values)
    authService.login(values).then((res) => {
      delete res._id;
      delete res.__v;
      authContext.setUser(res);
      navigate("/booklist");
      toast.success("Successfully logged in");
    });
  };
    return(
        <>
            <Header/>
            <div className="loginWrapper">
      <div className="login-page-wrapper">
        <div className="container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="breadcrumb-wrapper"
          >
            <Link color="inherit" href="/" title="Home">
              Home
            </Link>
            <Typography color="textPrimary">Login</Typography>
          </Breadcrumbs>
          <Typography variant="h1">Login or Create an Account</Typography>
          <div className="login-row">
            <div className="form-block">
              <Typography variant="h2">Registered Customers</Typography>
              <p>If you have an account with us, please log in.</p>
              <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
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
                    <div className="form-row-wrapper">
                      <div className="form-col">
                        <TextField
                          id="email"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Email Address *"
                          autoComplete="off"
                          variant="outlined"
                          inputProps={{ className: "small" }}
                        />
                        <ValidationErrorMessage
                          message={errors.email}
                          touched={touched.email}
                        />
                      </div>
                      <div className="form-col">
                        <TextField
                          id="password"
                          name="password"
                          label="Password *"
                          type="password"
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{ className: "small" }}
                          autoComplete="off"
                        />
                         <ValidationErrorMessage
                          message={errors.password}
                          touched={touched.password}
                        />
                       
                      </div>
                      <div className="btn-wrapper">
                        <Button
                          type="submit"
                          className="pink-btn btn"
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Login
                        </Button>
                        <div className="new-customer-wrapper">
                        <Typography variant="h3">New Customers</Typography>
                        <p1>If you have not  an account with us, please create  an account.</p1>
                        <Button
                          className="pink-btn btn"
                          variant="contained"
                          type="submit"
                          color="primary"
                          disableElevation
                          onClick={() => {
                           navigate("/register");
                          }}
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
    </div>
            <Footer/>
        </>
    )
}
export default Login;