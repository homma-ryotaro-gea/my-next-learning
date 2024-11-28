import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DialogPage = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] max-h-[95%]  overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
          <div className="border p-4 w-full">テスト</div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPage;
