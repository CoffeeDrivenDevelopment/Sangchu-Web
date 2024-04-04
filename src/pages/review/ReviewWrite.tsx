import { ChangeEvent, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FlexColBox } from '../../components/common/FlexColBox';
import MainButton from '../../components/common/MainButton';
import postReviewRegister from '../../services/review/postReviewRegister';
import { LightGray } from '../../assets/styles/palettes';
import * as S from './ReviewWrite.styled';

function ReviewWrite() {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [prevImgList, setPrevImgList] = useState<Array<string>>([]);
  const [uploadedImgList, setUploadedImgList] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const imageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 5) {
        alert('사진은 최대 5장까지만 업로드할 수 있습니다.');
        return;
      }
      setUploadedImgList(files);

      const fileUrl: Array<string> = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (result) {
            fileUrl.push(result);
            setPrevImgList([...fileUrl]);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const reviewRegister = async () => {
    if (!title) {
      alert('제목을 입력해주세요.');
    } else if (!uploadedImgList) {
      alert('최소 1장의 사진을 첨부해야 합니다.');
    } else {
      const formData = new FormData();
      const requestBlob = new Blob(
        [
          JSON.stringify({
            title,
            content: contents,
          }),
        ],
        {
          type: 'application/json',
        },
      );

      formData.append('body', requestBlob);

      for (let i = 0; i < uploadedImgList.length; i++) {
        formData.append('files', uploadedImgList[i]);
      }

      const res = await postReviewRegister(location.state.id, formData);
      if (res !== null) {
        navigate(`/recipe/${location.state.id}/review/${res.review_id}`, {
          state: {
            reviewId: res.review_id,
            name: location.state.name,
          },
        });
      } else {
        alert('리뷰 작성에 실패했습니다.');
      }
    }
  };

  return (
    <FlexColBox $padding="1rem" $gap="1rem">
      <S.TextContainer>
        <S.TitleText>
          <h5>제목</h5>&nbsp;
          <S.SubText>{'(필수)'}</S.SubText>
        </S.TitleText>
        <S.TitleInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </S.TextContainer>
      <S.TextContainer>
        <h5>내용</h5>
        <S.ContentsBox>
          <S.ContentsInput onChange={(e) => setContents(e.target.value)}></S.ContentsInput>
          <S.LimitText>최대 280자</S.LimitText>
        </S.ContentsBox>
      </S.TextContainer>
      <S.TextContainer>
        <h5>{'사진 첨부(최소 1장, 최대 5장)'}</h5>
        <S.PhotoContainer>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={(e) => imageUpload(e)}
          />
          {prevImgList.map((prevImg, index) => (
            <S.IconBox key={index}>
              <img src={prevImg} alt="리뷰 작성용 이미지" style={{ width: '100%', height: '100%' }} />
            </S.IconBox>
          ))}
          <S.PhotoBox onClick={() => imageUploadClick()}>+</S.PhotoBox>
        </S.PhotoContainer>
        <S.BtnBox>
          <MainButton text="작성 완료" backgroundColor={LightGray} textColor="black" onClick={() => reviewRegister()} />
        </S.BtnBox>
      </S.TextContainer>
    </FlexColBox>
  );
}

export default ReviewWrite;
