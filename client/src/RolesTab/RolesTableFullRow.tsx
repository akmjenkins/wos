import { Table } from "@radix-ui/themes";
import React from "react";

type RolesTableFullRowProps = {
  children: React.ReactNode;
};

export const RolesTableFullRow = ({ children }: RolesTableFullRowProps) => (
  <Table.Row>
    <Table.Cell colSpan={3}>{children}</Table.Cell>
  </Table.Row>
);
