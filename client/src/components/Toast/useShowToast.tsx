import { useContext } from "react";
import { AppToastContext, AppToastContextType } from "./ToastContext";

export const useShowToast = () =>
  (useContext(AppToastContext) as AppToastContextType)?.showToast;
