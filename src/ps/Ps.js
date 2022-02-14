import React, { useRef, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import EnrolmentPage from "./components/EnrolmentPage";
import InvoicePage from "./components/InvoicePage";
import InvoiceDetailsPage from "./components/InvoiceDetailsPage";
import DailySalesResultsPage from "./components/DailySalesResultsPage";

export const Page = () => {
  return (
    <>
      <div className="main-wrapper">
        <Switch>
          <Route exact path="/enrol" component={EnrolmentPage} />          
          <Route exact path="/invoice" component={InvoicePage} />          
          <Route exact path="/invoicedetails" component={InvoiceDetailsPage} />          
          <Route exact path="/salesresults" component={DailySalesResultsPage} />          
        </Switch>
      </div>
    </>
  );
};

export default Page;
