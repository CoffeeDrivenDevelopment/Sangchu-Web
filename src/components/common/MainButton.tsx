import Button from '@mui/material/Button';

type MainButtonProps = {
  text: string;
  textColor?: string; // 글자색 디폴트는 흰색!
  backgroundColor?: string;
  padding?: string;
  onClick?: () => void;
};

// [사용예시]
// 1. 회색배경 + 검은글씨 : <MainButton text="팔로잉" backgroundColor={LightGray} textColor="black" onclick={handleClick}/>
// 2. 메인색배경 + 흰글씨 : <MainButton text="팔로우" backgroundColor={main} onclick={handleClick}/>
function MainButton({ text, textColor, padding, backgroundColor, onClick }: MainButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        color: textColor,
        backgroundColor: backgroundColor,
        fontFamily: 'NanumSquareRoundEB',
        borderRadius: '10px',
        padding: padding,
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

export default MainButton;
