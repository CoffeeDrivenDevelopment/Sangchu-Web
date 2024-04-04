import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBox from '../../components/common/TitleBox';
import recipeImg from '../../assets/images/recipeMain.png';
import SearchInput from '../../components/common/SearchInput';
import RecipeCategory from '../../components/recipe/RecipeCategory';
import styled from '@emotion/styled';
import right from '../../assets/images/right_arrow_gray.png';
import { Gray } from '../../assets/styles/palettes';

const CategoryContents = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ETCBtn = styled.div`
  font-family: 'NanumSquareRoundEB';
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${Gray};
`;

const ETCArea = styled.div`
  display: flex;
  padding-right: 1rem;
`;

const InputBox = styled.div`
  padding: 1rem;
`;

function Recipes() {
  const [keyword, setKeyword] = useState<string>('');
  const navigate = useNavigate();

  const onSearch = () => {
    console.log(keyword);
  };

  const moveToList = (id: number) => {
    navigate(`category/${id}`, {
      state: {
        id: id,
      },
    });
  };

  return (
    <div>
      <TitleBox text="레시피 찾기" subText="어떤 것을 만들어볼까요?" img={recipeImg} />
      <InputBox>
        <SearchInput keyword={keyword} setKeyword={setKeyword} onSearch={onSearch} />
      </InputBox>
      <CategoryContents>
        <RecipeCategory />
      </CategoryContents>
      <ETCArea>
        <ETCBtn onClick={() => moveToList(17)}>
          <span>기타</span>
          <img src={right} alt="오른쪽 화살표" style={{ width: '20px', height: '20px' }} />
        </ETCBtn>
      </ETCArea>
    </div>
  );
}

export default Recipes;
