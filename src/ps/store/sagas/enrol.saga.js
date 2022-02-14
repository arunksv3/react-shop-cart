import { call, put, take, takeEvery } from "redux-saga/effects";
import { getEnrolmentConfig, getEnrolmentSuccessResponse, getEnrolmentFailureResponse } from "../../services/enrol.service";
import { ENROL_ACTION, UNEXPECTED_ERROR } from "../../constants";
import { EnrolLoadSuccess, EnrolLoadError, SubmitEnrolSuccess, SubmitEnrolFailed } from "../actions/enrol.action";

/*-------------------------------------------
   @Enrolment - Load 
-----------------------------------------------*/
function* getEnrolmentSagas() {
  let errorObj = {};
    try {
      const response = yield call(getEnrolmentConfig);    
      const { enrolconfig, errorDetails } =  response
      if (!(errorDetails && errorDetails.length)) {
        yield put(EnrolLoadSuccess(response));
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

function* watchEnrolResponseSaga() {
  yield takeEvery(ENROL_ACTION.LOAD, getEnrolmentSagas);
}
/*-------------------------------------------
   @Enrolment - Success 
-----------------------------------------------*/

function* getEnrolmentSuccessSagas({ formData }) {
  let errorObj = {};
    try {
      const response = yield call(getEnrolmentSuccessResponse, formData);    
      const { enrolconfig, errorDetails } =  response
      if (!(errorDetails && errorDetails.length)) {
        yield put(SubmitEnrolSuccess(response));
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

function* watchSubmitEnrolResponseSuccessSaga() {
  yield takeEvery(ENROL_ACTION.LOAD_ENROL_SUCCESS, getEnrolmentSuccessSagas);
}

/*-------------------------------------------
   @Enrolment - Failed 
-----------------------------------------------*/
function* getEnrolmentFailedSagas() {
  let errorObj = {};
    try {
      const response = yield call(getEnrolmentFailureResponse);    
      const { enrolconfig, errorDetails } =  response
      if (!(errorDetails && errorDetails.length)) {
        yield put(SubmitEnrolFailed(response));
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

function* watchSubmitEnrolResponseFailedSaga() {
  yield takeEvery(ENROL_ACTION.LOAD_ENROL_FAILED, getEnrolmentFailedSagas);
}

export default {
  getEnrolmentSagas,
  watchEnrolResponseSaga,
  getEnrolmentSuccessSagas,
  getEnrolmentFailedSagas, 
  watchSubmitEnrolResponseSuccessSaga,
  watchSubmitEnrolResponseFailedSaga
};
