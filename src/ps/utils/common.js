import React, { Suspense } from "react";
import i18n from "i18next";
import request from 'superagent'
import { getHeaders } from '../../utils/HttpRequestUtils'

export const convertToLowerCase = (value) => {
  let nameConverted;
  if (value) {
    nameConverted =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return nameConverted;
};

export const withSuspense = () => (CargoComponent) =>
  class HOC extends React.Component {
    render() {
      return (
        <Suspense fallback="Loading...">
          <CargoComponent {...this.props} />
        </Suspense>
      );
    }
  };

export const changeLanguage = (lang) => {
  if (lang && lang !== null) {
    i18n.changeLanguage(lang);
    return;
  }
  i18n.changeLanguage("en");
};

export const CreateJSCSSfile = (filename, filetype) => {
  if (filetype == "js") {
    //if filename is a external JavaScript file
    var fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
  } else if (filetype == "css") {
    //if filename is an external CSS file
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
  }
  return fileref;
};

export const ReplaceJSCSSfile = (oldfilename, newfilename, filetype) => {
  var targetelement =
    filetype == "js" ? "script" : filetype == "css" ? "link" : "none"; //determine element type to create nodelist using
  var targetattr =
    filetype == "js" ? "src" : filetype == "css" ? "href" : "none"; //determine corresponding attribute to test for
  var allsuspects = document.getElementsByTagName(targetelement);
  for (var i = allsuspects.length; i >= 0; i--) {
    //search backwards within nodelist for matching elements to remove
    if (
      allsuspects[i] &&
      allsuspects[i].getAttribute(targetattr) != null &&
      allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) != -1
    ) {
      var newelement = CreateJSCSSfile(newfilename, filetype);
      allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
    }
  }
};

const TIMEOUT_TIME = 5000;

export const getMockServiceDetails = async (URL) => {
	const headers = getHeaders()
	const response = await request.get(URL).set(headers).timeout(TIMEOUT_TIME)
	return response.body
}

export const fetchConfiguration = (section) => {
  return async (dispatch) => {
    return await getMockServiceDetails(_URL_)
      .then((response) => {
        dispatch({
          type: SET_CONFIG_DATA,
          payload: { config: response.data.object, type: section },
        });
      })
      .catch((error) => {
        isApiResponseAuthorized(error);
      });
  };
};
