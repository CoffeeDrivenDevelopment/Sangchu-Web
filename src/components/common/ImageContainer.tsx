import styled from '@emotion/styled';

type ImageProps = {
  photo: string;
};

const ImgContainer = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
`;

const ImgContents = styled.img`
  height: 100%;
  margin: 0 auto;
`;

// 레시피와 식재료 상세페이지에 들어가는 사진에 사용, 받아온 이미지 props로 전달 필수!
// ex) <ImageContainer photo="https://www.amnews.co.kr/news/photo/202212/51966_38907_5834.jpg" />
function ImageContainer(props: ImageProps) {
  const { photo } = props;

  return (
    <ImgContainer>
      <ImgContents src={photo} alt="상세이미지" />
    </ImgContainer>
  );
}

export default ImageContainer;
