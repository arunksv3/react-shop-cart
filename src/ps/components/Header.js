import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { withTranslation, useTranslation } from "react-i18next";
import logo from "../../assets/images/etihadcargo.png";
import { LoadEnrolAction } from "../store/actions/enrol.action";
import {
  withSuspense,
  changeLanguage,
  CreateJSCSSfile,
  ReplaceJSCSSfile,
} from "../utils/common";
import { THEME } from "../constants/app.constant";

const Header = ({ enrolConfigResponse, getEnrolConfigData }) => {
  const { t } = useTranslation();
  const [ selectedLanguage, setSelectedLanguage] = useState("en");
  const languages = [
    { label: "Arabic", value: "ar" },
    { label: "English", value: "en" },
  ];

  useEffect(() => {
    applyStyles();
  }, []);

  useEffect(() => {
    if (!enrolConfigResponse) {
      getEnrolConfigData();
    }
  }, [enrolConfigResponse]);

  const applyStyles = () => {
    document.body.classList.add(THEME);
    let mainlink = CreateJSCSSfile("/styles/main.css", "css");
    let customlink = CreateJSCSSfile("/styles/custom.css", "css");
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(mainlink);
    head.appendChild(customlink);
  };

  const onLanguageChange = (e) => {
    changeLanguage(e.value);
    setOrientation(e.value);
    setSelectedLanguage(e.value);
  };


  const setOrientation = (lang) => {
    switch (lang) {
      case "ar":
        ReplaceJSCSSfile("/styles/main.css", "/styles/main.rtl.css", "css");
        document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
        document.getElementsByTagName("body")[0].setAttribute("dir", "rtl");
        break;
      default:
        ReplaceJSCSSfile("/styles/main.rtl.css", "/styles/main.css", "css");
        document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
        document.getElementsByTagName("body")[0].setAttribute("dir", "ltr");
        break;
    }
  };
  return (
    <div class="header-wrapper">
      <div class="container">
        <header class="header">
          <a class="header__logo">
            <img
              width="110"
              src={logo}
              alt="Etihad Cargo"
              title="Etihad Cargo"
            />
          </a>
          <div class="header__block">
            <div className="col-12 d-flex">
              <Dropdown
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e)}
                options={languages}
                placeholder={t("enrolment.header.language.placeholder")}
                optionLabel="label"
              />
            </div>
          </div>
          <a class="l-nav-toggle">
            <svg width="30" height="30">
              <use xlinkHref="assets/images/sprite.svg#sprite-hamburger"></use>
            </svg>
          </a>
        </header>
      </div>
    </div>
  );
};

const mapStateToProps = ({ enrol }) => ({
  enrolConfigResponse: enrol.response,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEnrolConfigData: () => dispatch(LoadEnrolAction()),
    submitEnrolData: (req) => dispatch(SubmitEnrolLoad(req)),
  };
};

export default withSuspense()(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Header))
);
