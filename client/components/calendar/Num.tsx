import React from 'react';

import styled from 'styled-components';

interface Props {
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
  font-size: var(--defaultSmallFont);
  color: var(--defaultBlack);

  ${props => props.isToday && `
    background-color: var(--defaultBlue);
    color: #fff;
  `}
  &:hover {
    background-color: var(--defaultDarkGray);
    color: #fff;
  }
`;
