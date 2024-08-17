    import Notify from "./Notifi";
    import React from "react";
    import moment from "moment";

    function errorMessage(error) {
        Notify("error", error)
    }


    function errorResponseMessage(error) {
        if (error.response) {
            let errorObject = error.response.data.errors;
            let hasError = Object.getOwnPropertyNames(errorObject)
            if (hasError) {
                hasError.forEach(err => {
                    Notify("error", errorObject[err][0])
                })
            } else {
                Notify("error", error.response.data.message)
            }
        }
    }


    function reduxErrorMessage(errors) {
        let errorObject = errors;
        let hasError = Object.getOwnPropertyNames(errorObject)
        if (hasError) {
            hasError.forEach(err => {
                Notify("error", errorObject[err][0])
            })
        } else {
            Notify("error", errors.message)
        }
    }

    function inertiaErrorMessage(errors) {
        const entries = Object.entries(errors);
        if (entries) {
            entries.forEach(([key, value]) => {
                Notify("error", value)
            });
        } else {
            Notify("error", errors.message)
        }
    }

    function successMessage(success) {
        Notify("success", success)
    }

    function infoMessage(info) {
        Notify("info", info)
    }

    function warningMessage(warning) {
        Notify("warning", warning)
    }


    const printAndCompanyData = (params) =>{
        const dataObject = {};
        for (const [key, value] of params.entries()) {
            dataObject[key] = value;
        }
        return dataObject;
    }

    function closeMe()
    {
        window.opener = self;
        window.close();
    }

    function useInternalLink(path) {
        if(path==null){
            return ""
        }else{
            const assetUrl = import.meta.env.VITE_API_BASE_URL
            return `${assetUrl}/${path}`;
        }
    }

    function ucwords (str) {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase();
        });
    }

    const labelNameRSt = (str)=>{
        var new_str = str.replace('_', ' ')
        var new_str1 = new_str.replace('_', ' ')
        var new_str2 = new_str1.replace('_', ' ')
        var new_str3 = new_str2.replace('_', ' ')
        return ucwords(new_str3)
    }

    const uid = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function getDaysArrayByMonth() {
        return new Array(moment().daysInMonth()).fill(null).map((x, i) => moment().startOf('month').add(i, 'days'));
    }

    export {
        errorMessage,
        errorResponseMessage,
        successMessage,
        infoMessage,
        warningMessage,
        printAndCompanyData,
        closeMe,
        reduxErrorMessage,
        useInternalLink,
        ucwords,
        inertiaErrorMessage,
        getDaysArrayByMonth,
        uid,
        labelNameRSt,
    }
