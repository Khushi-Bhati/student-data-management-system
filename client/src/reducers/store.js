// store.js
import { configureStore } from "@reduxjs/toolkit";
import {  Studentreducer } from "./Reducers.js";


const store = configureStore({
     reducer:Studentreducer
});

export default store;
