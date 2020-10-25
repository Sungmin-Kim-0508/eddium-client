import React from 'react'

export const SubmitBtn: React.FC = ({ children }) => (
  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded min-w-full">
    {children}
  </button>
)

export const LoadingBtn: React.FC = ({ children }) => (
  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
    {children}
  </button>
)