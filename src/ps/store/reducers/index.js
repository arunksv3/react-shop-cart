import { combineReducers } from 'redux';
import enrolmentReducer from "./enrol.reducer";
import invoiceReducer from "./invoice.reducer";
import salesResultsReducer from "./dailysales.reducer";

const psReducer = () =>
    combineReducers({
        enrol: enrolmentReducer,  
        invoice: invoiceReducer,  
        salesresults: salesResultsReducer  
    });

export default psReducer
