// 'M/DD' 형식으로 변환
function graphFormatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

export default graphFormatDate;
