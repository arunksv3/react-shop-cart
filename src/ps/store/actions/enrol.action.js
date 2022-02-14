import { ENROL_ACTION } from "../../constants";

export const LoadEnrolAction = () => ({
  type: ENROL_ACTION.LOAD,
});

export const EnrolLoadSuccess = (payload)=>({
	type: ENROL_ACTION.SUCCESS,
	payload
});

export const EnrolLoadError = (payload)=>({
	type: ENROL_ACTION.ERROR,
	payload
});

export const SubmitEnrolLoad = (formData)=>({
	type: ENROL_ACTION.LOAD_ENROL_SUCCESS,
	formData
});

export const SubmitEnrolSuccess = (payload)=>({
	type: ENROL_ACTION.ENROL_SUCCESS,
	payload
});

export const SubmitEnrolFailedLoad = (payload)=>({
	type: ENROL_ACTION.LOAD_ENROL_FAILED,
	payload
});

export const SubmitEnrolFailed = (payload)=>({
	type: ENROL_ACTION.ENROL_FAILED,
	payload
});

export const clearEnrol = () => ({
	type: ENROL_ACTION.CLEAR
})

