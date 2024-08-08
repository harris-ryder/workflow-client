import Gallery from "../components/Gallery";
import ModeSelection from "../components/ModeSelection";
import ResultViewer from "../components/ResultViewer"
import SearchBar from "../components/SearchBar"
import useAppStore from "../store/AppStore";
import { Toaster } from "react-hot-toast";

function App() {

  const searchResult = useAppStore((state) => state.searchResult);
  const selectedMode = useAppStore((state) => state.selectedMode)

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-8 p-8  w-[90vw] sm:w-[50vw] h-[100vh] justify-around transition-all	">
        <SearchBar />
        {searchResult && selectedMode === 'default' && <ResultViewer />}
        {searchResult && selectedMode && selectedMode !== 'default' && <Gallery />}
        {searchResult && <ModeSelection />}
      </div>
    </>
  )
}

export default App
