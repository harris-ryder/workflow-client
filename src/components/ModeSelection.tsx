import Button from './basic-ui/Button'
import useAppStore from '../store/AppStore'

function ModeSelection() {

  const selectedMode = useAppStore((state) => state.selectedMode)
  const updateSelectedMode = useAppStore((state) => state.updateSelectedMode)

  return (
    <div className='relative z-30 flex gap-4 items-center justify-between p-2 bg-sky-100 rounded-md'>
      <Button
        onClick={() => updateSelectedMode("viewLikes")}
        className={`flex-1 ${selectedMode === "viewLikes" ? 'bg-sky-300' : ''}`}
      >
        Likes
      </Button>
      <Button
        onClick={() => updateSelectedMode("default")}
        className={`flex-1 ${selectedMode === "default" ? 'bg-sky-300' : ''}`}
      >
        Swipe
      </Button>
      <Button
        onClick={() => updateSelectedMode("viewDislikes")}
        className={`flex-1 ${selectedMode === "viewDislikes" ? 'bg-sky-300' : ''}`}
      >
        Dislikes
      </Button>
    </div>
  )
}

export default ModeSelection
