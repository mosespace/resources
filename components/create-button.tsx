"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function CreateButton({ user }: any) {
  const userId = user?.id;
  const router = useRouter();

  function handleCreate() {
    if (userId) {
      router.push("/start");
    } else {
      router.push("/login");
      return null;
    }
  }
  return (
    <Button onClick={() => handleCreate()}>
      <Plus className='mr-2 h-4 w-4 stroke' /> Add Resource
    </Button>
  );
}
