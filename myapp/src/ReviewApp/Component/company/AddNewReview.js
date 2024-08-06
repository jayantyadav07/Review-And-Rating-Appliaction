import React, { useEffect } from "react";
import "./AddNewReview.css";
import *as yup from "yup";
import img from "../../Assets/Mask group.png"
import img2 from "../../Assets/Frame 2.png"
import img3 from "../../Assets/Group 11643.png"
import {ErrorMessage,Field,Form,Formik} from "formik"
import { useNavigate, useParams } from "react-router-dom";
import { clearState,companyReview } from "../../Features/Review/ReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddNewReview() {
  const navigate = useNavigate();
  const param = useParams();
  const {id} = param;
  let user = JSON.parse (localStorage.getItem("user"));
  const dispatch= useDispatch();
  const review = useSelector ((state)=>state.review);
  const {review_msg,loading,error} = review;
  useEffect(()=>{
    if(review_msg){
      toast.success(review_msg,{position:toast.POSITION.TOP_CENTRE});
      setTimeout(() => {
        dispatch(clearState());
        navigate(`/companydetail/${id}`);
        
      }, 1000);
    }
    if (error){
      toast.error(error,{position:toast.POSITION.TOP_CENTRE});
    }
  } ,[review_msg,error]);
  const initialState = {
    subject:"",
    review:"",
    rating:"",
  };
  const validationSchema = yup.object().shape({
    subject:yup.string().required("please enter your subject"),
    review:yup.string().required("please enter your subject"),
    rating:yup.string().required("please enter your subject"),
  })
  const handleSubmit = async (values)=>{
    let obj={
      ...values,
      company_id:id,
      user_id:user._id,

    };
    dispatch(companyReview(obj));

  };
  
  return (
    <>
      <div className="container">
        <div className="container1">
            
           <div className="container2">
      
           <div className="container3"><img src={img} ></img></div>
           <div className="container4"><img src={img2} ></img></div> 
           </div>
           <div className="container5">
           <h2>Add Review</h2>
           <Formik
           initialValues={initialState}
           validationSchema={validationSchema}
           onSubmit={handleSubmit}>
           <Form>
            <Field
           type="text"
           name="subject"
           placeholder="Enter subject" 

           />
          <br/>
          <ErrorMessage name="subject"></ErrorMessage>
           <br/>
           <Field
           type="text"
           name="review"
           placeholder="Enter review" 

           />
           <br/>
           <ErrorMessage name="review"></ErrorMessage>
           <br/>
           <Field
           type="number"
           name="rating"
           placeholder="Enter rating" 

           />
           <br/>
           <ErrorMessage name="review"></ErrorMessage>
           
          <div className="container6"><img src={img3} height="50px"></img></div><br></br><br></br>
           <button type="submit">Save</button>
           </Form>
           </Formik>
           </div>
          
        </div>
      
      </div>
    </>
  );
}
