import React from 'react'

type PublishBtnProps = {
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

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

export const PublishBtn: React.FC<PublishBtnProps> = ({ children, type, onClick }) => {
  return (
    <button type={type} className="bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded block mr-3" onClick={onClick}>
      {children}
    </button>
  )
}

const Button: React.FC<{ color: 'red' | 'gray', onClick?: () => any }> = ({ children, color, onClick }) => (
  <button className={`bg-${color}-600 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded`} onClick={onClick}>
    {children}
  </button>
)
export default Button