import { ENROL_ACTION } from "../../constants";

const initialState = {
  response: null,
  enrolresponse: null,
  enrolrequest:null,
  enrolfailed: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ENROL_ACTION.LOAD:
      return {
        ...state,
        request: null,
        response: null,
        error: null,
      };
    case ENROL_ACTION.SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case ENROL_ACTION.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ENROL_ACTION.LOAD_ENROL_SUCCESS:
      return {
        ...state,
        enrolrequest: action.request,
        enrolresponse: null,
        enrolerror: null,
      };
    case ENROL_ACTION.ENROL_SUCCESS:
      return {
        ...state,
        enrolresponse: action.payload,
      };
    case ENROL_ACTION.LOAD_ENROL_FAILED:
      return {
        ...state,
        failedrequest: null,
        failedresponse: null,
        failederror: null,
      };
    case ENROL_ACTION.ENROLFAILED:
      return {
        ...state,
        enrolfailureresponse: action.payload,
      };
    default:
      return state;
  }
}
