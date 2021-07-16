const fs = require("fs");
const filePath = 'data.txt'
const data = fs.readFileSync(filePath, "utf8");

const passArr = data.split("\r\n")

const getAmountOfValidPass = (data) => {

  const getRequiredCharacter = (item) => {
    return item.slice(0, 1)
  };

  const getAmountOfIteration = (item) => {
    const regex = /\d+/g;
    const matches = item.match(regex);  // creates array from matches

    return [matches[0], matches[1]]
  };

  const getLastWord = (str) => {
    return (str.match(/(\w+)\W*$/) || [])[1];
  };

  const validation = (item) => {
    const letter = getRequiredCharacter(item);
    const firstNum = getAmountOfIteration(item)[0];
    const secondNum = getRequiredCharacter(item)[1];
    const str = getLastWord(item);

    function dub(str, letter) {
      return [...str].filter(i => i === letter).length
    }

    if(dub(str, letter) >= firstNum || dub(str, letter) <= secondNum) return true
  };

  let amount = null
  for(let item of data){
    if(item !== ''){
      if(validation(item)){
        amount++
      }
    }
  }

  return amount
};

console.log('amount of valid pass: ', getAmountOfValidPass(passArr));
