import { all } from 'redux-saga/effects'
import EnrolSagas from './enrol.saga'
import InvoiceSagas from './invoice.saga'
import SalesResultSagas from './dailysales.saga'

export default function* pSaga() {
	yield all([
		EnrolSagas.watchEnrolResponseSaga(),
		EnrolSagas.watchSubmitEnrolResponseSuccessSaga(),
		EnrolSagas.watchSubmitEnrolResponseFailedSaga(),
		InvoiceSagas.watchInvoiceResponseSaga(),
		InvoiceSagas.watchInvoiceDetailsResponseSaga(),
		SalesResultSagas.watchSalesResponseSaga()		
	])
}
