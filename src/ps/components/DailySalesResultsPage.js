import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { withTranslation, useTranslation } from "react-i18next";
import { withSuspense } from "../utils/common";
import { ProgressSpinner } from "primereact/progressspinner";
import Header from "../components/Header";

import {
  FIELDTYPE_TEXTFIELD,
  FIELDTYPE_DROPDOWN,
  FIELDTYPE_DATE,
  FIELDTYPE_AUTOCOMPLETE,
} from "../constants";
import { LoadDailySalesAction } from "../store/actions/dailysales.action";

const DailySalesResultsPage = ({
  enrolConfigResponse,
  getSalesResultsData,
  salesResults,
}) => {
  const [airports, setAirports] = useState([]);
  const [filteredairports, setFilteredAirports] = useState(null);
  const [salesresultsdata, setSalesResultsData] = useState([]);
  const [salesawbcount, setSalesResultsAwbCount] = useState(null);
  const [salestotalweight, setSalesTotalWeight] = useState(null);
  const [salesnetdue, setSalesNetDue] = useState(null);
  const [salesresultstemplate, setSalesResultsTemplate] = useState(null);
  const [salesresultsreq, setSalesResultsRequest] = useState([]);
  const [formloaded, isFormLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (enrolConfigResponse) {
      const { filters } = enrolConfigResponse.ui.salesresults.layout.elements;
      setSalesResultsTemplate(filters);
      setTimeout(() => {
        isFormLoaded(true);
      }, 500);
    }
    getAirportCodes();
  }, [enrolConfigResponse]);

  const headersize = { width: "100%" };

  const getAirportCodes = () => {
    fetch("/mock/_airports.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        setAirports(res.data);
      });
  };

  const setFilterReq = (field, value) => {
    setSalesResultsRequest({
      ...salesresultsreq,
      [field]: value,
    });
  };

  useEffect(() => {
    if (!salesResults) {
      getSalesResultsData();
    } else {
      const { data, totalweight, totalnetdue, awbcount } =
        salesResults.response;
      setSalesResultsAwbCount(awbcount);
      setSalesTotalWeight(totalweight);
      setSalesNetDue(totalnetdue);
      setSalesResultsData(data);
    }
  }, [salesResults]);

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const filterSalesResults = () => {
    const searchlists = searchList();
    setSalesResultsData(searchlists);
  };

  const searchList = () => {
    const { data } = salesResults.response;
    const req = data.filter((d) => {       
      return (
        salesresultsreq.awbnumber == d.awbno
      );
    });
    if (req.length > 0) return req;
    else return data;
  };

  const searchAutocompleteFilter = (event) => {
    setTimeout(() => {
      let _filteredAirports;
      if (!event.query.trim().length) {
        _filteredAirports = [...airports];
      } else {
        _filteredAirports = airports.filter((airport) => {
          return airport.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
      setFilteredAirports(_filteredAirports);
    }, 250);
  };

  return (
    <div>
      <Header />
      <section class="content">
        <div class="container">
          <div class="invoice">
            <h2>{t("salesresults.title")}</h2>
            <div class="l-widget pb-2">
              <form>
                <div class="form-row">
                  {salesresultstemplate &&
                    salesresultstemplate.fields.map((f, findex) => (
                      <div class="form-group col-lg-4 col-md-6">
                        <label for={f.name}>
                          {t(`salesresults.filter.label.${f.name}`)}
                        </label>
                        {(() => {
                          switch (f.fieldType) {
                            case FIELDTYPE_TEXTFIELD:
                              return (
                                <>
                                  <div class="d-flex">
                                    <InputText
                                      className="form-control"
                                      onChange={(e) =>
                                        setFilterReq(f.name, e.target.value)
                                      }
                                      id={f.name}
                                      type="text"
                                      placeholder={t(
                                        "salesresults.combo.placeholder"
                                      )}
                                    />
                                  </div>
                                </>
                              );
                              break;
                            case FIELDTYPE_DROPDOWN:
                              return (
                                <>
                                  <div class="d-flex">
                                    <Dropdown
                                      className="mr-2"
                                      value={salesresultsreq[f.name]}
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
                                        "salesresults.combo.placeholder"
                                      )}
                                      optionLabel="label"
                                    />
                                  </div>
                                </>
                              );
                              break;
                            case FIELDTYPE_DATE:
                              return (
                                <>
                                  <div class="d-flex">
                                    <Calendar
                                      dateFormat="dd M yy"
                                      placeholder={t(
                                        "salesresults.combo.placeholder"
                                      )}
                                      className="form-control"
                                      id="basic"
                                      value={salesresultsreq[f.name]}
                                      onChange={(e) =>
                                        setFilterReq(f.name, e.target.value)
                                      }
                                    />
                                  </div>
                                </>
                              );
                              break;
                            case FIELDTYPE_AUTOCOMPLETE:
                              return (
                                <>
                                  <div class="d-flex">
                                    <AutoComplete
                                      placeholder={t(
                                        "salesresults.combo.placeholder"
                                      )}
                                      className="form-control"
                                      suggestions={filteredairports}
                                      completeMethod={searchAutocompleteFilter}
                                      field="name"
                                      value={salesresultsreq[f.name]}
                                      onChange={(e) =>
                                        setFilterReq(f.name, e.target.value)
                                      }
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
                      onClick={() => filterSalesResults()}
                      class="l-btn l-btn--primary"
                      type="button"
                    >
                      {t("salesresults.button.search")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="invoice-ref__info">
              <span>
                {t("salesresults.totalawbcount")} {salesawbcount}
              </span>
              <span>
                {t("salesresults.totalweight")}{" "}
                {salestotalweight && salestotalweight}
              </span>
              <span>
                {t("salesresults.totalnetdue")} {salesnetdue && salesnetdue}
              </span>
            </div>
            <div className="invoice-ref__table">
              <div className="card">
                {salesresultsdata && (
                  <DataTable
                    value={salesresultsdata}
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
                      field="awbno"
                      header="AWB No:"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="flightnum"
                      header="Flight No:"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="departuredate"
                      header="Departure Date"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="origin"
                      header="Origin"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="destination"
                      header="Destination"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="weight"
                      header="Weight"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="currency"
                      header="Currency"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="paycondition"
                      header="Pay Condition"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="ppdcharge"
                      header="WT & VAL Charge"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="ppdue"
                      header="Prepaid due (EY)"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="ccda"
                      header="Charge Collect Due Agt"
                      headerStyle={headersize}
                    ></Column>
                    <Column
                      field="netdue"
                      header="Net Due(EY)"
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

const mapStateToProps = ({ enrol, salesresults }) => ({
  enrolConfigResponse: enrol.response,
  salesResults: salesresults.response,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSalesResultsData: () => dispatch(LoadDailySalesAction()),
  };
};

export default withSuspense()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(DailySalesResultsPage))
);
