import { DAILYSALES_ACTION } from "../../constants";

export const LoadDailySalesAction = () => ({
  type: DAILYSALES_ACTION.LOAD,
});

export const LoadDailySalesSuccess = (payload)=>({
	type: DAILYSALES_ACTION.SUCCESS,
	payload
});




