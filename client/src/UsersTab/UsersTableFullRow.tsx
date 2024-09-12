import { Table } from "@radix-ui/themes";
import React from "react";

type UsersTableFullRowProps = {
  children: React.ReactNode;
};

export const UsersTableFullRow = ({ children }: UsersTableFullRowProps) => (
  <Table.Row>
    <Table.Cell colSpan={4}>{children}</Table.Cell>
  </Table.Row>
);
