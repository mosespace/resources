"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import { deleteResource } from "@/actions/resources";
import { getCurrentUser } from "@/lib/authProvider";
import { useState } from "react";

export function DeleteBtn({ resourceId }: { resourceId?: string }) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>
          <Trash2 className='w-4 h-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your the
            request and remove it's data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='flex gap-2 items-center'
            onClick={async (event: any) => {
              setLoading(true);
              event.preventDefault();
              const user = await getCurrentUser();
              const userId = (user as { id: string }).id;
              try {
                const deleted = await deleteResource(resourceId, userId);
                if (deleted) {
                  setLoading(false);
                  toast({
                    title: "The Request has been deleted successfully",
                  });
                  location.reload();
                }
              } catch (error: any) {
                setLoading(false);
                toast({
                  title: "Error You are not authorized to delete this request",
                });
              }
            }}
          >
            {loading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
