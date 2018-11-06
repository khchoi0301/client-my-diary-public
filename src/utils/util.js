const convertToArrayTag = tagString => {
  const splitedTagToArr = tagString.split('#');
  return !splitedTagToArr[0] ? splitedTagToArr.slice(1) : splitedTagToArr;
};

const emailCheck = email => {
  const checker = /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/;

  return checker.test(email);
};

const passwordCheck = password => {
  const checker = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

  return checker.test(password);
};

export default { convertToArrayTag, emailCheck, passwordCheck };
