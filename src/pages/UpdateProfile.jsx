import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

import "../css/updateprofile_style.css"
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../components/ValidationErrorMessage";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import Shared from "../utils/shared";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfile = () => {
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth.user);

  const initialValueState = {
    email: authData.email,
    firstName: authData.firstName,
    lastName: authData.lastName,
    newPassword: "",
    confirmPassword: ""
  }

  const [updatePassword, setUpdatePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    newPassword: Yup.string().min(5, "Minimum 5 charactor is required"),
    confirmPassword: updatePassword
      ? Yup.string()
          .required("Must required")
          .oneOf([Yup.ref("newPassword")], "Passwords is not match")
      : Yup.string().oneOf([Yup.ref("newPassword")], "Passwords is not match"),
  });

  const onSubmit = async (values) => {
    const password = values.newPassword ? values.newPassword : authData.password;
    delete values.confirmPassword;
    delete values.newPassword;
    const data = Object.assign(authData, { ...values, password });
    const res = await userService.updateProfile(data);
    if (res) {
      dispatch.setUser(res);
      toast.success(Shared.messages.UPDATED_SUCCESS);
      navigate("/");
    }
  };

  return (
    <>
    <Header/>
    <div className="updateprofileWrapper">
      <div className="container">
        <Typography variant="h1">Update Profile</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <form action="" onSubmit={handleSubmit}>
                <div className="form-row-wrapper">
                  <div className="form-col">
                    <TextField
                      id="first-name"
                      name="firstName"
                      label="First Name *"
                      variant="outlined"
                      value={values.firstName}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ValidationErrorMessage
                      message={errors.firstName}
                      touched={touched.firstName}
                    />
                  </div>
                  <div className="form-col">
                    <TextField
                      id="last-name"
                      name="lastName"
                      label="Last Name *"
                      variant="outlined"
                      value={values.lastName}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ValidationErrorMessage
                      message={errors.lastName}
                      touched={touched.lastName}
                    />
                  </div>
                  <div className="form-col">
                    <TextField
                      id="email"
                      name="email"
                      label="Email *"
                      variant="outlined"
                      value={values.email}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ValidationErrorMessage
                      message={errors.email}
                      touched={touched.email}
                    />
                  </div>
                  <div className="form-col">
                    <TextField
                      id="newPassword"
                      name="newPassword"
                      label="New Password "
                      variant="outlined"
                      value={values.newPassword}
                      inputProps={{ className: "small" }}
                      onChange={(e) => {
                        e.target.value !== ""
                          ? setUpdatePassword(true)
                          : setUpdatePassword(false);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                    <ValidationErrorMessage
                      message={errors.newPassword}
                      touched={touched.newPassword}
                    />
                  </div>
                  <div className="form-col">
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password "
                      variant="outlined"
                      value={values.confirmPassword}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ValidationErrorMessage
                      message={errors.confirmPassword}
                      touched={touched.confirmPassword}
                    />
                  </div>
                </div>
                <div className="btn-wrapper">
                  <Button
                    className="green-btn btn"
                    variant="contained"
                    type="submit"
                    color="primary"
                    disableElevation
                    onClick={() => {
                    navigate("/booklist");
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    className="pink-btn btn"
                    variant="contained"
                    type="submit"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      navigate("/booklist");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UpdateProfile;
