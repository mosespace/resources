"use client";

// import { sendFeedback } from "@/actions/feedback";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Button } from "@/components/ui/button";
// import { SubmitButton } from "./submit-button";

export const SendFeedback = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='fixed bottom-6 right-6 z-10'>
          Send feedback
        </Button>
      </DrawerTrigger>
      <DrawerContent className='space-y-4 pb-4 lg:pb-9'>
        <DrawerHeader>
          <DrawerTitle className='text-center lg:text-3xl'>
            What feature would you like to see next?
          </DrawerTitle>
          <DrawerDescription className='text-center lg:text-xl'>
            Send it, and.. I’ll build it for you 🤩
          </DrawerDescription>
        </DrawerHeader>

        <form
          className='w-full flex flex-col gap-2 max-w-2xl mx-auto px-4'
          //   action={async (formdata) => {
          //     await sendFeedback(formdata);
          //     setIsOpen(false);
          //   }}
        >
          <Input placeholder='' name='message' required />
          <Button>send feedback</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
