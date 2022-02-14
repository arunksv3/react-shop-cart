import { call, put, takeEvery } from "redux-saga/effects";
import { getDailySalesResults} from "../../services/dailysalesresult.service";
import { UNEXPECTED_ERROR, DAILYSALES_ACTION } from "../../constants";
import { EnrolLoadError} from "../actions/enrol.action";
import {LoadDailySalesSuccess } from "../actions/dailysales.action";

/*-------------------------------------------
   @Daily Sales Results - Load 
-----------------------------------------------*/
function* getSalesResultsSagas() {
    let errorObj = {};
      try {
        const response = yield call(getDailySalesResults);    
        const { errorDetails } =  response
        if (!(errorDetails && errorDetails.length)) {
          yield put(LoadDailySalesSuccess(response));
        } else {
          errorObj = {
            handledError: true,
            description: ENROLERRORACTION,
            type: "Error",
          };
          yield put(EnrolLoadError(errorObj));
        }
      } catch (e) {
        errorObj = {
          handledError: false,
          description: UNEXPECTED_ERROR,
          type: "Error",
        };
        yield yield put(EnrolLoadError(errorObj));
      }  
  }
  
  function* watchSalesResponseSaga() {
    yield takeEvery(DAILYSALES_ACTION.LOAD, getSalesResultsSagas);
  }

  export default {
    getSalesResultsSagas,
    watchSalesResponseSaga  
};