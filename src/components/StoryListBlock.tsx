import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import { Down } from '../icons/icons';
import DropdownTransition, { Anchor } from './DropdownTransition';

type StoryListBlockProps = {
  data: any
  onAskDelete?: (id: string) => void
}

function StoryListBlock({ data, onAskDelete } : StoryListBlockProps) : React.ReactElement {
  const router = useRouter()
  const isDraftsPage = router?.pathname === '/stories/drafts';


  return (
    data.map((story : any) => (
      <div key={story.id} className='py-4 border-b-2'>
        {isDraftsPage ? (
          <>
            <p className="font-bold text-mediumBlack block">{story.title}</p>
            <p className="text-mediumGray">{story.content}</p>
          </>
        ) : (
          <>
            <Link href={`/stories/${story.id}`}>
              <a className="font-bold text-mediumBlack block">{story.title}</a>
            </Link>
            <Link href={`/stories/${story.id}`}>
              <a className="text-mediumGray block">{story.content}</a>
            </Link>
          </>
        )}
        <div className='flex'>
          <span className='mr-3 text-mediumGray text-xs'>Created At {dayjs(parseInt(story.createdAt)).fromNow()}</span>
          <div className="relative">
            <DropdownTransition BtnFigure={() => <Down />}>
              <Anchor href='/stories/edit/[id]' as={`/stories/edit/${story.id}`}>
                Edit Story
              </Anchor>
              <button className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => onAskDelete!(story.id)}>
                Delete Story
              </button>
            </DropdownTransition>
          </div>
        </div>
      </div>
    ))
  );
}

export default StoryListBlock