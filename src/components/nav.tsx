import React from "react"
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { toastNotification } from "../utils/toasters"
import { useRouter } from 'next/router'
import { Bell, Bookmarked, Magnifier, ToggleNavForMobile } from "../icons/icons"
import DropdownTransition, { Anchor } from "../components/DropdownTransition"

const IconButton: React.FC = ({ children }) => (
  <button className="p-1 mr-2 border-2 border-transparent rounded-full focus:bg-gray-300 transition duration-150 ease-in-out">
    {children}
  </button>
)


const MenuButton: React.FC<{ isLoading: boolean, onClick?: React.MouseEventHandler<HTMLAnchorElement> }> = ({ children, isLoading = true, onClick }) => (
  <>
    {isLoading && (
      <a onClick={onClick} className="inline-flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-accent-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing
      </a>
    )}
    {!isLoading && (
      <a onClick={onClick} className="block px-4 py-2 cursor-pointer text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
        {children}
      </a>
    )}
  </>
)

const ButtonFigure = () => (
  <img className="h-10 w-10 rounded-full" src="https://miro.medium.com/fit/c/40/40/1*dmbNkD5D-u45r44go_cf0g.png" alt="" />
)

export default function Nav() {
  const apolloClient = useApolloClient();

  const [logout, { loading: logoutLoading }] = useLogoutMutation()
  const { data, error, loading: meLoading } = useMeQuery()

  const router = useRouter()
  
  if (meLoading === false && error) {
    toastNotification.error(error?.message)
  }

  return (
    <nav className="bg-white">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
              <ToggleNavForMobile />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              {/* <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="eddium logo mobile" /> */}
              <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg" alt="eddium logo" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <IconButton>
              <Magnifier />
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
                  <Bookmarked />
                </IconButton>
                <IconButton>
                  <Bell />
                </IconButton>
                <div className="ml-3 relative">
                  <DropdownTransition
                    btnClassName="flex text-sm border-2 rounded-lg border-transparent focus:outline-none focus:border-gray-700 transition duration-150 ease-in-out"
                    BtnFigure={() => <ButtonFigure />}
                  >
                    <Anchor href="/create-story">New Story</Anchor>
                    <Anchor href="/stories/drafts">Stories</Anchor>
                    <Anchor href="/">Settings</Anchor>
                    <MenuButton
                      isLoading={logoutLoading}
                      onClick={async () => {
                      await logout()
                      await apolloClient.resetStore()
                      router.replace('/')
                    }}>Log out</MenuButton>
                  </DropdownTransition>
                </div>
              </>
            )}
            </div>
            
        </div>
      </div>
    </nav>
  )
}
