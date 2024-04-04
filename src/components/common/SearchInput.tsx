/* 
  사용예시

  - 함수 선언

  const [keyword, setKeyword] = useState<string>('');
  const handleSearch = (searchKeyword: string) => {
    console.log(`검색어 "${searchKeyword}"로 검색 실행`);
    // api 호출 함수
  };
  
  useEffect(() => {
    // 검색어를 입력한 경우에만 실행
    if (keyword.trim()) {
      handleSearch(keyword);
    }
  }, [keyword]);


  - return

  <SearchInput keyword={keyword} onSearch={handleSearch} setKeyword={setKeyword} />

  + 추후 리액트 쿼리로 리팩토링 가능하면 할 것!
*/

import styled from '@emotion/styled';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import search from '../../assets/images/search.png';
import cancel from '../../assets/images/cancel.png';

type SearchInputProps = {
  keyword: string;
  onSearch: (keyword: string) => void; // API 호출 함수
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

function SearchInput({ keyword, onSearch, setKeyword }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(keyword);
  };

  return (
    <InputBox onSubmit={handleSubmit}>
      <Input
        startDecorator={
          <SubmitButton>
            <img src={search} height={'30px'} width={'30px'} style={{ transform: 'translateX(5px)' }} />
          </SubmitButton>
        }
        endDecorator={
          isFocused && keyword ? (
            <CancelButton
              onClick={() => {
                setKeyword('');
                setIsFocused(false);
              }}
            >
              <img src={cancel} height={'24px'} width={'24px'} style={{ opacity: 0.5 }} />
            </CancelButton>
          ) : null
        }
        sx={{
          color: 'black',
          width: '80%',
          fontFamily: 'NanumSquareRoundB',
          '--Input-paddingInline': '0px',
          '--Input-radius': '10px',
          '--Input-gap': '12px',
          '--Input-placeholderOpacity': 0.5,
          '--Input-focusedThickness': '1px',
          '--Input-minHeight': '41px',
        }}
        placeholder="검색어를 입력해주세요."
        type="text"
        color="success"
        required
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onFocus={() => setIsFocused(true)}
      />
    </InputBox>
  );
}
export default SearchInput;

const InputBox = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  padding: 5px;
  padding-bottom: 0;
`;

const SubmitButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

const CancelButton = styled(SubmitButton)`
  padding: 0 5px 0 0;
`;
