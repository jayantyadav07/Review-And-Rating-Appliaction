import React ,{useEffect}from "react";
import * as yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Resetpassword.css";
import img from "../../Assets/Mask group.png"
import img2 from "../../Assets/Frame 2.png"
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { resetpasswords } from "../../Features/Auth/AuthSlice";
export default function Resetpassword() {

const param = useParams ();
const {token, id} = param;
const dispatch = useDispatch();
const navigate= useNavigate();
const resetstate = useSelector((state)=> state.user);
const {error,message}= resetstate;
// useEffect(()=>{
//   if (message){
   
//     navigate("/");
//   }
//   if (error){
    
//   }
// },[message,error]);
    const validationSchema = yup.object().shape({
      });

      const defaultValue = {
       newpassword:"",
       confirmpassword:"",
      };
      const handleSubmit =async (values)=>{
        if(values.newpassword === values.confirmpassword){

          console.log("values" , values);
          let obj={
            ...values,
            id:id,
            token:token,
          }
          dispatch(resetpasswords(obj));
        }
        else{
          alert("Do not Match password")
        }
      }
    
  return (
    <>
       
      <div className="container">
        <div className="container1">
            
           <div className="container2">
      
           <div className="container3"><img src={img}></img></div>
           <div className="container4"><img src={img2}></img></div> 
           </div>
           <Formik
           initialValues={defaultValue}
           validationSchema={validationSchema}
           onSubmit={handleSubmit}>
           <Form>
           <div className="container5">
           
           <h1>Reset<br></br>Password</h1><br></br><br></br>
           <Field
               
                type="text"
                name="newpassword"
                placeholder="newpassword"
              />
              <Field
               
               type="text"
               name="confirmpassword"
               placeholder="confirmpassword"
             />
          
           <button  type="submit">Reset</button></div>
           </Form>
           </Formik>
        </div>
        
      </div>
    </>
  );
}
