import React from "react";
import { ToastProps } from "./Toast";

export type AppToastContextType = {
  showToast: (props: Pick<ToastProps, "description" | "title">) => void;
};

export const AppToastContext = React.createContext<
  AppToastContextType | undefined
>(undefined);
