import { useCallback, useEffect, useState } from 'react'
import { useCreateThumnailMutation } from '../../generated/graphql'

const useStoryPreview = () => {
  const [previewMode, setPreviewMode] = useState(false)
  const [uploadImage, createThumbnailResponse] = useCreateThumnailMutation()
  let imgUrl = null
  const { loading, error, data } = createThumbnailResponse

  let imgFile = null;
  useEffect(() => {
    if (error) {
    } else {
    }
  }, [loading])

  const handleFile = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return;
    const [file] = files;
    await uploadImage({ variables: { image: file }})
    imgUrl = data?.createThumnail.url
    imgFile = file
  }, [previewMode, imgFile])


  const onTogglePreviewMode = useCallback(() => {
    setPreviewMode(!previewMode)
    imgUrl = null
    imgFile = null
  }, [previewMode])
  return {
    previewMode,
    onTogglePreviewMode,
    imgUrl,
    imgFile,
    handleFile,
    createThumbnailResponse
  }
}

export default useStoryPreview