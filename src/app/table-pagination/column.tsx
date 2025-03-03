import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import type { Person } from "./makeData";

export const columns = React.useMemo<ColumnDef<Person>[]>(
  () => [
    {
      accessorKey: "firstName",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.lastName,
      id: "lastName",
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "age",
      header: () => "Age",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "visits",
      header: () => <span>Visits</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "status",
      header: "Status",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "progress",
      header: "Profile Progress",
      footer: (props) => props.column.id,
    },
  ],
  []
);
