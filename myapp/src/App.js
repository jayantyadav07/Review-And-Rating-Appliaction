import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
 import Login from './ReviewApp/Component/Auth/Login';
 import {Signup} from "./ReviewApp/Component/Auth/Signup"
import Page404 from './ReviewApp/Component/Page404';
import Resetpassword from './ReviewApp/Component/Auth/Resetpassword';
import { CreateCompany } from './ReviewApp/Component/company/CreateCompany';
import { CompanyDetails } from './ReviewApp/Component/company/CompanyDetails';
import AddNewReview from './ReviewApp/Component/company/AddNewReview'
import {Company_List} from "./ReviewApp/Component/company/Company_List";
import Forgetpassword from './ReviewApp/Component/Auth/Forgetpassword';

 
// import {Protected_route} from "./ReviewApp/Component/Protected/Proctected_route"


function App() {
  return (
   <div>
  
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup/" element={<Signup/>}></Route>

        <Route path='/Company_List' element={<Company_List/>}></Route>
        <Route path='/CreateCompany' element={<CreateCompany/>}></Route>
        <Route path="/resetpassword/" element={<Resetpassword/>}></Route>
        <Route path="/*" element={<Page404/>}></Route>
        <Route path ="/companydetail/:id" element={<CompanyDetails/>}></Route>
        <Route path ="/addcompanyreview/:id" element={<AddNewReview/>}></Route>
        {/* <Route path ="/navbar/" element={<Protected_route Component={Navbar_New}/>}></Route> 
         <Route path ="/company/" element={<Protected_route Component={CreateCompany}/>}></Route>
        <Route path ="/Company_List/" element={<Protected_route Component={Company_List}/>}></Route>  */}
        <Route path="/forgetpassword/" element={<Forgetpassword/>}></Route>
        {/* <Route path="/user/reset-password/:id/:token" element={<Resetpassword/>}></Route> */}
        <Route path="/user/reset-password/:id" element={<Resetpassword/>}></Route>
        
         <Route path='Create_company' element={CreateCompany}></Route>
      </Routes>
    </BrowserRouter> 
   </div>
  );
}

export default App;
