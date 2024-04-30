import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

export default function CreateButton({ user }: any) {
  const userId = user?.id;

  function handleCreate() {
    if (userId) {
      redirect("/start");
    } else {
      redirect("/login");
      return null;
    }
  }
  return (
    <Button onClick={() => handleCreate()}>
      <Plus className='mr-2 h-4 w-4 stroke' /> Add Resource
    </Button>
  );
}
