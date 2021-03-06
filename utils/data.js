const dayjs = require('dayjs');

const formatDate = function (date){
  // console.log("🚀 ~ file: data.js ~ line 4 ~ formatDate ~ date", date)
  
  return dayjs(date).format('MMM DD YYYY [at] hh:mm a');
}
formatDate()
// console.log(formatDate)


const names = [
    'Britney',
    'Harry', 
    'Bonny', 
    'Mickey', 
];

const reactionDescriptions = [
    'Happy',
    'Sad',
    'Angry',
    'BritneyToxic',
];

  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Gets a random full name
  const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
  
  // Function to generate random assignments that we can add to student object.
  const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionName: getRandomArrItem(reactionDescriptions),
        score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { formatDate, getRandomName, getRandomReactions };
  