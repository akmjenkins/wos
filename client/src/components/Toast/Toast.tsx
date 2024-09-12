import * as RadixToast from "@radix-ui/react-toast";
import { Strong } from "@radix-ui/themes";
import React from "react";

export type ToastProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
};

export const Toast = ({ open, onClose, title, description }: ToastProps) => {
  return (
    <RadixToast.Root className="ToastRoot" open={open} onOpenChange={onClose}>
      <RadixToast.Title className="ToastTitle">
        <Strong>{title}</Strong>
      </RadixToast.Title>
      <RadixToast.Description className="ToastDescription">
        {description}
      </RadixToast.Description>
    </RadixToast.Root>
  );
};
