import * as RadixToast from "@radix-ui/react-toast";
import "./toast.css";
import React, { useCallback, useState } from "react";
import { Toast, ToastProps } from "./Toast";
import { AppToastContext, AppToastContextType } from "./ToastContext";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastParams, setToastParams] = useState<ToastProps>(() => {
    return {
      open: false,
      onClose: () => setToastParams((p) => ({ ...p, open: false })),
      title: "",
    };
  });

  const showToast = useCallback<AppToastContextType["showToast"]>((props) => {
    setToastParams((params) => ({ ...params, ...props, open: true }));
  }, []);

  return (
    <AppToastContext.Provider value={{ showToast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        <Toast {...toastParams} />
        <RadixToast.Viewport className="ToastViewport" />
      </RadixToast.Provider>
    </AppToastContext.Provider>
  );
};
