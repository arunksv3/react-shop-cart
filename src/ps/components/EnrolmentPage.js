import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation, withTranslation } from "react-i18next";
import { withSuspense } from "../utils/common";
import Header from "../components/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import {  
  SubmitEnrolLoad,
} from "../store/actions/enrol.action";
import {
  FIELDTYPE_TEXTFIELD,
  FIELDTYPE_PASSWORD,
  FIELDTYPE_DROPDOWN_TEXTFIELD,
  FIELDTYPE_DROPDOWN,
  FIELDTYPE_CHECKBOX,
  LIST_FIELDTYPE_CHECKBOX,
  FIELDTYPE_BUTTON,
} from "../constants";

const EnrolmentPage = ({
  enrolConfigResponse,
  getEnrolConfigData,
  submitEnrolresponse,
  submitEnrolData,
}) => {
  const { t } = useTranslation();
  const [enrolfieldsorder, setFieldOrder] = useState([]);
  const [validationerrors, setError] = useState([]);
  const [enrolreqs, setEnrolmentRequest] = useState([]);
  const [enrolfields, setElements] = useState([]);
  const [responsedata, setResponseData] = useState(null);
  const [formfieldsrequired, setFormFields] = useState(null);
  const [formloaded, isFormLoaded] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");
  let formfieldscount = 0;

  useEffect(() => {
    if (enrolConfigResponse) {      
      const { elements, order, buttons } = enrolConfigResponse.ui.enrol.layout;
      setFieldOrder(order);
      setElements(elements);
      setButtons(buttons);
      for (let i in elements) {
        for (let f in elements[i].fields) {
          if (elements[i].fields[f].required) formfieldscount += 1;
        }
      }
      setFormFields(formfieldscount);
    }
    setTimeout(() => {
      isFormLoaded(true);
    }, 3000);
  }, [enrolConfigResponse]);

  useEffect(() => {
    if (submitEnrolresponse) {
      isFormLoaded(false);
      window.scrollTo(0, 0);
      const { success, data } = submitEnrolresponse.response;
      setResponseData(data[0]);
      if (submitEnrolresponse.response && success) {
        isFormLoaded(true);
        onClick("displayBasic");
      }
    }
  }, [submitEnrolresponse]);

  const setEnrolReq = (value, field, req) => {
    prepareEnrolRequest(field, value);
    handleValidation(value, field, req);
  };

  const handleValidation = (value, field, req) => {
    let error = null;
    if (!validateField(value, req))
      error = t(`enrolment.${req[0].customMessageId}`);
    setError({
      ...validationerrors,
      [field]: error,
    });
  };

  const prepareEnrolRequest = (field, value) => {
    setEnrolmentRequest({
      ...enrolreqs,
      [field]: value,
    });
  };

  const validateField = (value, vreq) => {
    const regex = new RegExp(vreq[0].pattern);
    return value && regex.test(value);
  };

  const submitEnrolReq = () => {
    submitEnrolData(enrolreqs);
  };

  const isInvalid = () => {
    let validationfields = Object.values(validationerrors);
    if (
      formfieldsrequired &&
      validationfields.length > 0 &&
      validationfields.length == formfieldsrequired - 1
    )
      return (
        Object.values(validationerrors).findIndex(
          (f) => typeof f == "string"
        ) !== -1
      );
    else return true;
  };

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
    if (position) {
      setPosition(position);
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label={t("enrolment.buttons.close")}
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };

  const onHide = (name) => {
    document.getElementById("elform").reset();
    setError([]);
    dialogFuncMap[`${name}`](false);
  };

  return (
    <>
      <Header />
      <section className="content">
        <div className="container">
          <div className="enrollment">
            <form name="enrolform" id="elform">
              <h2>{t("enrolment.title")}</h2>
              {enrolfieldsorder &&
                enrolfieldsorder.map(
                  (m) =>
                    enrolfields[m] !== undefined && (
                      <>
                        <h3>{t(`enrolment.${m}`)}</h3>
                        <div className="l-widget pb-2">
                          <div className="col-9">
                            <div className="form-row">
                              {enrolfields[m].fields.map((f, findex) => (
                                <div className={f.class}>
                                  {f.fieldType !== LIST_FIELDTYPE_CHECKBOX && (
                                    <label for={f.name}>
                                      {t(`enrolment.form.${f.name}.label`)}
                                    </label>
                                  )}
                                  {(() => {
                                    switch (f.fieldType) {
                                      case FIELDTYPE_TEXTFIELD:
                                        return (
                                          <>
                                            <InputText
                                              className={
                                                validationerrors &&
                                                validationerrors[f.name] !==
                                                  undefined &&
                                                validationerrors[f.name] !==
                                                  null
                                                  ? "form-control l-mandatory-input"
                                                  : "form-control"
                                              }
                                              onChange={(e) =>
                                                setEnrolReq(
                                                  e.target.value,
                                                  f.name,
                                                  f.validations
                                                )
                                              }
                                              id={f.name}
                                              type="text"
                                              placeholder={t(
                                                `enrolment.form.${f.name}.label`
                                              )}
                                            />
                                            {validationerrors &&
                                            validationerrors[f.name] !==
                                              undefined &&
                                            validationerrors[f.name] !==
                                              null ? (
                                              <div class="l-mandatory-text">
                                                {validationerrors[f.name]}
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        );
                                        break;
                                      case FIELDTYPE_PASSWORD:
                                        return (
                                          <>
                                            <InputText
                                              className={
                                                validationerrors &&
                                                validationerrors[f.name] !==
                                                  undefined &&
                                                validationerrors[f.name] !==
                                                  null
                                                  ? "form-control l-mandatory-input"
                                                  : "form-control"
                                              }
                                              onChange={(e) =>
                                                setEnrolReq(
                                                  e.target.value,
                                                  f.name,
                                                  f.validations
                                                )
                                              }
                                              id={f.name}
                                              type="password"
                                              placeholder={t(
                                                `enrolment.form.${f.name}.label`
                                              )}
                                            />
                                            {validationerrors &&
                                            validationerrors[f.name] !==
                                              undefined &&
                                            validationerrors[f.name] !==
                                              null ? (
                                              <div class="l-mandatory-text">
                                                {validationerrors[f.name]}
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        );
                                        break;
                                      case FIELDTYPE_DROPDOWN_TEXTFIELD:
                                        return (
                                          <>
                                            <div class="d-flex">
                                              <Dropdown
                                                className="mr-2"
                                                value={
                                                  enrolreqs[
                                                    f.additional[0]["name"]
                                                  ]
                                                }
                                                onChange={(e) =>
                                                  setEnrolReq(
                                                    e.target.value,
                                                    f.additional[0].name,
                                                    f.additional[0].validations
                                                  )
                                                }
                                                options={
                                                  f.additional !== undefined &&
                                                  f.additional[0]["options"]
                                                    .length > 0
                                                    ? f.additional[0].options
                                                    : null
                                                }
                                                placeholder="ISDCode"
                                                optionLabel="label"
                                              />
                                              <InputText
                                                className={
                                                  validationerrors &&
                                                  validationerrors[f.name] !==
                                                    undefined &&
                                                  validationerrors[f.name] !==
                                                    null
                                                    ? "form-control l-mandatory-input"
                                                    : "form-control"
                                                }
                                                onChange={(e) => (
                                                  e.target.value,
                                                  f.name,
                                                  f.validations
                                                )}
                                                id={f.name}
                                                type="text"
                                                placeholder={t(
                                                  `enrolment.form.${f.name}.label`
                                                )}
                                              />
                                              {validationerrors &&
                                              validationerrors[f.name] !==
                                                undefined &&
                                              validationerrors[f.name] !==
                                                null ? (
                                                <div class="l-mandatory-text">
                                                  {validationerrors[f.name]}
                                                </div>
                                              ) : (
                                                <></>
                                              )}
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
                                                value={enrolreqs[f.name]}
                                                onChange={(e) =>
                                                  setEnrolReq(
                                                    e.target.value,
                                                    f.name,
                                                    f.validations
                                                  )
                                                }
                                                options={
                                                  f.additional !== undefined &&
                                                  f.additional[0]["options"]
                                                    .length > 0
                                                    ? f.additional[0].options
                                                    : null
                                                }
                                                placeholder={t(
                                                  `enrolment.form.${f.name}.label`
                                                )}
                                                optionLabel="label"
                                              />
                                              {validationerrors &&
                                              validationerrors[f.name] !==
                                                undefined &&
                                              validationerrors[f.name] !==
                                                null ? (
                                                <div class="l-mandatory-text">
                                                  {validationerrors[f.name]}
                                                </div>
                                              ) : (
                                                <></>
                                              )}
                                            </div>
                                          </>
                                        );
                                        break;
                                      case FIELDTYPE_CHECKBOX:
                                        return (
                                          <div class="form-row">
                                            <div className={f.class}>
                                              <div class="l-chkbox">
                                                <input
                                                  onChange={(e) =>
                                                    prepareEnrolRequest(
                                                      f.name,
                                                      e.target.value
                                                    )
                                                  }
                                                  value={f.value}
                                                  id="confirm"
                                                  type="checkbox"
                                                />
                                                <label for="confirm">
                                                  {t(
                                                    `enrolment.form.${f.name}.labeloption`
                                                  )}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                        break;
                                      case LIST_FIELDTYPE_CHECKBOX:
                                        return (
                                          <>
                                            <ul class="enrollment-list">
                                              {f.additional &&
                                                f.additional[0].options.map(
                                                  (el, index) => {
                                                    return (
                                                      <li class="enrollment-list__item">
                                                        <div class="l-chkbox">
                                                          <input
                                                            type="checkbox"
                                                            id={`responsibilities_${index}`}
                                                            onChange={(e) =>
                                                              prepareEnrolRequest(
                                                                `responsibilities_${index}`,
                                                                e.target.value
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            for={`responsibilities_${index}`}
                                                          >
                                                            {t(
                                                              `enrolment.form.${el.label}.label`
                                                            )}
                                                          </label>
                                                        </div>
                                                      </li>
                                                    );
                                                  }
                                                )}
                                            </ul>
                                          </>
                                        );
                                        break;
                                    }
                                  })()}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                )}
              {formloaded && (
                <div class="l-btn-wrapper">
                  <button
                    class="l-btn l-btn--primary"
                    type="button"
                    disabled={isInvalid() ? "disabled" : ""}
                    onClick={() => submitEnrolReq()}
                  >
                    {t("enrolment.buttons.completeprofile")}
                  </button>
                  <button class="l-btn l-btn--cancel" type="button">
                    {t("enrolment.buttons.cancel")}
                  </button>
                </div>
              )}
              {!formloaded && (
                <div className="l-widget pb-2">
                  <div className="form-row">
                    <ProgressSpinner />
                  </div>
                </div>
              )}
            </form>
          </div>
          <div className="dialog-demo">
            <div className="card">
              <Dialog
                header={t("enrolment.heading")}
                visible={displayBasic}
                style={{ width: "50vw" }}
                footer={renderFooter("displayBasic")}
                onHide={() => onHide("displayBasic")}
              >
                <div className="l-alert l-alert--success">
                  <div className="l-alert__icon">
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <h3>
                    {t("enrolment.greeting")}
                    {submitEnrolresponse &&
                      responsedata &&
                      responsedata.firstname + " " + responsedata.lastname}
                  </h3>
                  <p>{t("enrolment.greeting-text")}</p>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = ({ enrol }) => ({
  enrolConfigResponse: enrol.response,
  submitEnrolresponse: enrol.enrolresponse,
});

const mapDispatchToProps = (dispatch) => {
  return {
    submitEnrolData: (req) => dispatch(SubmitEnrolLoad(req)),
  };
};

export default withSuspense()(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EnrolmentPage))
);
