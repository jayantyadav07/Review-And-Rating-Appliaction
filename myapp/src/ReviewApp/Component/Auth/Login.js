import React, { useEffect } from "react";
import "./Login.css";
import { SignInUser } from "../../Features/Auth/AuthSlice";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import img from "../../Assets/Group 11648.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../Features/Review/ReviewSlice";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  let { error, message, loading } = data;
  console.log(data)

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
      }, 1000);
    }
    if(message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate("/Company_List");
      }, 1000);
    }
  }, [error, message]);

  const initialState = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "password must have at least 8 characters"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    const result = await dispatch(SignInUser(values));
    // if (result.payload.message == "Login success") {
    //   navigate();
    // }
  };
  return (
    <div class="lcontainer">
      <ToastContainer />
      <div class="leftbox">
        <div class="text">
          <h1>Welcome</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="image">
          <img src={img} height="500px" ></img>
        </div>
      </div>
      <div class="rightbox">
        <div class="image1">
          {/* <img src={img2}></img> */}
          <div class="login">
            <div class="image2"></div>
            <h1>login</h1>

            <p>hello! please enter your details for login</p>
            <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div class="down">
                  <Field
                    type="text"
                    name="email"
                    placeholder="&#x2709; Email"
                  />
                  <br />
                  <ErrorMessage name="email"></ErrorMessage>
                  <br />
                  <Field
                    type="password"
                    name="password"
                    placeholder="&#128274; Password"
                  />
                  <br />
                  <ErrorMessage name="password"></ErrorMessage>
                  <br />

                  <p>
                    <Link to="forgetpassword">forget password??</Link>
                  </p>
                </div>

                <button type="submit">Login</button>
              </Form>
            </Formik>
            <div className="down1">
              <p>I don't have a account on review and rating</p>
              <Link to="signup">Register Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
