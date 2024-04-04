import { useState, SyntheticEvent, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../assets/styles/theme';
import useToggleStore from '../../stores/useToggleStore';

type ScrollToggleProps = {
  labelType: string;
  initialValue?: number;
};

// 토글바 호출할 때 labelType 명시 필요!
// ex) <ScrollToggleBar labelType='ingredient' />
function ScrollToggleBar({ labelType, initialValue }: ScrollToggleProps) {
  const { setCategoryValue, labelList } = useToggleStore();
  const [value, setValue] = useState<number>(0);

  const labelClick = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setCategoryValue(newValue);
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ maxWidth: { xs: 360, sm: 480 } }}>
          <Tabs
            value={value}
            onChange={labelClick}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
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

export default ScrollToggleBar;
