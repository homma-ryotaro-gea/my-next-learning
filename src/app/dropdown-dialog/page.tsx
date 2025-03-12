"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const DropdownWithDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const openDialog = (title: string, description: string) => {
    // まずドロップダウンを閉じるためにsetTimeoutを使う
    setDropDownOpen(false);
    setTimeout(() => {
      setDialogContent({ title, description });
      setIsDialogOpen(true);
    }, 200);
  };

  // ダイアログを閉じる関数
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" onClick={() => setDropDownOpen(true)}>
            メニューを開く
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={(event) => {
              // デフォルトの動作を防止
              event.preventDefault();
              openDialog("オプション1", "これはオプション1の詳細です。");
            }}
          >
            オプション1
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              openDialog("オプション2", "これはオプション2の詳細です。");
            }}
          >
            オプション2
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              openDialog("オプション3", "これはオプション3の詳細です。");
            }}
          >
            オプション3
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeDialog} autoFocus>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DropdownWithDialog;
