const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const enrolconfigResponse = require('./responses/_config_fieldsdata.json')
const enrolsuccessresponse = require('./responses/_enrol_success.json');
const enrolerrorresponse = require('./responses/_enrol_error.json');
const invoiceresults = require('./responses/_invoice_reference.json');
const invoicedetails = require('./responses/_invoice_details.json');
const dailysalesresults = require('./responses/_dailysales_results.json');
const PORT = 4200
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/ps/getuserenrolfields', (_req, res) => {
	setTimeout(() => res.status(200).json(enrolconfigResponse), 2000)
})

app.get('/ps/submitEnrolSuccess', (_req, res) => {
	setTimeout(() => res.status(200).json(enrolsuccessresponse), 2000)
})

app.get('/ps/submitEnrolFailure', (_req, res) => {
	setTimeout(() => res.status(200).json(enrolerrorresponse), 2000)
})

app.get('/ps/getinvoicedata', (_req, res) => {
	setTimeout(() => res.status(200).json(invoiceresults), 2000)
})

app.get('/ps/getinvoicedetails', (_req, res) => {
	setTimeout(() => res.status(200).json(invoicedetails), 2000)
})

app.get('/ps/getdetailsalesresults', (_req, res) => {
	setTimeout(() => res.status(200).json(dailysalesresults), 2000)
})

app.listen(PORT, () => console.log(`PS-Mock serveris running on port ${PORT}!`));