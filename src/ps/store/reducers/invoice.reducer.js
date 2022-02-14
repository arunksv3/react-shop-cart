import { INVOICE_ACTION, INVOICEDETAILS_ACTION } from "../../constants";

const initialState = {
  request: null,
  response: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INVOICE_ACTION.LOAD:
      return {
        ...state,
        request: null,
        response: null,
        error: null,
      };
    case INVOICE_ACTION.SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case INVOICEDETAILS_ACTION.LOAD:
      return {
        ...state,
        request: null,
        response: null,
        error: null,
      };
    case INVOICEDETAILS_ACTION.SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
}
