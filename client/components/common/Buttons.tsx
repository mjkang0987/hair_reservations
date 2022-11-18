import styled from 'styled-components';
import React from 'react';

interface Props {
    children: React.ReactNode | string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | any;
}

const StyledSquareButton = styled.button <Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: var(--defaultWhite);
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
`;

export const ButtonSquare: React.FC<Props> = ({children, ...props}) => {
    return <StyledSquareButton {...props}>{children}</StyledSquareButton>;
};

const StyledCircleButton = styled.button <Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  background-color: var(--defaultWhite);
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
`;

export const ButtonCircle: React.FC<Props> = ({children, ...props}) => {
    return <StyledCircleButton type="button" {...props}>{children}</StyledCircleButton>;
};