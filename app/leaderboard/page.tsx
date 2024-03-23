import React from "react";

export default function page() {
  return (
    // <div className='p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto w-full shadow-none border rounded-md'>
    // <div className='flex space-x-3'>
    // <span className='flex relative justify-center items-center box-border overflow-hidden align-middle z-10 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-sky-700'>
    //   <img
    //     src='https://avatars.githubusercontent.com/u/94499610?v=4'
    //     className='flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100'
    //     alt='Anh Hoang'
    //     data-loaded='true'
    //   />
    // </span>

    //   <div className='inline-flex flex-col items-start'>
    //     <span className='text-small text-inherit'>Anh Hoang</span>
    //     <span className='text-tiny text-foreground-400'>Level 32</span>
    //   </div>
    // </div>
    // </div>
    <div className='w-full mx-auto'>
      <div className='flex flex-col justify-center items-center h-[100vh]'>
        <div className='relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-slate-950 dark:shadow-none'>
          <div className='flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none'>
            <h4 className='text-lg font-bold text-navy-700 dark:text-slate-950'>
              Top Creators
            </h4>
            <button className='linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-slate-950 dark:hover:bg-white/10 dark:active:bg-white/20'>
              See all
            </button>
          </div>
          <div className='w-full overflow-x-scroll px-4 md:overflow-x-hidden'>
            <table
              role='table'
              className='w-full min-w-[500px] overflow-x-scroll'
            >
              <thead>
                <tr role='row'>
                  <th colSpan={1} role='columnheader' title='Toggle SortBy'>
                    <div className='flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Name
                    </div>
                  </th>
                  <th colSpan={1} role='columnheader' title='Toggle SortBy'>
                    <div className='flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Artworks
                    </div>
                  </th>
                  <th colSpan={1} role='columnheader' title='Toggle SortBy'>
                    <div className='flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Rating
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody role='rowgroup' className='px-4'>
                <tr role='row'>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='flex items-center gap-2'>
                      <div className='h-[30px] w-[30px] rounded-full'>
                        <img
                          src='https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2244&amp;q=80'
                          className='h-full w-full rounded-full'
                          alt=''
                        />
                      </div>
                      <p className='text-sm font-medium text-navy-700 dark:text-slate-950'>
                        @maddison_c21
                      </p>
                    </div>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <p className='text-md font-medium text-gray-600 dark:text-slate-950'>
                      9821
                    </p>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='mx-2 flex font-bold'>
                      <div className='h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700'>
                        <div className='flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400 w-[30%]'></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr role='row'>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='flex items-center gap-2'>
                      <div className='h-[30px] w-[30px] rounded-full'>
                        <img
                          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1780&amp;q=80'
                          className='h-full w-full rounded-full'
                          alt=''
                        />
                      </div>
                      <p className='text-sm font-medium text-navy-700 dark:text-slate-950'>
                        @karl.will02
                      </p>
                    </div>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <p className='text-md font-medium text-gray-600 dark:text-slate-950'>
                      7032
                    </p>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='mx-2 flex font-bold'>
                      <div className='h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700'>
                        <div className='flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400 w-[30%]'></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr role='row'>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='flex items-center gap-2'>
                      <div className='h-[30px] w-[30px] rounded-full'>
                        <img
                          src='https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1315&amp;q=80'
                          className='h-full w-full rounded-full'
                          alt=''
                        />
                      </div>
                      <p className='text-sm font-medium text-navy-700 dark:text-slate-950'>
                        @andreea.1z
                      </p>
                    </div>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <p className='text-md font-medium text-gray-600 dark:text-slate-950'>
                      5204
                    </p>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='mx-2 flex font-bold'>
                      <div className='h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700'>
                        <div className='flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400 w-[30%]'></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr role='row'>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='flex items-center gap-2'>
                      <div className='h-[30px] w-[30px] rounded-full'>
                        <img
                          src='https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1780&amp;q=80'
                          className='h-full w-full rounded-full'
                          alt=''
                        />
                      </div>
                      <p className='text-sm font-medium text-navy-700 dark:text-slate-950'>
                        @abraham47.y
                      </p>
                    </div>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <p className='text-md font-medium text-gray-600 dark:text-slate-950'>
                      4309
                    </p>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='mx-2 flex font-bold'>
                      <div className='h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700'>
                        <div className='flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400 w-[30%]'></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr role='row'>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='flex items-center gap-2'>
                      <div className='h-[30px] w-[30px] rounded-full'>
                        <img
                          src='https://i.ibb.co/7p0d1Cd/Frame-24.png'
                          className='h-full w-full rounded-full'
                          alt=''
                        />
                      </div>
                      <p className='text-sm font-medium text-navy-700 dark:text-slate-950'>
                        @simmmple.web
                      </p>
                    </div>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <p className='text-md font-medium text-gray-600 dark:text-slate-950'>
                      3871
                    </p>
                  </td>
                  <td className='py-3 text-sm' role='cell'>
                    <div className='mx-2 flex font-bold'>
                      <div className='h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700'>
                        <div className='flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400 w-[30%]'></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className='font-normal text-navy-700 mt-20 mx-auto w-max'>
          Profile Card component from{" "}
          <a
            href='https://horizon-ui.com?ref=tailwindcomponents.com'
            target='_blank'
            className='text-brand-500 font-bold'
          >
            Horizon UI Tailwind React
          </a>
        </p>
      </div>
    </div>
  );
}
