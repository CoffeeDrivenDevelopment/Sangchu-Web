import { useState, SyntheticEvent, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../assets/styles/theme';
import useToggleStore from '../../stores/useToggleStore';

type ShortToggleProps = {
  labelType: string;
  initialValue?: number | undefined;
};

// 토글바 호출할 때 labelType 명시 필요!
// ex) <ShortToggleBar labelType='profile' />
function ShortToggleBar({ labelType, initialValue }: ShortToggleProps) {
  const [value, setValue] = useState<number>(0);
  const { setCategoryValue, labelList } = useToggleStore();

  const labelClick = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setCategoryValue(newValue);
  };

  useEffect(() => {
    console.log('초기값', initialValue);
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Box position="static">
          <Tabs
            value={value}
            onChange={labelClick}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            scrollButtons={false}
            aria-label="full width tabs example"
          >
            {labelList[labelType].map((label, idx) => (
              <Tab key={idx} label={label} />
            ))}
          </Tabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ShortToggleBar;
