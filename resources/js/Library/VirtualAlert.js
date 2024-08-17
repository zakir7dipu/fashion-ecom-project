import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


class VirtualAlert {
    alert
    constructor() {
        this.alert = Swal;
    }

    loading = () => {
        this.alert.fire({
            title: 'Loading...',
            text: 'Please wait',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                bizzAlert.showLoading();
            },
        });
    }

    hideLoading = () => {
        this.alert.hideLoading();
    }

    inputPassword = () => {
        return this.alert.fire({
            title: 'Enter your password',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            showCancelButton: true,
            confirmButtonColor: '#a8237f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure',
        })
    }

    inputFile = () => {
        return this.alert.fire({
            title: 'Select your image.',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload picture'
            },
            confirmButtonText: 'OK',
            confirmButtonColor: '#a8237f',
        })
    }

    inputText = (title, placeHolder, value = null) => {
        return this.alert.fire({
            title: title,
            input: 'text',
            inputValue: value,
            inputPlaceholder: placeHolder,
            // showCancelButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#a8237f',
            inputValidator: (value) => {
                if (!value) {
                    return placeHolder
                }
            }
        })
    }

    errorAlert = (status, message) => {
        this.alert.fire({
            title: status,
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#a8237f',
        })
    }

    confirmAlert = (status, message) => {
        return this.alert.fire({
            title: status,
            text: message,
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#a8237f',
        })
    }

    confirmAlert1 = (status, message) => {
        return this.alert.fire({
            title: status,
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#a8237f',
        })
    }
}

export default VirtualAlert;
