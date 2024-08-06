import {configureStore} from "@reduxjs/toolkit";
import {applyMiddleware} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import AuthSlice from "../Features/Auth/AuthSlice";

import ReviewSlice from "../Features/Review/ReviewSlice";
import CompanySlice from "../Features/Company/CompanySlice";

const store = configureStore(
    {
        reducer:{
           user: AuthSlice,
       
           review: ReviewSlice,
           company: CompanySlice,

        },
    },
    applyMiddleware(thunk)
);
export default store
