import React from 'react'
import { Transition } from '@headlessui/react';
import Link from 'next/link'
import { useOpenNav } from '../utils/useOpenNav';

type DropdownTransitionProps = {
  btnClassName?: string
  BtnFigure: () => React.ReactElement
}

export const Anchor: React.FC<{ href: string }> = ({ children, href }) => (
  <Link href={href}>
    <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
      {children}
    </a>
  </Link>
)

const DropdownTransition: React.FC<DropdownTransitionProps> = ({ children, btnClassName = '', BtnFigure }) => {
  const {isOpen, openNav} = useOpenNav()

  return (
    <>
      <div>
        <button onClick={openNav} className={btnClassName}>
          <BtnFigure />
        </button>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="origin-top-right absolute mt-2 w-48 rounded-md shadow-lg z-10">
            <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              {children}
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}

export default DropdownTransition