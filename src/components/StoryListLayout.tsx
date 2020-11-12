import React from 'react'
import Link from 'next/link'

type StoryLayoutProps = {

}

const StoryLayout: React.FC<StoryLayoutProps> = ({ children }) => {
  return (
    <>
      <h2 className="mb-6 text-4xl font-semibold">Your Stories</h2>
      <ul className="border-b-2">
        <Link href="/stories/drafts">
          <a className="mr-4">Drafts</a>
        </Link>
        <Link href="/stories/published">
          <a>Published</a>
        </Link>
      </ul>
      <div>
        {children}
      </div>
    </>
  );
}

export default StoryLayout