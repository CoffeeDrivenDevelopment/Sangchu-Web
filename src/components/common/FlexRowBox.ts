import styled from '@emotion/styled';

type Props = {
  $backgroundColor?: string;
  $border?: string;
  $borderRadius?: string;
  $justifyContent?: string;
  $margin?: string;
  $padding?: string;
  $width?: string;
  $height?: string;
  $alignItems?: string;
  $gap?: string;
  $position?: string;
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
};

export const FlexRowBox = styled.div<Props>`
  display: flex;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: ${(props) => props.$backgroundColor};
  border: ${(props) => props.$border};
  border-radius: ${(props) => props.$borderRadius};
  justify-content: ${(props) => props.$justifyContent};
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
  align-items: ${(props) => props.$alignItems};
  gap: ${(props) => props.$gap};
  position: ${(props) => props.$position};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  bottom: ${(props) => props.$bottom};
`;
