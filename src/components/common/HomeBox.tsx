import Box from '@mui/material/Box';

type HomeBoxProps = {
  height: number;
  children: React.ReactNode;
};

// 사용하지 않게 된 컴포넌트 -> 삭제예정
const HomeBox = ({ height, children }: HomeBoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: height,
          borderRadius: 2.5,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default HomeBox;
