import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex h-[100dvh] w-full flex-col items-center justify-center bg-gray-950 px-4 text-center'>
      <div className='relative mx-auto max-w-md'>
        <div className='absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 blur-3xl opacity-50' />
        <div className='absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 blur-3xl opacity-50' />
        <div className='relative z-10 grid gap-4'>
          <h1 className='text-9xl font-bold tracking-tighter text-gray-50'>
            404
          </h1>
          <p className='text-lg font-medium text-gray-400'>
            Oops, the page you're looking for doesn't exist.
          </p>
          <Link
            className='inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-4 text-sm font-medium text-gray-950 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-950'
            href='/'
          >
            Browse back to resources
          </Link>
        </div>
      </div>
    </div>
  );
}
