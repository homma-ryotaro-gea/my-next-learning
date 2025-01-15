import type { ActivityTableType } from "@/app/display-setting/page";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Header, flexRender } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { CSSProperties } from "react";
import { TableHead } from "../ui/table";

const DraggableTableHeader = ({
  header,
}: {
  header: Header<ActivityTableType, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableHead colSpan={header.colSpan} ref={setNodeRef} style={style}>
      <div className="flex items-center justify-center">
        {{
          asc: <ArrowUp size={16} />,
          desc: <ArrowDown size={16} />,
        }[header.column.getIsSorted() as string] ?? null}
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </TableHead>
  );
};

export default DraggableTableHeader;
