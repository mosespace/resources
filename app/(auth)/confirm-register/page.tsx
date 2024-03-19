import ConfirmRegister from "@/components/confirm-register";
import React from "react";

export default function page() {
  return (
    <div className='flex mx-auto min-h-screen flex-col justify-center items-center space-y-4'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
        Ready to Verify your email?
      </h4>

      <p className='leading-7 [&:not(:first-child)]:mt-6  max-w-sm text-center'>
        Enter the 6-digit verification code sent to your email to complete the
        sign-up.
      </p>

      <ConfirmRegister />
    </div>
  );
}
