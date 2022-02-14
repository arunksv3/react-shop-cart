import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import {
    _URL_I18N_MULTI_LANG,
    _WHITELIST_LANGUAGES,
    _NAMESPACE,
    _DEFAULT_LANGUAGE,
    _DEFAULT_NAMESPACE
} from '../constants'


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        whitelist: _WHITELIST_LANGUAGES,
        lng: _DEFAULT_LANGUAGE,
        fallbackLng: _DEFAULT_LANGUAGE,
        debug: false,
        ns: _NAMESPACE,
        defaultNS: _DEFAULT_NAMESPACE,
        allowMultiLoading: true,
        backend: {
            lng: _DEFAULT_LANGUAGE,
            fallbackLng: _DEFAULT_LANGUAGE,
            debug: false,
            loadPath: _URL_I18N_MULTI_LANG
        }
    });

export default i18n;