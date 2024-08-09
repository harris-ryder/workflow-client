# Workflow client

## How to Run
Built using vite, react and typescript

1. Create a .env file include VITE_SERVER_API = {insert your server api}
2. Run the following commands
```js
npm install
npm run dev
```

## App Architecture
<img width="782" alt="image" src="https://github.com/user-attachments/assets/85b8e61d-9b49-4a45-b305-120eba48ab6b">

This is a single page application, app.tsx returns what is displayed such as the search bar (SearchBar.tsx), the images to swipe (ResultViewer.tsx) and gallery of likes/dislikes (Gallery.tsx). I used Zustand for state management, useAppStore.tsx holds global states (e.g. what mode are we in, has the fetch returned an array of images etc) that most components have access to. 

## Design Decisions
With a time limit it seemed easier to go for a minimalist approach. I opted for a simple vertical stack of components from top to bottom that is Searchbar -> Content -> ModeSelection:

- The Searchbar allows input and its button triggers the fetch in useAppStore.tsx
- The Content is the "activity area" you can swipe images or view liked/disliked images
- The ModeSelection has three buttons for each of the modes ("defaut" = search results & swipe, "seeLikes", "seeDislikes"). 

The brief mentioned swiping, so I tried to make the app friendly to narrow screens as well as large.

The images are all squarish (on a laptop) the images are sandwhiched between the Searchbar and ModeSelection and will try to grow to fill the space. My initial idea was to have the images be in their original aspect ratios and scaled to fit, I thought this would be useful as a designer could see the images in the correct aspect ratio as they were intended. However, I overcomplicated by making a custom image component to handle image resize along with other features and ended up wasting a lot of time. Finally, I just mapped through the first 10 images from the fetch and contained them in the same div dimensions. 

## If I had more time
- Design wise it's clean but boring. With more time, I would have played with color, components, and add more transitions. The layout is flexible but not optimal for large devices. 
- I wasted a lot of time exploring how to pre-load images etc (or loading them in batches), as every swipe causes a state change and hence a re-render meaning all the images in the stack have to be reloaded. But it seems this isn't the case somehow react can reconcilliate or I have fast internet. With more time id like to get to the bottom of that.
- The fetch provides 100 images urls, when those images run out another fetch should be called.
- Add data persistence
- Extra Credit: I was over the 4hr mark so I couldn't attempt this, I will include my approach to this below.

## Extra Credit
My initial thoughts are that there's a distinction between what the user says they want and what they actually want (or what google image search returns). To bridge this, I'd make a tool that takes the search query and the tags of the liked images (could also use dislikes to have a negative weight, Im not too sure) to create some tree like data structure. When the search query uses words it has before, the tool will inject some additional words to better describe what the user wants.

