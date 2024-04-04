import Header from '../../components/common/Header';
import ScrollToggleBar from '../../components/common/ScrollToggleBar';
import styled from '@emotion/styled';
import MainButton from '../../components/common/MainButton';
import { LightGray, main } from '../../assets/styles/palettes';
import { useState, useEffect } from 'react';
import useToggleStore from '../../stores/useToggleStore';
import { useQuery } from '@tanstack/react-query';
import getList from '../../services/ingredient/getList';
import IconBox from '../../components/common/IconBox';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyData from '../../components/common/EmptyData';

const SubHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterArea = styled.div`
  gap: 1rem;
  display: flex;
`;

const ContentsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 0.5rem;
`;

function IngredientList() {
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState<number>(0);
  const [initialValue, setInitialValue] = useState<number>(0);
  const { categoryValue, categoryName } = useToggleStore();

  const latestOrder = () => {
    setFilterState(0);
  };

  const popularOrder = () => {
    setFilterState(1);
  };

  const moveToDetail = (id: number) => {
    navigate(`/ingredient/${id}`);
  };

  useEffect(() => {
    setInitialValue(categoryValue);
  }, [categoryValue]);

  // 카테고리별 식재료 받아오기
  const { isLoading: listLoading, data: listData } = useQuery({
    queryKey: ['get-list', categoryValue],
    queryFn: () => getList(categoryName[categoryValue]),
  });

  useEffect(() => {
    console.log(listData);
  }, [listData]);

  if (listLoading) return <LoadingSpinner />;
  if (!listData) return <EmptyData />;

  return (
    <div>
      <Header />
      <ScrollToggleBar labelType="ingredient" initialValue={initialValue} />
      <SubHeader>
        {filterState == 0 ? (
          <FilterArea>
            <div onClick={() => latestOrder()}>
              <MainButton text="최신순" backgroundColor={main} />
            </div>
            <div onClick={() => popularOrder()}>
              <MainButton text="인기순" backgroundColor={LightGray} textColor="black" />
            </div>
          </FilterArea>
        ) : (
          <FilterArea>
            <div onClick={() => latestOrder()}>
              <MainButton text="최신순" backgroundColor={LightGray} textColor="black" />
            </div>
            <div onClick={() => popularOrder()}>
              <MainButton text="인기순" backgroundColor={main} />
            </div>
          </FilterArea>
        )}
        <span></span>
      </SubHeader>
      <ContentsArea>
        {listData.searches.map((ingredient, idx) => (
          <div key={idx} onClick={() => moveToDetail(ingredient.ingredient_id)}>
            <IconBox text={ingredient.ingredient_name} img={ingredient.ingredient_image} />
          </div>
        ))}
      </ContentsArea>
    </div>
  );
}

export default IngredientList;
