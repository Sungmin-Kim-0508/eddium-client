import React from 'react'
import Nav from "./nav"

type LayoutProps = {
  bgColor?: 'bg-mediumPrimary'
}

const Layout: React.FC<LayoutProps> = ({ children, bgColor }) => {
  return (
    <>
      <Nav />
      <div className={`md:px-10 lg:px-40 py-5 h-screen ${bgColor}`}>
        {children}
      </div>
    </>
  )
}

export default Layout