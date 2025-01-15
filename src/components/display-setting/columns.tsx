import type { ActivityTableType } from "@/app/display-setting/page";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

export const columns: ColumnDef<ActivityTableType>[] = [
  {
    accessorKey: "id",
    header: "顧問先No.",
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    enableHiding: false, // 非表示にできないように
  },
  {
    accessorKey: "companyName",
    header: "顧問先会社名",
    cell: ({ row }) => <div>{row.getValue("companyName")}</div>,
    enableHiding: false, // 非表示にできないように
  },
  {
    accessorKey: "solutionDiagnosis",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          ソリューション診断
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("solutionDiagnosis")}</div>
    ),
    sortUndefined: "last",
  },
  {
    accessorKey: "ai",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          AIカベウチ診断
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("ai")}</div>,
  },
  {
    accessorKey: "messageUser",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          メッセージユーザー
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("messageUser")}</div>
    ),
  },
  {
    accessorKey: "myOffer",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          マイオファー
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("myOffer")}</div>
    ),
  },
  {
    accessorKey: "limitedOffer",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          顧問先限定オファー
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("limitedOffer")}</div>
    ),
  },
  {
    accessorKey: "matching",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          マッチング成立
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("matching")}</div>
    ),
  },
  {
    accessorKey: "rejection",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          お断り
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("rejection")}</div>
    ),
  },
  {
    accessorKey: "managerName",
    header: "所内メイン担当者名",
    cell: ({ row }) => <div>{row.getValue("managerName")}</div>,
    enableHiding: false, // 非表示にできないように
  },
];
