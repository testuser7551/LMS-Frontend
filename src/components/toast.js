

// utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Common toast function
export const showToast = (
  message,
  position = "top-right",
  time = 3000, // default 3s
) => {
  toast(message, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "custom-toast",
    progressClassName: "toast-progress"
  });
};
