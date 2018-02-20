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

// CLICK LISTENER
const userClick = () => {
  console.log('click');
}
