import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type TabPanelProps = {
  index: number;
  value: number;
};

function ToggleContents(props: TabPanelProps) {
  const { value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* 선택한 label과 일치하는 내용물 출력 */}
          {/* ex) label이 follow이고 value가 0(팔로워)일 때 나의 팔로워들을 출력*/}
          <Typography>{value == 0 ? '1번' : '2번'}</Typography>
        </Box>
      )}
    </div>
  );
}

export default ToggleContents;
