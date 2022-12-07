import React, { SetStateAction } from 'react';

const paginate = ({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <button
        className={`inline-flex items-center rounded-lg border border-gray-300 bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700 ${
          page === 0 && 'cursor-not-allowed'
        }`}
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Previous
      </button>

      <button
        className='ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700'
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default paginate;
