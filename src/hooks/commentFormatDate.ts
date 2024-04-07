// 업데이트 날짜 -> yy.mm.dd 형식으로 변경
function commentFormatDate(originalDateStr: string): string {
    const regex = /(\d+)년 (\d+)월 (\d+)일/;
    const match = originalDateStr.match(regex);
    if (!match) {
      throw new Error('Invalid date format');
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, year, month, day] = match.map(Number);
    const date = new Date(year, month - 1, day);
    const formattedDate = `${date.getFullYear().toString().slice(2)}.${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
    return formattedDate;
  }
  
  export default commentFormatDate;
  