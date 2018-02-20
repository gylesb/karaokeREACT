// CHORUS INFO
const songLyricsArray = "So don't call me baby, Unless you mean it, Don't tell me you need me,  If you don't believe it, So let me know the truth, Before I dive right into you".split(', ')

// INITIAL REDUX STATE
const initalState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

//REDUCER GOES HERE
const reducer = (state = initalState, action) => {
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      let newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition,
      }
      return newState;
    default:
      return state;
  }
}


// JEST TESTS AND SETUP GOES HERE
const { expect } = window;

expect(reducer(initialState, { type: null })).toEqual(initialState);

expect(reducer(initialState, { type: 'NEXT_LYRIC' })).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1
});


//REDUX STORE
const { createStore } = Redux;
const store = createStore =(reducer);
console.log(store.getState());

//RENDERING STATE IN DOM
const renderLyrics = () => {
  //Defines a lyricsDisplay constant that refers to the div with a 'lyrics' ID
  const lyricsDisplay = document.getElementById('lyrics');
  //If there are lyrics in the div, remove them all one by one until it's empty
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  //Locates song lyrics at the current arrayPosition
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  //Creates DOM text node containing the song lyric identified in the line above
  const renderedLine = document.createTextNode(currentLine);
  //Adds text node create in line above to 'lyrics' div in DOM
  document.getElementById('lyrics').appendChild(renderedLine);
}

//runs renderLyrics method
//HTML5 version of $(document).ready()
window.onLoad = function() {
  renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  store.dispatch({ type: 'NEXT_LYRIC'} );
  console.log(store.getState());
}
