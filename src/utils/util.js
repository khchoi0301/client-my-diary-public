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

const getToday = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  return `${yyyy}년 ${mm}월 ${dd}일`;
};

export default {
  convertToArrayTag,
  emailCheck,
  passwordCheck,
  getToday,
};
