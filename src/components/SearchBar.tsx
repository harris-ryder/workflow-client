import { useState, ChangeEvent } from 'react'
import Button from './basic-ui/Button'
import useAppStore from '../store/AppStore'
import { toast } from 'react-hot-toast'

export default function SearchBar() {
  const newSearch = useAppStore((state) => state.newSearch)

  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  };

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      await newSearch(searchQuery);
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
      toast.success('Successfully Loaded!')
    }
  }

  return (
    <div className='w-full rounded-md flex gap-2 bg-sky-100 p-2'>
      <input
        className='border border-sky-300 p-2 h-12 cursor-text rounded outline-none no-focus-outline flex-1 transition-all'
        type="text"
        placeholder='Search for Designs!'
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleSearch}
        isLoading={isLoading}
        size='lg'
        variant='ghost'
      >
        Explore
      </Button>
    </div>
  );
}
