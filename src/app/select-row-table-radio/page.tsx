"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type MouseEvent, useState } from "react";

const SelectRowTableRadioPage = () => {
  const [selectedRow, setSelectedRow] = useState("");

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
  ];

  const handleRowClick = (id: number) => {
    setSelectedRow((prevSelected) =>
      prevSelected === id.toString() ? "" : id.toString()
    );
  };

  const handleRadioClick = (
    e: MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    // イベントの伝播を防止
    e.stopPropagation();
    setSelectedRow((prevSelected) =>
      prevSelected === id.toString() ? "" : id.toString()
    );
  };
  return (
    <RadioGroup value={selectedRow} className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className={`
                cursor-pointer 
                ${
                  selectedRow === item.id.toString()
                    ? "bg-accent"
                    : "hover:bg-muted/50"
                }
              `}
            >
              <TableCell className="flex items-center">
                <RadioGroupItem
                  value={item.id.toString()}
                  id={`row-${item.id}`}
                  onClick={(e) => handleRadioClick(e, item.id)}
                />
              </TableCell>
              <TableCell>
                <Label htmlFor={`row-${item.id}`} className="cursor-pointer">
                  {item.name}
                </Label>
              </TableCell>
              <TableCell>
                <Label htmlFor={`row-${item.id}`} className="cursor-pointer">
                  {item.email}
                </Label>
              </TableCell>
              <TableCell>
                <Label htmlFor={`row-${item.id}`} className="cursor-pointer">
                  {item.role}
                </Label>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </RadioGroup>
  );
};

export default SelectRowTableRadioPage;
