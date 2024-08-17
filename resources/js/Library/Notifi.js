import {toast} from "react-toastify";

const Notify = (type, message) => {
    return toast[type](message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

export default Notify
