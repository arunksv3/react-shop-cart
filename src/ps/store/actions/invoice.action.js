import { INVOICE_ACTION, INVOICEDETAILS_ACTION } from "../../constants";

export const LoadInvoiceAction = () => ({
  type: INVOICE_ACTION.LOAD,
});

export const LoadInvoiceSuccess = (payload)=>({
	type: INVOICE_ACTION.SUCCESS,
	payload
});

export const LoadInvoiceDetailsAction = () => ({
  type: INVOICEDETAILS_ACTION.LOAD,
});

export const LoadInvoiceDetailsSuccess = (payload)=>({
	type: INVOICEDETAILS_ACTION.SUCCESS,
	payload
});



