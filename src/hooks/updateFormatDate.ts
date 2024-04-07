// 업데이트 날짜 -> yy.mm.dd hh:mm:ss 형식으로 변경
function updateFormatDate(originalDateStr: string): string {
  const regex = /(\d+)년 (\d+)월 (\d+)일 (\d+)시 (\d+)분 (\d+)초/;
  const match = originalDateStr.match(regex);
  if (!match) {
    throw new Error('Invalid date format');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, year, month, day, hour, minute, second] = match.map(Number);
  const date = new Date(year, month - 1, day, hour, minute, second);
  const formattedDate = `${date.getFullYear().toString().slice(2)}.${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
  return formattedDate;
}

export default updateFormatDate;
