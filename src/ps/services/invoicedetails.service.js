import request from 'superagent'
import { TIMEOUT_TIME } from '../constants'
import { getHeaders } from '../../utils/HttpRequestUtils'
import Environment from '../config/environment'

export const getInvoiceDetails = async () => {
	const headers = getHeaders()
	const url = `${Environment.baseurl}${Environment.channel}/getinvoicedetails`
	const response = await request.get(url).set(headers).timeout(TIMEOUT_TIME)
	return response.body
}