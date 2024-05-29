"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Monitor, MoonStar, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className='flex space-x-1'>
      <Button
        onClick={() => setTheme("dark")}
        variant='outline'
        className={`rounded-full  `}
        size='icon'
      >
        <MoonStar className='size-4' />
      </Button>
      <Button
        onClick={() => setTheme("light")}
        variant='outline'
        className={`rounded-full  `}
        size='icon'
      >
        <Sun className='size-4' />
      </Button>
      <Button
        onClick={() => setTheme("system")}
        variant='outline'
        className={`rounded-full  `}
        size='icon'
      >
        <Monitor className='size-4' />
      </Button>
    </div>
  );
}
