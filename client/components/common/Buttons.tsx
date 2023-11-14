import styled from 'styled-components';

import React from 'react';

interface Props {
    children: React.ReactNode | string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    padding?: Array<number | string>;
    fontSize?: string;
    height?: string;
    backgroundColor?: string;
}

const StyledSquareButton = styled.button <Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height
                     ? props.height
                     : '35px'};
  padding: ${props => props.padding
                      ? props.padding.join(' ')
                      : '0 15px'};
  border: 1px solid #ccc;
  background-color: ${props => props.backgroundColor
                               ? props.backgroundColor
                               : 'var(--white-color)'};
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
  font-size: ${props => props.fontSize
                        ? props.fontSize
                        : 'var(--small-font)'};
`;

export const ButtonSquare: React.FC<Props> = ({children, ...props}) => {
    return <StyledSquareButton {...props}>{children}</StyledSquareButton>;
};

const StyledCircleButton = styled.button <Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  background-color: var(--white-color);
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
`;

export const ButtonCircle: React.FC<Props> = ({children, ...props}) => {
    return <StyledCircleButton type="button" {...props}>{children}</StyledCircleButton>;
};