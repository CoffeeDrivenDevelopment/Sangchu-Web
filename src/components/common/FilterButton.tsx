import Button from '@mui/material/Button';

type FilterButtonProps = {
  text: string;
  textColor?: string; // 글자색 디폴트는 흰색!
  backgroundColor?: string;
  onClick?: () => void;
};
// MainButton과의 차이점은 padding -> 버튼이더 납작해짐
// [사용예시]
// 1. 회색배경 + 검은글씨 : <FilterButton text="팔로잉" backgroundColor={LightGray} textColor="black" onclick={handleClick}/>
// 2. 메인색배경 + 흰글씨 : <FilterButton text="팔로우" backgroundColor={main} onclick={handleClick}/>
function FilterButton({ text, textColor, backgroundColor, onClick }: FilterButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        color: textColor,
        backgroundColor: backgroundColor,
        fontFamily: 'NanumSquareRoundEB',
        borderRadius: '10px',
        padding: '1px',
        '&:hover': {
          backgroundColor: backgroundColor,
        },
        '&:focus': {
          backgroundColor: backgroundColor,
        },
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default FilterButton;
