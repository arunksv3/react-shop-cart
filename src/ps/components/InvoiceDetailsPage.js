import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { withTranslation, useTranslation } from "react-i18next";
import { withSuspense } from "../utils/common";
import { ProgressSpinner } from "primereact/progressspinner";
import Header from "../components/Header";
import { FIELDTYPE_TEXTFIELD, FIELDTYPE_DROPDOWN } from "../constants";
import { LoadInvoiceDetailsAction } from "../store/actions/invoice.action";

const InvoiceDetailsPage = ({
  getInvoiceDetails,
  invoiceDetails,
}) => {
  const [invoicedetails, setInvoiceDetails] = useState([]);
  const [invoicecurrency, setInvoiceCurrency] = useState(null);
  const [invoicenumber, setInvoiceNumber] = useState(null);
  const [formloaded, isFormLoaded] = useState(false);
  const { t } = useTranslation();

  const headersize = { width: "100%" };

  useEffect(() => {
    if (!invoiceDetails) {
        getInvoiceDetails();
    } else {
      const { data, currency, invoicenumber } = invoiceDetails.response;
      setInvoiceNumber(invoicenumber);
      setInvoiceCurrency(currency);
      setInvoiceDetails(data);
      setTimeout(() => {
        isFormLoaded(true);
      }, 500);
    }
  }, [invoiceDetails]);

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  return (
    <div>
      <Header />
      <section class="content">
        <div class="container">
          <div class="invoice">
            <h2>{t("invoicedetails.title")}</h2>           
            <div class="invoice-ref__info">
  <label>{t("invoicedetails.invoicenumber")} {invoicenumber}</label>
              <span>
                {t("invoicedetails.currency")} {invoicecurrency && invoicecurrency}
              </span>
            </div>
            <div className="invoice-ref__table">
              <div className="card">
                {invoicedetails && (
                  <DataTable
                    value={invoicedetails}
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft}
                    paginatorRight={paginatorRight}
                    scrollable
                    style={{ width: "100%" }}
                  >
                    <Column
                      field="type"
                      header="AWB No"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="ppdcharge"
                      header="WT & VAL Charge(PPD)"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="ppdue"
                      header="PPD (Due EY)"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="cctcharge"
                      header="WT & VAL Charge(CCT)"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="cctdue"
                      header="CCT (Due Agent)"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="normalcommission"
                      header="Normal Commission"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="vatcommision"
                      header="VAT on commission"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="weight"
                      header="Weight (kg)"
                      headerStyle={headersize}
                    ></Column>
                     <Column
                      field="rate"
                      header="Rate"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="netdue"
                      header="Net Due (EY)"
                      headerStyle={headersize}
                    ></Column>                   
                  </DataTable>
                )}
                {!formloaded && (
                  <div class="form-row">
                    <ProgressSpinner />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ invoice }) => ({
    invoiceDetails: invoice.response,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInvoiceDetails: () => dispatch(LoadInvoiceDetailsAction()),
  };
};

export default withSuspense()(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(InvoiceDetailsPage))
);
