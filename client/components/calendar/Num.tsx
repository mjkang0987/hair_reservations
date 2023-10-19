import React, {MouseEventHandler} from 'react';

import styled from 'styled-components';

interface Props {
    onClick?: MouseEventHandler;
    children: React.ReactNode | string;
    isToday?: boolean;
}

export const Num: React.FC<Props> = ({children, ...props}) => {
    return <StyledNum {...props}>{children}</StyledNum>;
};

const StyledNum = styled.button <Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: transparent;
  border: none;
  font-size: var(--small-font);
  color: var(--black-color);

  ${props => props.isToday && `
    background-color: var(--blue-color);
    color: #fff;
  `}
  &:hover {
    background-color: var(--light-gray-color);
  }
`;
