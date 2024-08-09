import { create } from "zustand";

interface Image {
  url: string;
  [key: string]: any;
}

interface AppState {
  searchQuery: string;
  selectedMode: string;
  searchResult: Image[] | null;
  likedImgs: Image[];
  dislikedImgs: Image[];
}

interface AppActions {
  updateSelectedMode: (newMode: string) => void;
  newSearch: (newSearchQuery: string) => void;
  addToLikedImgs: (img: Image) => void;
  addToDislikedImgs: (img: Image) => void;
  popSearchResult: () => void;
}

const useAppStore = create<AppState & AppActions>((set, get) => ({
  searchQuery: "",
  selectedMode: "default",
  searchResult: null,
  likedImgs: [],
  dislikedImgs: [],
  updateSelectedMode: (newMode: string) => set({ selectedMode: newMode }),
  popSearchResult: () => {
    const currentResults = get().searchResult;
    if (currentResults && currentResults.length > 0) {
      const newResults = currentResults.slice(1);
      set(() => ({ searchResult: newResults }));
    }
  },
  addToLikedImgs: (img: Image) => {
    set((state) => ({
      likedImgs: [...state.likedImgs, img]
    }));
  },

  addToDislikedImgs: (img: Image) => {

    set((state) => ({
      dislikedImgs: [...state.dislikedImgs, img]
    }));
  },

  newSearch: async (newSearchQuery: string) => {
    set({ searchQuery: newSearchQuery });

    const apiUrl = import.meta.env.VITE_SERVER_API;
    try {
      const response = await fetch(`http://${apiUrl}?query=${encodeURIComponent(newSearchQuery)}`);
      const data = await response.json();
      set({ searchResult: data['images_results'] || [] });
    } catch (error) {
      set({ searchResult: [] });
    }
  },
}));

export default useAppStore;
