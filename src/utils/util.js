const convertToArrayTag = tagString => {
  const splitedTagToArr = tagString.split('#');
  return !splitedTagToArr[0] ? splitedTagToArr.slice(1) : splitedTagToArr;
};

export default convertToArrayTag;
