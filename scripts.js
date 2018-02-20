// CHORUS INFO
const songLyricsArray = "So don't call me baby, Unless you mean it, Don't tell me you need me,  If you don't believe it, So let me know the truth, Before I dive right into you".split(', ')

// INITIAL REDUX STATE
const initalState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

console.log(initalState);

// CLICK LISTENER
const userClick = () => {
  console.log('click');
}
