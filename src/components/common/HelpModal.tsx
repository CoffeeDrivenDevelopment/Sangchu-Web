/*

  [사용예시]

  - 함수 선언

  const [isModalClick, setIsModalClick] = useState<boolean>(false);
  const closeModal = () => setIsModalClick(false);

  - return

  <Header name="호박" openModal={openModal} isHelp={true} />
  {isModalClick && <HelpModal knowHow={knowHow} onClose={closeModal} />}

*/

import styled from '@emotion/styled';
import { FlexColBox } from './FlexColBox';
import close from '../../assets/images/close.png';
import help from '../../assets/images/help.png';
import { FlexRowBox } from './FlexRowBox';

// 재료 상세 페이지(부모 컴포넌트)에서 props 받아옴
// 재료 상세 Header와 한 세트

type HelpModalProps = {
  knowHow: string;
  onClose: () => void;
};

function HelpModal({ knowHow, onClose }: HelpModalProps) {
  return (
    <ModalBox onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <FlexRowBox $justifyContent="end">
          <CloseBox>
            <img src={close} height="18px" width="18px" onClick={onClose}></img>
          </CloseBox>
        </FlexRowBox>

        <FlexRowBox
          $gap="5px"
          $position="absolute"
          $top="17px"
          $left="15px"
          $justifyContent="center"
          $alignItems="center"
        >
          <img src={help} style={{ width: '25px', height: '25px' }} />
          <TitleText>구매요령</TitleText>
        </FlexRowBox>

        <ContentText>{knowHow ? knowHow : '구매 요령이 없습니다.'}</ContentText>
      </Modal>
    </ModalBox>
  );
}

export default HelpModal;

const ModalBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  z-index: 1200;
`;

const Modal = styled(FlexColBox)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  min-height: 200px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseBox = styled.div`
  position: absolute;
  top: 16px;
  right: 14px;
`;

const TitleText = styled.div`
  font-family: 'NanumSquareRoundEB';
`;
const ContentText = styled.div`
  font-family: 'NanumSquareRoundB';
  word-break: keep-all;
  margin-top: 40px;
`;
