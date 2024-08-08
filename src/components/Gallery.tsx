import useAppStore from '../store/AppStore';

function Gallery() {
  const selectedMode = useAppStore((state) => state.selectedMode);
  const likedImgs = useAppStore((state) => state.likedImgs);
  const dislikedImgs = useAppStore((state) => state.dislikedImgs);

  const images = selectedMode === "viewLikes" ? likedImgs : dislikedImgs;

  return (
    <div className='relative flex-1 flex items-center justify-center h-full overflow-hidden'>
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute right-0 left-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      <div className='h-[400px] max-h-50vh grid grid-cols-3 gap-4 h-full overflow-y-auto no-scrollbar'>
        {images.map((result, index) => (
          <div key={index}>
            <img
              src={result.original}
              className='rounded-md'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
