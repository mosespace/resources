"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useState } from "react";
import { UserAccountNav } from "./dashboard/user-account-nav";

export default function LeadBoard({ users, sessionUser }: any) {
  const countApprovedResources = (user: any) => {
    return user.resources.filter((resource: any) => resource.isApproved).length;
  };

  // Sort users based on the count of approved resources
  const sortedUsers = users.sort(
    (a: any, b: any) => countApprovedResources(b) - countApprovedResources(a)
  );

  // State variable to hold the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = sortedUsers.filter((user: any) =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle input change
  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const resources: any = [];

  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
        <div className='flex max-h-screen flex-col gap-2'>
          <div className='flex h-[60px] items-center border-b px-6'>
            <Link className='flex items-center gap-2 font-semibold' href='#'>
              <Package2Icon className='h-6 w-6' />
              <span className=''>Resources Inc</span>
            </Link>
            <Button className='ml-auto h-8 w-8' size='icon' variant='outline'>
              <BellIcon className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>
          <div className='flex-1 overflow-auto py-2'></div>
          <div className='mt-auto p-4'>
            <Card>
              <CardHeader className='pb-4'>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full' size='sm'>
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
          <Link className='lg:hidden' href='#'>
            <Package2Icon className='h-6 w-6' />
            <span className='sr-only'>Home</span>
          </Link>
          <div className='w-full flex-1'>
            <form>
              <div className='relative'>
                <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
                <Input
                  className='w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950'
                  placeholder='Search users by name...'
                  type='search'
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          {/*  User Operations*/}
          {sessionUser && (
            <UserAccountNav
              user={{
                name: sessionUser?.name,
                image: sessionUser?.image,
                email: sessionUser?.email,
                role: sessionUser?.role,
              }}
              resources={resources}
            />
          )}
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
          <div className='flex items-center'>
            <h1 className='font-semibold text-lg md:text-2xl'>Leader Board</h1>
            <Button
              className='ml-auto cursor-none opacity-80'
              disabled
              size='sm'
            >
              kiskayemoses@gmail.com
            </Button>
          </div>
          <div className='border shadow-sm rounded-lg'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[45px] lg:w-[95px]'>Rank</TableHead>
                  <TableHead className='max-w-[150px]'>User Info</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers?.slice(0, 10).map((user: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>
                        RE-{(index + 1).toString().padStart(2, "O")}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center space-x-4'>
                          <div className='relative inline-flex shrink-0'>
                            <div
                              tabIndex={-1}
                              className='inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2'
                            >
                              <span
                                tabIndex={-1}
                                className='flex relative justify-center items-center box-border overflow-hidden align-middle z-10 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-sky-700'
                              >
                                {user.image ? (
                                  <img
                                    src={user?.image}
                                    className='flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100'
                                    alt={user.name}
                                    data-loaded='true'
                                  />
                                ) : (
                                  <img
                                    src='https://avatars.githubusercontent.com/u/100864803?v=4'
                                    className='flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100'
                                    alt='@mosespace'
                                    data-loaded='true'
                                  />
                                )}
                              </span>
                              <div className='inline-flex flex-col items-start'>
                                <span className='text-small text-inherit'>
                                  {user?.name}
                                </span>
                                {/* Display the "Level 16" span only for the first 5 last users */}
                                {index > 5 && (
                                  <span className='text-tiny text-foreground-400'>
                                    Level 16
                                  </span>
                                )}
                              </div>
                            </div>
                            <span
                              className='flex z-10 flex-wrap absolute box-border rounded-full whitespace-nowrap place-content-center origin-center items-center select-none font-regular scale-100 opacity-100 subpixel-antialiased data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0 text-small px-0 transition-transform-opacity !ease-soft-spring !duration-300 border-2 border-background text-default-foreground w-5 h-5 min-w-5 min-h-5 top-[5%] left-[5%] -translate-x-1/2 -translate-y-1/2 bg-sky-700'
                              data-invisible='false'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='lucide lucide-gem h-3 w-3 text-white'
                              >
                                <path d='M6 3h12l4 6-10 13L2 9Z'></path>
                                <path d='M11 3 8 9l4 13 4-13-3-6'></path>
                                <path d='M2 9h20'></path>
                              </svg>
                            </span>
                          </div>
                          {/* <div className='relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 rounded-full bg-sky-500/10 text-sky-800 text-xs font-bold'>
                            Display the "Pro" span only for the first 5 users
                            {index < 5 && (
                              <span className='flex-1 text-inherit font-normal px-1'>
                                Pro
                              </span>
                            )}
                          </div> */}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className='relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-small rounded-full bg-green-600/20 text-success-600 dark:text-success'>
                          <span className='flex-1 text-inherit font-normal px-1'>
                            {/* Each resource a user has is awarded 16 marks */}
                            {user.resources.length * 16}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className='text-center'>
                      No user(s) found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
      <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z' />
      <path d='m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9' />
      <path d='M12 3v6' />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
