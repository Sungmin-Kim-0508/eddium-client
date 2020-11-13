import { useState } from 'react'

export const useOpenNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openNav = () => {
    setIsOpen(!isOpen)
  }

  return {isOpen, openNav}
}