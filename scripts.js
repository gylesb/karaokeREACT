// CHORUS INFO
const songList = {
  1: "So don't call me baby, Unless you mean it, Don't tell me you need me,  If you don't believe it, So let me know the truth, Before I dive right into you".split(', '),

  2: "I'm boyfriend number 2, Cause the first one don't really seem like he know what to do, Boyfriend number 2, And I know you like it freaky so I'm gonna give it to you, I'm boyfriend number 2, Baby don't fuss, Don't fight, Don't argue, Cause 2nd place has always got a whole lot to prove, So whenever you get in the mood, I'm boyfriend number 2".split(', '),

  3: "Sometimes in life, You run across a love unknown, Without a reason, It seems like you don't belong, Hold on dear life, Don't go off running from what's new, I became somebody, Through loving you".split(', '),

  4: "One: You're like a dream come true, Two: Just wanna be with you, Three: Girl it's plain to see that you're the only one for me, Four: Repeat steps 1-3, Five: Make you fall in love with me, If ever I believe my work is done, Then I'll start again at one.".split(', '),
}

// INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Dive",
      artist: "Ed Sheeran",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "Boyfriend No. 2",
      artist: "Pleasure P",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    },
    3: {
      title: "Dear Life",
      artist: "Anthony Hamilton",
      songId: 3,
      songArray: songList[3],
      arrayPosition: 0,
    },
    4: {
      title: "Back at One",
      artist: "Brian McKnight",
      songId: 4,
      songArray: songList[4],
      arrayPosition: 0,
    }
  }
};

//REDUCER GOES HERE
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition,
      }
      return newState;
    case 'RESTART_SONG':
      newState = initialState;
      return newState;
    default:
      return state;
  }
}

// JEST TESTS AND SETUP GOES HERE
const { expect } = window;
console.log(initialState);
expect(reducer(initialState, { type: null })).toEqual(initialState);

expect(reducer(initialState, { type: 'NEXT_LYRIC' })).toEqual({
  songList: songList,
  arrayPosition: 1
});

expect(reducer({
    songLyricsArray: songLyricsArray,
    arrayPosition: 1,
  },
  { type: 'RESTART_SONG' })
).toEqual(initialState);


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
  const currentState = store.getState();

  if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG' } );
  } else {
    store.dispatch({ type: 'NEXT_LYRIC'} );
  }
}

//SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);
