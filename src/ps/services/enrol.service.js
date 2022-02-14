import request from 'superagent'
import { TIMEOUT_TIME } from '../constants'
import { getHeaders } from '../../utils/HttpRequestUtils'
import Environment from '../config/environment'

export const getEnrolmentConfig = async () => {
	const headers = getHeaders()
	const url = `${Environment.baseurl}${Environment.channel}/getuserenrolfields`
	const response = await request.get(url).set(headers).timeout(TIMEOUT_TIME)
	return response.body
}

export const getEnrolmentSuccessResponse = async (req) => {
	const headers = getHeaders()
	const url = `${Environment.baseurl}${Environment.channel}/submitEnrolSuccess`
	const response = await (await request.get(url).set(headers).timeout(TIMEOUT_TIME)).body;
	response.response.data.push(req);
	return response
}

export const getEnrolmentFailureResponse = async () => {
	const headers = getHeaders()
	const url = `${Environment.baseurl}${Environment.channel}/submitEnrolFailure`
	const response = await request.get(url).set(headers).timeout(TIMEOUT_TIME)
	return response.body
}
