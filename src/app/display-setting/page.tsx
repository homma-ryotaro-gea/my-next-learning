"use client";
import DragAlongCell from "@/components/display-setting/DragAlongCell";
import DraggableTableHeader from "@/components/display-setting/DraggableTableHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckCheckIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import { columns } from "../../components/display-setting/columns";

export type ActivityTableType = {
  id: string;
  companyName: string;
  solutionDiagnosis: string;
  ai: string;
  messageUser: string;
  myOffer: string;
  limitedOffer: string;
  matching: string;
  rejection: string;
  managerName: string;
};

const activityData: ActivityTableType[] = [
  {
    id: "1",
    companyName: "株式会社A",
    solutionDiagnosis: "10",
    ai: "12",
    messageUser: "5",
    myOffer: "3",
    limitedOffer: "2",
    matching: "1",
    rejection: "0",
    managerName: "山田太郎",
  },
  {
    id: "2",
    companyName: "株式会社B",
    solutionDiagnosis: "1",
    ai: "14",
    messageUser: "6",
    myOffer: "2",
    limitedOffer: "2",
    matching: "4",
    rejection: "1",
    managerName: "山田太郎",
  },
];

const items = [
  {
    id: "solutionDiagnosis",
    label: "ソリューション診断",
    name: "ソリューション",
    count: 10,
    icon: <CheckCheckIcon className="text-[#A8A8A8]" />,
  },
  {
    id: "ai",
    label: "AIカベウチ診断",
    name: "AIカベウチ",
    count: 12,
    icon: <CheckCheckIcon className="text-[#A8A8A8]" />,
  },
  {
    id: "messageUser",
    label: "メッセージユーザー",
    name: "メッセージ",
    count: 5,
    icon: <CheckCheckIcon className="text-[#A8A8A8]" />,
  },
  {
    id: "myOffer",
    label: "マイオファー",
    name: "マイオファー",
    count: 3,
    icon: <CheckCheckIcon className="text-[#A8A8A8]" />,
  },
  {
    id: "limitedOffer",
    label: "顧問先限定オファー",
    name: "顧問先オファー",
    count: 2,
    icon: <CheckCheckIcon className="text-[#A8A8A8]" />,
  },
  {
    id: "matching",
    label: "マッチング成立",
    name: "マッチング",
    count: 1,
    icon: <CheckCheckIcon className="text-[#A8A8A8]" />,
  },
  {
    id: "rejection",
    label: "お断り",
    name: "お断り",
    count: 0,
    icon: <CheckCheckIcon className="text-[#A8A8A8]" />,
  },
];
const DisplaySettingPage = () => {
  // チェック状態管理
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    solutionDiagnosis: true,
    ai: true,
    messageUser: true,
    myOffer: true,
    limitedOffer: true,
    matching: true,
    rejection: true,
  });
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => {
      if (c.id) {
        return c.id;
      }
      return "";
    })
  );

  const table = useReactTable<ActivityTableType>({
    data: activityData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnOrder,
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="w-full">
        <div className="flex gap-4 mb-4">
          <div className="flex gap-2">
            {/* columnVisivilityオブジェクトのvalueがtrueのみ表示 */}
            {items
              .filter((item) => columnVisibility[item.id])
              .map((item) => (
                <div
                  key={item.id}
                  className="w-[120px] bg-white border hover:bg-[#F8F8F8] transition-colors hover:cursor-pointer p-2 rounded-md flex items-start flex-col gap-1"
                >
                  {item.icon}
                  <p className="text-xs text-[#A8A8A8]">{item.name}</p>
                  <p className="text-[20px] font-medium text-[#495057]">
                    {item.count}
                    <span className="text-xs pl-1 font-thin">件</span>
                  </p>
                </div>
              ))}
          </div>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger className="flex flex-col gap-2 text-[#A8A8A8] items-center px-2 pt-4">
                <p>表示項目を増やす</p>
                <PlusCircle />
              </PopoverTrigger>
              <PopoverContent side="right" sideOffset={10}>
                <div className="space-y-2">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <div
                          key={column.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={column.id}
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          />
                          <label
                            htmlFor={column.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {items.find((item) => item.id === column.id)?.label}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <DraggableTableHeader key={header.id} header={header} />
                      );
                    })}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        <DragAlongCell key={cell.id} cell={cell} />
                      </SortableContext>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default DisplaySettingPage;
