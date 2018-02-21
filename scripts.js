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

//REDUCERs
const lyricChangeReducer = (state = initialState.songsById, action) => {
  //Declares several variables
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;

  switch (action.type) {
    case 'NEXT_LYRIC':
    //Locates the arrayPosition of the song whose ID was provided
    //In action's payload, and increments it by one:
    console.log(action.currentSongId);
    newArrayPosition = state[action.currentSongId].arrayPosition + 1;
    //Creates a copy of a song's entry in the songsById
    //Adds updated newArrayPosition value we just calculated as its ArrayPosition
    newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
      arrayPosition: newArrayPosition
    })
    //Creates copy of entire songsById state slice
    //Adds updated newSongsById state entry to a new copy:
    newSongsByIdStateSlice = Object.assign({}, state, {
      [action.currentSongId]: newSongsByIdEntry
    });
    //Returns entire newSongsByIdSlice that was constructed
      return newSongsByIdStateSlice;

    case 'RESTART_SONG':
    //Creates copy of the song entry in songsId state slice whose ID matches the current song ID. Includes with the action
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })
      // Creates a copy of the entire songsById state slice, and adds the
      // updated newSongsByIdEntry we just created to this copy:
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      //Returns entires newSongs By updating ID state state slice in Redux store to match the new slice returned
      return newSongsByIdStateSlice;
      // If action is neither NEXT_LYRIC or RESTART_SONG type, return existing state.
    default:
      return state;
  }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type) {
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}

// JEST TESTS AND SETUP GOES HERE
const { expect } = window;

console.log(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2})).toEqual({
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
    arrayPosition: 1,
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
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1})).toEqual({
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
});

expect(songChangeReducer(initialState, { type: null})).toEqual(initialState);

expect(songChangeReducer(initialState, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

//REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);

// //RENDERING STATE IN DOM
// const renderLyrics = () => {
//   //Defines a lyricsDisplay constant that refers to the div with a 'lyrics' ID
//   const lyricsDisplay = document.getElementById('lyrics');
//   //If there are lyrics in the div, remove them all one by one until it's empty
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//   //Locates song lyrics at the current arrayPosition
//   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//   //Creates DOM text node containing the song lyric identified in the line above
//   const renderedLine = document.createTextNode(currentLine);
//   //Adds text node create in line above to 'lyrics' div in DOM
//   document.getElementById('lyrics').appendChild(renderedLine);
// }
//
// //runs renderLyrics method
// //HTML5 version of $(document).ready()
// window.onLoad = function() {
//   renderLyrics();
// }

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
