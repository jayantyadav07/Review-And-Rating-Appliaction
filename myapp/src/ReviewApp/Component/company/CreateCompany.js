import React, { useEffect, useState } from "react";
import "./CreateCompany.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {createCompany} from "../../Features/Company/CompanySlice"
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export const CreateCompany = () => {
  const dispatch = useDispatch();

const companydata = useSelector((state) => state.company);
let {error, loading, cmpcreate_msg} = companydata;
 const [pic, setPic] = useState("");

 useEffect(() => {
  if(cmpcreate_msg) {
    toast.success(cmpcreate_msg, { position: toast.POSITION.TOP_CENTER });
  }
  if(error) {
    toast.error(error, {position: toast.POSITION.TOP_CENTER});
  }
  
}, [cmpcreate_msg, error]);


  const initialState = {
    companyName: "",
    location: "",
    city: "",
    founded: "",
  };

  const validationSchema = yup.object().shape({
    companyName: yup.string().required("Please enter company name"),
    location: yup.string().required("Please enter company location"),
    city: yup.string().required("Please enter city"),
    founded: yup.string().required("Please enter company founded date"),
  });

  function handleSubmit(values) {
    // console.log("Values", values);
    const user = JSON.parse(localStorage.getItem("user"));
    let obj = {
      ...values,
      company_logo: pic,
      userId: user._id,
    }
    // console.log("this is object", obj);
    dispatch(createCompany(obj));
  }

  function addCompanyPic(e){
    setPic(e.target.files[0])
  }

  return (
    <>
    <ToastContainer/>
      <div className="add-container">
        <div className="add-company">
          <h1 className="add-com-h1">Add Company</h1>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="createCom-form">
              <label>Company name</label> <br />
              <Field
                className="add-com-input"
                type="text"
                name="companyName"
                placeholder="Enter..."
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="companyName"></ErrorMessage>
              </span>
              <br />
              <label>Location</label>
              <br />
              <Field
                className="add-com-input"
                type="location"
                name="location"
                placeholder="Select location"
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="location"></ErrorMessage>
              </span>
              <br />
              <label>City</label> <br />
              <Field
                className="add-com-input"
                type="city"
                name="city"
                placeholder="Select City"
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="city"></ErrorMessage>
              </span>
              <br />
              <label>Founded On</label>
              <br />
              <Field className="add-com-input" type="Date" name="founded" />
              <br />
              <span className="danger-message">
                <ErrorMessage name="founded"></ErrorMessage>
              </span>
              <br />
              <input type="file" name="company_logo" onChange={addCompanyPic}></input>
              <br />
              <button className="add-btn" type="submit">
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};