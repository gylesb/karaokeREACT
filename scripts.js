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
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type){
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}

const rootReducer = this.Redux.combineReducers({
  currentSongId: songChangeReducer,
  songsById: lyricChangeReducer
});

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


// REDUX STORE
const { createStore } = Redux;
const store = createStore(rootReducer);

//RENDERING STATE IN DOM

const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }

  if (store.getState().currentSongId) {
    const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
    document.getElementById('lyrics').appendChild(currentLine);
  } else {
    const selectSongMessage = document.createTextNode("Select a song from the menu above to sing along!");
    document.getElementById('lyrics').appendChild(selectSongMessage);
  }
}

const renderSongs = () => {
  const songsById = store.getState().songsById;
  for (const songKey in songsById) {
    const song = songsById[songKey]
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const em = document.createElement('em');
    const songTitle = document.createTextNode(song.title);
    const songArtist = document.createTextNode(' by ' + song.artist);
    em.appendChild(songTitle);
    h3.appendChild(em);
    h3.appendChild(songArtist);
    h3.addEventListener('click', function() {
      selectSong(song.songId);
    });
    li.appendChild(h3);
    document.getElementById('songs').appendChild(li);
  }
}

window.onload = function() {
  renderSongs();
  renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  console.log(store.getState().songsById[store.getState().currentSongId].arrayPosition);
  console.log(store.getState().songsById[store.getState().currentSongId].songArray.length - 1);
  if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].songArray.length - 1) {
    console.log('End of song');
    store.dispatch({ type: 'RESTART_SONG',
                     currentSongId: store.getState().currentSongId });
  } else {
    console.log('Same song');
    store.dispatch({ type: 'NEXT_LYRIC',
                     currentSongId: store.getState().currentSongId });
  }
}

const selectSong = (newSongId) => {
  let action;
  if (store.getState().currentSongId) {
    action = {
      type: 'RESTART_SONG',
      currentSongId: store.getState().currentSongId
    }
    store.dispatch(action);
  }
  action = {
    type: 'CHANGE_SONG',
    newSelectedSongId: newSongId
  }
  store.dispatch(action);
}

//SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);
