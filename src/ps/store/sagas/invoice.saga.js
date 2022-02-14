import { call, put, takeEvery } from "redux-saga/effects";
import { getInvoiceDetails} from "../../services/invoicedetails.service";
import { UNEXPECTED_ERROR, INVOICE_ACTION, INVOICEDETAILS_ACTION } from "../../constants";
import { EnrolLoadError} from "../actions/enrol.action";
import { LoadInvoiceSuccess, LoadInvoiceDetailsSuccess} from "../actions/invoice.action";

/*-------------------------------------------
   @Invoice - Load 
-----------------------------------------------*/
function* getInvoiceSagas() {
  let errorObj = {};
    try {
      const response = yield call(getInvoiceReference);    
      const { errorDetails } =  response
      if (!(errorDetails && errorDetails.length)) {
        yield put(LoadInvoiceSuccess(response));
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

function* watchInvoiceResponseSaga() {
  yield takeEvery(INVOICE_ACTION.LOAD, getInvoiceSagas);
}

/*-------------------------------------------
   @Invoice Details - Load 
-----------------------------------------------*/
function* getInvoiceDetailsSagas() {
    let errorObj = {};
      try {
        const response = yield call(getInvoiceDetails);    
        const { errorDetails } =  response
        if (!(errorDetails && errorDetails.length)) {
          yield put(LoadInvoiceDetailsSuccess(response));
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
  
  function* watchInvoiceDetailsResponseSaga() {
    yield takeEvery(INVOICEDETAILS_ACTION.LOAD, getInvoiceDetailsSagas);
  }


export default {
    getInvoiceSagas,
    watchInvoiceResponseSaga,
    watchInvoiceDetailsResponseSaga,
    getInvoiceDetailsSagas  
};
