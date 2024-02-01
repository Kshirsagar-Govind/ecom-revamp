import { toast } from "react-toastify";

export const SuccessNotify = (msg, pos) => {
  let position = pos || "top-right";
  toast.success(msg, {
    position,
    theme: "light",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const ErrorNotify = (msg, pos) => {
  let position = pos || "top-right";

  toast.error(msg, {
    position,
    theme: "colored",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const WarningNotify = (msg, pos) => {
  let position = pos || "top-right";

  toast.warning(msg, {
    theme: "light",
    position,
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const InfoNotify = (msg, pos) => {
  let position = pos || "top-right";

  toast.info(msg, {
    theme: "light",
    position,
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
