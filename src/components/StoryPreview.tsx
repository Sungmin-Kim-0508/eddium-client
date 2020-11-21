import React, { useEffect } from 'react'
import styled from 'styled-components'
import useStoryPreview from '../hooks/useStoryPreview'
import { ImageForNoImage } from '../icons/icons'
import { toastNotification } from '../utils/toasters'
import { PublishBtn } from './Buttons'
import useRequests from '../hooks/useRequests'

const OpaqueLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
`

const PopupBaseBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #F8F9FA;
  align-items: center;
  overflow: scroll;
`

const PopupWrapper = styled.form`
  width: 54rem;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const ThumbnailImageBlock = styled.div<{ hasImg: boolean }>`
  min-width: 55%;
  min-height: 20rem;
  background-color: ${props => (props.hasImg ? 'inherit' : 'rgb(233, 236, 239)')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
`

const PreviewContentBlock = styled.div`
  width: 55%;
`

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`


type StoryPreviewProps = {
  visible: boolean;
  title: string;
  content: string;
  imgUrl?: string;
  onTogglePreviewMode: () => any;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({ visible, title, content, imgUrl, onTogglePreviewMode }) => {
  useEffect(() => {
    document.body.style.overflowY = visible ? 'hidden' : 'initial';
  }, [visible])

  const { handleUploadFile, createThumbnailResponse } = useStoryPreview()
  const { loading, error, data } = createThumbnailResponse

  const { handleCreateStory } = useRequests()

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleCreateStory(title, content, true, data?.createThumnail.url)
  }

  const hasImg = !!data || !!imgUrl

  if (!visible) return null;

  if (!loading && error) {
    toastNotification.error('Failed to upload file')
  }

  let imageBody = null

  if (imgUrl) {
    imageBody = (
      <ImageWrapper>
        <label className="text-gray-600 underline mb-2 cursor-pointer">
          <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleUploadFile} />
          Reupload
        </label>
        <Thumbnail src={imgUrl} />
      </ImageWrapper>
    )
  }
  
  if (loading) {
    imageBody = (
      <>
        <ImageForNoImage />
        <span className="inline-flex rounded-md shadow-sm cursor-not-allowed">
          <span className="mt-3 bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded">
            Processing...
          </span>
        </span>
      </>
    )
  }
  
  if (data) {
    imageBody = (
      <ImageWrapper>
        <label className="text-gray-600 underline mb-2 cursor-pointer">
          <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleUploadFile} />
          Reupload
        </label>
        <Thumbnail src={data.createThumnail.url} />
      </ImageWrapper>
    )
  }
  if (!loading && !data && !imgUrl) {
    imageBody = (
      <>
        <ImageForNoImage />
        <label className="mt-3 bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded block cursor-pointer">
          <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleUploadFile} /> Upload Thumbnail
        </label>
      </>
    )
  }

  return (
    <>
      <OpaqueLayer />
      <PopupBaseBlock>
        <PopupWrapper onSubmit={handlePublish}>
          <div>
            <h1 className="text-4xl">Story Preview</h1>
          </div>
          <ThumbnailImageBlock hasImg={!!hasImg}>
            {imageBody}
          </ThumbnailImageBlock>
          <PreviewContentBlock>
            <div className="border-b border-gray-500 p-2 mb-4">
              <h3>{title}</h3>
            </div>
            <div>
              <textarea className="p-2 w-full" readOnly defaultValue={content.substring(0, 150)} />
            </div>
          </PreviewContentBlock>
          <ButtonsBlock>
            <button className="mr-6" onClick={onTogglePreviewMode}>Cancel</button>
            <PublishBtn type="submit">Publish</PublishBtn>
          </ButtonsBlock>
        </PopupWrapper>
      </PopupBaseBlock>
    </>
  );
}

export default StoryPreview