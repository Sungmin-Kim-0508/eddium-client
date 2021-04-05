import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

type StoryLayoutProps = {
}

const MenuWrapper = styled.div<{ current: boolean }>`
  display: inline-block;
  padding: 0.5rem;
  border-bottom-width: 2px;
  border-color: ${props => props.current ? '#191919' : 'transparent'};
  color: ${props => props.current ? '#191919' : '#757575'};
  margin-right: 1rem;
`

const StoryLayout: React.FC<StoryLayoutProps> = ({ children }) => {
  const { route } = useRouter()
  return (
    <>
      <h2 className="mb-6 text-4xl font-semibold text-mediumBlack">Your Stories</h2>
      <ul className="border-b-2">
        <MenuWrapper current={route === '/stories/drafts'} className="inline-block p-2 border-b-2">
          <Link href="/stories/drafts">
            <a className="text-sm">Drafts</a>
          </Link>
        </MenuWrapper>
        <MenuWrapper current={route === '/stories/published'} className="inline-block p-2">
          <Link href="/stories/published">
            <a className="text-sm">Published</a>
          </Link>
        </MenuWrapper>
      </ul>
      <div className="text-sm">
        {children}
      </div>
    </>
  );
}

export default StoryLayout