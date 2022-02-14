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
import { LoadInvoiceAction } from "../store/actions/invoice.action";

const InvoicePage = ({
  enrolConfigResponse,
  getInvoiceData,
  invoiceReferences,
}) => {
  const [invoicedata, setInvoiceData] = useState([]);
  const [invoicecurrency, setInvoiceCurrency] = useState([]);
  const [invoicetemplate, setInvoiceTemplate] = useState(null);
  const [invoicereq, setInvoiceRequest] = useState([]);
  const [formloaded, isFormLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (enrolConfigResponse) {
      const { filters } = enrolConfigResponse.ui.invoice.layout.elements;
      setInvoiceTemplate(filters);
      setTimeout(() => {
        isFormLoaded(true);
      }, 500);
    }
  }, [enrolConfigResponse]);

  const headersize = { width: "100%" };

  const setFilterReq = (field, value) => {
    setInvoiceRequest({
      ...invoicereq,
      [field]: value,
    });
  };

  useEffect(() => {
    if (!invoiceReferences) {
      getInvoiceData();
    } else {
      const { data, currency } = invoiceReferences.response;
      setInvoiceCurrency(currency);
      setInvoiceData(data);
    }
  }, [invoiceReferences]);

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const filterInvoiceReq = () => {
    const searchlists = searchList();
    setInvoiceData(searchlists);
  };

  const searchList = () => {
    const { data } = invoiceReferences.response;
    const req = data.filter((d) => {
      let dt = new Date(d.cctcharge);
      return (
        invoicereq.billingperiodyear == dt.getFullYear() &&
        invoicereq.billingperiodmonth == dt.getMonth() + 1
      );
    });
    if (req.length > 0) return req;
    else return data;
  };

  return (
    <div>
      <Header />
      <section class="content">
        <div class="container">
          <div class="invoice">
            <h2>{t("invoice.title")}</h2>
            <div class="l-widget pb-2">
              <form>
                <div class="form-row">
                  {invoicetemplate &&
                    invoicetemplate.fields.map((f, findex) => (
                      <div class="form-group col-lg-4 col-md-6">
                        <label for={f.name}>
                          {t(`invoice.filter.label.${f.name}`)}
                        </label>
                        {(() => {
                          switch (f.fieldType) {
                            case FIELDTYPE_TEXTFIELD:
                              return (
                                <>
                                  <InputText
                                    className={
                                      validationerrors &&
                                      validationerrors[f.name] !== undefined &&
                                      validationerrors[f.name] !== null
                                        ? "form-control l-mandatory-input"
                                        : "form-control"
                                    }
                                    onChange={(e) =>
                                      setFilterReq(f.name, e.target.value)
                                    }
                                    id={f.name}
                                    type="text"
                                    placeholder={t("invoice.combo.placeholder")}
                                  />
                                </>
                              );
                              break;
                            case FIELDTYPE_DROPDOWN:
                              return (
                                <>
                                  <div class="d-flex">
                                    <Dropdown
                                      className="mr-2"
                                      value={invoicereq[f.name]}
                                      onChange={(e) =>
                                        setFilterReq(f.name, e.target.value)
                                      }
                                      options={
                                        f.additional !== undefined &&
                                        f.additional[0]["options"].length > 0
                                          ? f.additional[0].options
                                          : null
                                      }
                                      placeholder={t(
                                        "invoice.combo.placeholder"
                                      )}
                                      optionLabel="label"
                                    />
                                  </div>
                                </>
                              );
                              break;
                          }
                        })()}
                      </div>
                    ))}
                  {!formloaded && <ProgressSpinner />}
                </div>
                <div class="form-row">
                  <div class="form-group col-12 text-right">
                    <button
                      onClick={() => filterInvoiceReq()}
                      class="l-btn l-btn--primary"
                      type="button"
                    >
                      {t("invoice.button.search")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="invoice-ref__info">
              <label>{t("invoice.period")} 1 March 2008-15 mar 2008</label>
              <span>
                {t("invoice.currency")} {invoicecurrency && invoicecurrency}
              </span>
            </div>
            <div className="invoice-ref__table">
              <div className="card">
                {invoicedata && (
                  <DataTable
                    value={invoicedata}
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
                      header="Invoice type"
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
                      field="discount"
                      header="Discount"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="netdue"
                      header="Net due (EY)"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="awbdiscount"
                      header="AWB Count"
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

const mapStateToProps = ({ enrol, invoice }) => ({
  enrolConfigResponse: enrol.response,
  invoiceReferences: invoice.response,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInvoiceData: () => dispatch(LoadInvoiceAction()),
  };
};

export default withSuspense()(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(InvoicePage))
);
