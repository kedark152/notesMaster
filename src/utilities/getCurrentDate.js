export const getCurrentDate = () => {
  const today = new Date();
  const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = today.getMonth() + 1;
  const hours = today.getHours();
  const mins = today.getMinutes();
  const secs = today.getSeconds();
  return `${month}/${date}/${today.getFullYear()} ${hours}:${mins}:${secs}`;
};
