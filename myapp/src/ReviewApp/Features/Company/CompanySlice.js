import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CompanyDetails } from "../../Component/company/CompanyDetails";
let initialState = {
  cmpcreate_msg: "",
  cmplist_msg: "",
  cmpDetail_msg: "",
  company_data: "",
  loading: false,
  error: "",
  company_details:"",
};


export const getCompanyDetails = createAsyncThunk(
  "company/getCompanyDetails",
  async(id,thunkAPI)=>{
    const resResult = await fetch (
      `http://localhost:9000/company/details/${id}`,
      {
        method:"get",
        headers:{
          Accept:"application/json",
          "Context-type":"application/json"
        },
      }
    );
    let data= await resResult.json();
    if(data.status){
      return data;
    }else{
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const createCompany = createAsyncThunk(
  "company/create",
  async (body, thunkAPI) => {
    const res = await axios.post("http://localhost:9000/company/create", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  }
);

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async (thunkAPI) => {
    // console.log("get Comapnies slice");
    const resResult = await fetch("http://localhost:9000/company/list", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await resResult.json();
    if (data.success) {
      return data;
    } else {
      return thunkAPI.rejectWithValues(data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearState: (state) => {
      state.cmpcreate_msg = "";
      state.error = "";
    },
  },

  //for company details
 
  extraReducers: {
    [createCompany.pending]: (state, { payload }) => {
      console.log("pending........");
      state.loading = true;
      state.error = " ";
      state.cmpcreate_msg = "";
    },
    [createCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("fulfilled,payload");
      state.cmpcreate_msg = payload.data.message;
    },
    [createCompany.rejected]: (state, { payload }) => {
      console.log("this is error", payload);
      console.log("request rejected");
      state.loading = false;
      state.error = payload.error;
    },
    //for getting all companies
    [getCompanies.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getCompanies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
      } else {
        state.cmplist_msg = payload.message;
        state.company_data = payload.companies;
      }
    },
    [getCompanies.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },


    [getCompanyDetails.pending]:(state,{payload})=>{
      state.loading=true;
      state.error="";
      state.compDtails_msg="";
      state.company_details="";
    },
    [getCompanyDetails.fulfilled]:(state,{payload})=>{
      state.loading =false;
      if(payload.error){
        state.error=payload.error;
        state.cmpcreate_msg="";
        state.company_details="";

      }else{
        state.cmpDetail_msg = payload.message;
        state.company_details = payload.compDetails;
        state.error="";
      }
    },
    [getCompanyDetails.rejected]:(state,{payload})=>{
      state.loading=false;
      state.error=payload.error;
      state.compDtails_msg="";
      state.company_details="";
    },
  },
});
export default companySlice.reducer;
export const { clearState } = companySlice.actions;