import { DAILYSALES_ACTION } from "../../constants";

const initialState = {
  request: null,
  response: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DAILYSALES_ACTION.LOAD:
      return {
        ...state,
        request: null,
        response: null,
        error: null,
      };
    case DAILYSALES_ACTION.SUCCESS:
      return {
        ...state,
        response: action.payload,
      };    
    default:
      return state;
  }
}
