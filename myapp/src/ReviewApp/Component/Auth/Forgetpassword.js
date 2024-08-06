import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forgetpassword.css";
import img from "../../Assets/Mask group.png";
import img2 from "../../Assets/Frame 2.png";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../Features/Auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Forgetpassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgetData = useSelector((state) => state.user);
  const { error, forget_message } = forgetData;
  console.log(error, forget_message)
  useEffect(() => {
    if (forget_message) {
      // navigate()
    }
    if (error) {
      navigate("/");
    }
  }, [forget_message, error]);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Please enter valid email"),
  });
  const handleSubmit = async (values) => {
    console.log("values", values);
    localStorage.setItem("email",values.email)
    dispatch(forgetPassword(values));

  };
  const defaultvalue = {
    email: "",
  };

  return (
    <>
      <div className="container">
        <div className="container1">
          <div className="container2">
            <div className="container3">
              <img src={img}></img>
            </div>
            <div className="container4">
              <img src={img2}></img>
            </div>
          </div>
          <Formik
            initialValues={defaultvalue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="container5">
                <h1>
                  Reset<br></br>Password
                </h1>
                <br></br>
                <br></br>
                <Field type="text" name="email" placeholder="email" />

                <button type="submit">Reset</button>
                {/* <button><Link to="Resetpassword">Reset</Link></button> */}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
