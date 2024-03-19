"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ConfirmRegister() {
  const [value, setValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const onComplete = (): void => {
    setIsValid(value === "123456");
  };

  return (
    <div className='flex flex-col space-y-8'>
      <InputOTP
        value={value}
        maxLength={6}
        onChange={(value) => {
          setValue(value);
        }}
        onComplete={onComplete}
        render={({ slots }: any) => (
          <>
            <InputOTPGroup className='gap-2'>
              {slots.map((slot: any, index: any) => (
                <React.Fragment key={index}>
                  <InputOTPSlot className='rounded-md border' {...slot} />
                  {index !== slots.length - 1 && <InputOTPSeparator />}
                </React.Fragment>
              ))}
            </InputOTPGroup>
            {isValid && <span>🎉</span>}
          </>
        )}
      />
      <Button variant='secondary' className='bg-amber-500'>
        Confirm
      </Button>
    </div>
  );
}
