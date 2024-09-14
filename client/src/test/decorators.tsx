import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "../components/Toast/ToastProvider";
import { Theme, ThemeProps } from "@radix-ui/themes";

export const withQueryClient =
  (
    queryClient = new QueryClient()
  ): React.ComponentType<React.PropsWithChildren> =>
  ({ children }) =>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

export const withThemeProvider =
  (props: ThemeProps = {}): React.ComponentType<React.PropsWithChildren> =>
  ({ children }) =>
    <Theme {...props}>{children}</Theme>;

export const withToastProvider =
  (): React.ComponentType<React.PropsWithChildren> =>
  ({ children }) =>
    <ToastProvider>{children}</ToastProvider>;

export const withProviders = () =>
  composeDecorators(
    withQueryClient(),
    withThemeProvider(),
    withToastProvider()
  );

export const composeDecorators = (
  ...components: React.ComponentType<React.PropsWithChildren>[]
) =>
  components.reduce((Acc, Cmp) => (props) => (
    <Acc>
      <Cmp {...props} />
    </Acc>
  ));
