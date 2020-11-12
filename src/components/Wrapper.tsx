import React from 'react'

type WrapperProps = {
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
}

export default Wrapper