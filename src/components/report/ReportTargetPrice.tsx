import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { forwardRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import WheelPicker from 'react-simple-wheel-picker';
import { main } from '../../assets/styles/palettes';
import getTargetPrice from '../../services/report/getTargetPrice';
import postTargetPrice from '../../services/report/postTargetPrice';
// import useTargetPriceStore from '../../stores/usePriceStore';
import EmptyData from '../common/EmptyData';
// import { FlexColBox } from '../common/FlexColBox';
// import { FlexRowBox } from '../common/FlexRowBox';
import LoadingSpinner from '../common/LoadingSpinner';
import MainButton from '../common/MainButton';

import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
// import { SelectChangeEvent } from '@mui/material/Select';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { FlexRowBox } from '../common/FlexRowBox';
import Swal from 'sweetalert2';
import getUserTargetPrice from '../../services/user/getUserTargetPrice';

const NumericFormatAdapter = forwardRef<NumericFormatProps, CustomProps>(function NumericFormatAdapter(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="₩"
    />
  );
});

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};
// type DataSet = {
//   id: string;
//   value: string | number;
// };
function ReportTargetPrice() {
  const { id: stringId } = useParams<{ id?: string }>();
  const id = stringId ? parseInt(stringId, 10) : null;
  // 나의 목표가 조회 api 호출 함수로 현재의 목표가(priceValue)받아오기
  // const { setPriceValue } = useTargetPriceStore();
  // 선택된 목표가의 cnt 상태를 추가
  // const [selectedCnt, setSelectedCnt] = useState<string | null>(null);
  const { isLoading: targetLoading, data: targetData } = useQuery({
    queryKey: ['get-TargetPrice', id],
    queryFn: () => (id !== null ? getTargetPrice(id) : Promise.reject(new Error('ID is null'))),
  });
  const queryClient = useQueryClient();
  const [myTargetPrice, setMytargetPrice] = useState<number | null | undefined>(null);

  useEffect(() => {
    const getTargetPrice = async () => {
      try {
        const response = await getUserTargetPrice();
        if (response) {
          const mytarget = response.target_price_list.find((target) => target.ingredient_id === id);
          const mytargetPrice = mytarget?.target_price;
          setMytargetPrice(mytargetPrice);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTargetPrice();
  }, []);

  // const target = targets.find((target) => target.id === id);
  // const targetPrice = target?.targetPrice;

  // const [myPrice, setMyprice] = useState<number | undefined>(targetPrice || undefined);
  // useEffect(() => {
  //   setMyprice(targetData?.targetPrice);
  // }, []);
  // console.log('현재 내 목표가:', myPrice);
  // const handleChange = (event: SelectChangeEvent) => {
  //   setMyprice(event.target.value);
  // };
  // console.log(targetData?.targetPrice);
  // useEffect(() => {
  //   if (targetData && targetData.targets.length > 0) {
  //     setSelectedId(targetData.targets[0].price.toString());
  //   }
  // }, [targetData]);

  // console.log(targetData);
  // console.log(selectedId);
  // console.log(targetData?.targets + '현재 선택된 가격임');

  // useEffect(() => {
  //   if (priceValue == null && targetData) {
  //     const initialId = targetData.targets[0].price.toLocaleString();
  //     console.log(initialId + '으로 초기값설정');
  //     setSelectedId(initialId);
  //     // setPriceValue(Number(initialId.replace(/,/g, '')));
  //   }
  // }, [priceValue, targetData, setPriceValue]);

  const handleSetTarget = async () => {
    if (id != null && myTargetPrice != null) {
      const mytarg = { id, price: myTargetPrice };
      await postTargetPrice(mytarg);
      queryClient.invalidateQueries({ queryKey: ['get-OfflineReport', id] });
      queryClient.invalidateQueries({ queryKey: ['get-OnlineReport', id] });
      Swal.fire({
        icon: 'success',
        text: '목표가 설정 완료!',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: '닫기',
      });
    }
  };

  if (targetLoading) {
    return <LoadingSpinner />;
  }

  if (!targetData) {
    return <EmptyData />;
  }
  // console.log('리렌더링');
  // const targetList: number[] = targetData.targets.map((item) => item.price);

  // const setKeyValue = (arr: number[]): DataSet[] => {
  //   return arr.map((item) => ({
  //     id: item.toLocaleString(),
  //     value: item.toLocaleString(),
  //   }));
  // };
  // const dataSets = setKeyValue(targetList);

  //   // 스크롤로 가격 바뀔 때마다 작동
  //   const handleOnChange = (data: DataSet) => {
  //     if (typeof data.value === 'string') {
  //       // 콤마 제거 후 숫자로 변환
  //       const numericValue = Number(data.value.replace(/,/g, ''));
  //       const index = targetList.findIndex((item) => item === numericValue);
  //       if (index !== -1 && targetData) {
  //         setSelectedCnt(targetData.targets[index].cnt);
  //       }
  //       setSelectedId(data.value);
  //     }
  //   };

  // 목표가 설정 완료 버튼 클릭
  // function Picker() {
  //   const handleSetTarget = async () => {
  //     if (id != null) {
  //       // setPriceValue(Number(myPrice));
  //       const myTargetPrice = { id, price: Number(myPrice) };
  //       await postTargetPrice(myTargetPrice);
  //       alert('목표가 설정 완료!');
  //     }
  //   };
  //   return (
  //     <FlexColBox $justifyContent="center" $alignItems="center">
  //       <PickerContainer>

  /* {selectedId ? (
            <WheelPicker
              data={dataSets}
              onChange={handleOnChange}
              height={150}
              width={100}
              titleText="Enter value same as aria-label"
              itemHeight={35}
              selectedID={selectedId}
              color="#999999"
              activeColor="#000000"
              backgroundColor="white"
              shadowColor="none"
            />
          ) : null} */

  /* <FormControl sx={{ m: 1, height: '10vh' }}>
            <Select displayEmpty value={myPrice} onChange={handleChange}>
              {targetData?.targets.map((target, i) => (
                <MenuItem key={i} value={target.price} onClick={() => setMyprice(target.price.toString())}>
                  {target.price}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>목표가를 설정해주세요!</FormHelperText>
          </FormControl> */

  //       </PickerContainer>
  //       {/* <TextBox>
  //         <PointText>{selectedCnt}</PointText>
  //         <div>명이</div>
  //         <PointText>{myPrice}</PointText>
  //         <div>원에 알림을 설정했어요!</div>
  //       </TextBox> */}

  //       <ButtonBox>
  //         <MainButton text="설정 완료" backgroundColor={main} padding="5px 70px" onClick={() => handleSetTarget()} />
  //       </ButtonBox>
  //     </FlexColBox>
  //   );
  // }

  return (
    <div style={{ padding: '5vh 0' }}>
      <FormControl>
        <Input
          sx={{ padding: '10px', width: '70%', margin: 'auto', color: 'black' }}
          value={myTargetPrice || undefined}
          color="success"
          onChange={(event) => setMytargetPrice(Number(event.target.value))}
          placeholder="목표가를 입력해주세요."
          slotProps={{
            input: {
              component: NumericFormatAdapter,
            },
          }}
        />
      </FormControl>
      {/* <input onChange={(e) => setMyprice(Number(e.target.value))} /> */}
      <ButtonBox>
        <MainButton text="설정 완료" backgroundColor={main} padding="8px 12px" onClick={() => handleSetTarget()} />
      </ButtonBox>
    </div>
  );
}

export default ReportTargetPrice;

// const PickerContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding-top: 20px;
// `;

const ButtonBox = styled(FlexRowBox)`
  padding: 2vh;
  margin-bottom: 40px;
  justify-content: center;
`;

// const PointText = styled.div`
//   font-family: 'NanumSquareRoundEB';
//   color: ${main};
// `;

// const TextBox = styled(FlexRowBox)`
//   font-family: 'NanumSquareRoundB';
//   padding: 15px 0;
//   gap: 2px;
// `;
