import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApproveResource from "@/app/(home)/start/approvals/page";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SheetDemo({ filteredResources }: { filteredResources: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='rounded-full relative'>
          <BellRing className='size-4' />
          <div className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3 bg-amber-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center'>
            {filteredResources?.length}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ApproveResource />
      </SheetContent>
    </Sheet>
  );
}
