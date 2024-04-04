import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import TitleBox from '../../components/common/TitleBox';
import SearchInput from '../../components/common/SearchInput';
import ingredients from '../../assets/images/ingredients.png';
import getRank from '../../services/ingredient/getRank';
import getAsc from '../../services/ingredient/getAsc';
import getDesc from '../../services/ingredient/getDesc';
import IconBox from '../../components/common/IconBox';
import getSearchIngredient from '../../services/ingredient/getSearchIngredient';
import useToggleStore from '../../stores/useToggleStore';
import EmptyData from '../../components/common/EmptyData';
import LoadingSpinner from '../../components/common/LoadingSpinner';

type IngredientProps = {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image: string;
};

const IngredientContainer = styled.div`
  margin: 1rem;
`;

const IngredientWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const SearchResultArea = styled.div`
  font-family: 'NanumSquareRoundB';
  border: 1px solid #1f7a1f;
  border-top: 0;
  background-color: white;
  z-index: 2;
  width: 77%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const SearchResult = styled.div`
  padding: 5px;
  border-bottom: 1px solid #1f7a1f;
`;

function Ingredients() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const [searchIngredientData, setSearchIngredientData] = useState<Array<IngredientProps>>([]);
  const { labelList, categoryImg, setCategoryValue } = useToggleStore();

  // 농수산물 검색
  useEffect(() => {
    const fetchData = async () => {
      if (keyword) {
        const data = await getSearchIngredient(keyword);
        if (data !== null) {
          setSearchIngredientData(data);
        }
      }
    };

    fetchData();
  }, [keyword]);

  const searchIngredient = () => {
    console.log('너는 어디에?', keyword);
  };

  const moveToList = (idx: number) => {
    setCategoryValue(idx);
    navigate('category');
  };

  const moveToDetail = (id: number) => {
    navigate(`${id}`);
  };

  // 실시간 인기 재료 React Query
  const { isLoading: rankLoading, data: rankData } = useQuery({
    queryKey: ['get-rank'],
    queryFn: () => getRank(),
  });

  // 가격 상승 재료 React Query
  const { isLoading: rankAscLoading, data: rankAscData } = useQuery({
    queryKey: ['get-asc'],
    queryFn: () => getAsc(),
  });

  // 가격 하락 재료 React Query
  const { isLoading: rankDescLoading, data: rankDescData } = useQuery({
    queryKey: ['get-desc'],
    queryFn: () => getDesc(),
  });

  if (rankLoading || rankAscLoading || rankDescLoading) {
    return <LoadingSpinner />;
  }

  if (!rankData || !rankAscData || !rankDescData) {
    return <EmptyData />;
  }

  return (
    <div>
      <TitleBox text="농수산물 식재료" img={ingredients} />
      <SearchContainer>
        <SearchInput keyword={keyword} onSearch={searchIngredient} setKeyword={setKeyword} />
        {keyword && (
          <SearchResultArea>
            {searchIngredientData.map((search, idx) => (
              <SearchResult key={idx} onClick={() => moveToDetail(search.ingredient_id)}>
                <span>{search.ingredient_name}</span>
              </SearchResult>
            ))}
          </SearchResultArea>
        )}
      </SearchContainer>
      <IngredientContainer>
        <h5>농수산물 카테고리</h5>
        <IngredientWrapper>
          {labelList.ingredient.map((ingre, idx) => (
            <div key={idx} onClick={() => moveToList(idx)}>
              <IconBox text={ingre} img={categoryImg[idx]} />
            </div>
          ))}
        </IngredientWrapper>
      </IngredientContainer>
      <IngredientContainer>
        <h5>실시간 인기 재료</h5>
        <IngredientWrapper>
          {rankData.populars.map((rankInfo) => (
            <div key={rankInfo.ingredient_id} onClick={() => moveToDetail(rankInfo.ingredient_id)}>
              <IconBox img={rankInfo.ingredient_image} text={rankInfo.ingredient_name} />
            </div>
          ))}
        </IngredientWrapper>
      </IngredientContainer>
      <IngredientContainer>
        <h5>가격 상승 재료</h5>
        <IngredientWrapper>
          {rankAscData.ingredient_gap_list.map((rankInfo) => (
            <div key={rankInfo.ingredient_id} onClick={() => moveToDetail(rankInfo.ingredient_id)}>
              <IconBox
                img={rankInfo.ingredient_image}
                text={rankInfo.ingredient_name}
                percent={((rankInfo.curr_price - rankInfo.prev_price) / rankInfo.prev_price) * 100}
              />
            </div>
          ))}
        </IngredientWrapper>
      </IngredientContainer>
      <IngredientContainer>
        <h5>가격 하락 재료</h5>
        <IngredientWrapper>
          {rankDescData.ingredient_gap_list.map((rankInfo) => (
            <div key={rankInfo.ingredient_id} onClick={() => moveToDetail(rankInfo.ingredient_id)}>
              <IconBox
                img={rankInfo.ingredient_image}
                text={rankInfo.ingredient_name}
                percent={((rankInfo.curr_price - rankInfo.prev_price) / rankInfo.prev_price) * 100}
              />
            </div>
          ))}
        </IngredientWrapper>
      </IngredientContainer>
    </div>
  );
}

export default Ingredients;
