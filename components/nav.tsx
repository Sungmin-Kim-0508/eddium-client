import React, { useState } from "react"
import Link from 'next/link'
import { Transition } from "@headlessui/react"
import { ApolloClient, useApolloClient } from '@apollo/client'
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { toastNotification } from "../utils/toasters"

const IconButton: React.FC = ({ children }) => (
  <button className="p-1 mr-2 border-2 border-transparent rounded-full focus:bg-gray-300 transition duration-150 ease-in-out">
    {children}
  </button>
)

const Anchor: React.FC<{ href: string }> = ({ children, href }) => (
  <Link href={href}>
    <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
      {children}
    </a>
  </Link>
)

const MenuButton: React.FC<{ isLoading: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement> }> = ({ children, isLoading = true, onClick }) => (
  <>
    {isLoading && (
      <button type="button" onClick={onClick} className="inline-flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-accent-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing
      </button>
    )}
    {!isLoading && (
      <button onClick={onClick} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
        {children}
      </button>
    )}
  </>
)

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const openDropdown = () => {
    setIsOpen(!isOpen)
  }

  const apolloClient = useApolloClient();

  const [logout, { loading: logoutLoading }] = useLogoutMutation()
  const { data, error, loading: meLoading } = useMeQuery()
  
  if (meLoading === false && error) {
    toastNotification.error(error?.message)
  }

  return (
    <nav className="bg-white">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="eddium logo" />
              <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg" alt="eddium logo" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <IconButton>
              <svg width="25" height="25" viewBox="0 0 25 25">
                <path d="M20.07 18.93l-4.16-4.15a6 6 0 1 0-.88.88l4.15 4.16a.62.62 0 1 0 .89-.89zM6.5 11a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0z"></path>
              </svg>
            </IconButton>
            {data?.me === null && (
              <Link href="/register">
                <a className="block px-4 py-2 bg-gray-800 text-white text-sm rounded">
                  Get Started
                </a>
              </Link>
            )}
            {data?.me && (
              <>
                <IconButton>
                  <svg width="25" height="25" viewBox="0 0 25 25">
                    <path d="M16 6a2 2 0 0 1 2 2v13.66h-.01a.5.5 0 0 1-.12.29.5.5 0 0 1-.7.03l-5.67-4.13-5.66 4.13a.5.5 0 0 1-.7-.03.48.48 0 0 1-.13-.29H5V8c0-1.1.9-2 2-2h9zM6 8v12.64l5.16-3.67a.49.49 0 0 1 .68 0L17 20.64V8a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M21 5v13.66h-.01a.5.5 0 0 1-.12.29.5.5 0 0 1-.7.03l-.17-.12V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1H8c0-1.1.9-2 2-2h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </IconButton>
                <IconButton>
                  <svg width="25" height="25" viewBox="-293 409 25 25"><path d="M-273.33 423.67l-1.67-1.52v-3.65a5.5 5.5 0 0 0-6.04-5.47 5.66 5.66 0 0 0-4.96 5.71v3.41l-1.68 1.55a1 1 0 0 0-.32.74V427a1 1 0 0 0 1 1h3.49a3.08 3.08 0 0 0 3.01 2.45 3.08 3.08 0 0 0 3.01-2.45h3.49a1 1 0 0 0 1-1v-2.59a1 1 0 0 0-.33-.74zm-7.17 5.63c-.84 0-1.55-.55-1.81-1.3h3.62a1.92 1.92 0 0 1-1.81 1.3zm6.35-2.45h-12.7v-2.35l1.63-1.5c.24-.22.37-.53.37-.85v-3.41a4.51 4.51 0 0 1 3.92-4.57 4.35 4.35 0 0 1 4.78 4.33v3.65c0 .32.14.63.38.85l1.62 1.48v2.37z"></path></svg>
                </IconButton>
                <div className="ml-3 relative">
                  <div>
                    <button onClick={openDropdown} className="flex text-sm border-2 rounded-lg border-transparent focus:outline-none focus:border-gray-700 transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true">
                      <img className="h-10 w-10 rounded-full" src="https://miro.medium.com/fit/c/40/40/1*dmbNkD5D-u45r44go_cf0g.png" alt="" />
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
                      <div ref={ref} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                        <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                          <Anchor href="/">New Story</Anchor>
                          <Anchor href="/register">Stories</Anchor>
                          <Anchor href="/register">Settings</Anchor>
                          <MenuButton
                            isLoading={logoutLoading}
                            onClick={async () => {
                            await logout()
                            await apolloClient.resetStore()
                          }}>Log out</MenuButton>
                        </div>
                    </div>
                    )}
                  </Transition>
                </div>
              </>
            )}
            </div>
            
        </div>
      </div>
    </nav>
  )
}
