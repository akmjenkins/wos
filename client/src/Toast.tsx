import * as RadixToast from "@radix-ui/react-toast";
import "./toast.css";
import React from "react";

type ToastProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description: React.ReactNode;
};

export const Toast = ({ open, onClose, title, description }: ToastProps) => {
  return (
    <RadixToast.Provider swipeDirection="right">
      <RadixToast.Root className="ToastRoot" open={open} onOpenChange={onClose}>
        <RadixToast.Title className="ToastTitle">{title}</RadixToast.Title>
        <RadixToast.Description className="ToastDescription">
          {description}
        </RadixToast.Description>
      </RadixToast.Root>
      <RadixToast.Viewport className="ToastViewport" />
    </RadixToast.Provider>
  );
};
