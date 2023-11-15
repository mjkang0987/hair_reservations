import React from 'react';

import styled from 'styled-components';

interface Props {
    children: React.ReactNode | string
    a11y: boolean;
    fontSize?: string;
}

const StyledButtonText = styled.span <Props>`
  display: flex;
  position: relative;
  font-size: ${props => props.fontSize ? props.fontSize : 'var(--small-font)'};
  white-space: nowrap;
  pointer-events: none;
  ${props => props.a11y&& `
      overflow: hidden;
      position: absolute;
      border: 0;
      margin: -1px;
      width: 1px;
      height: 1px;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
    }
  `};
`;

export const ButtonText: React.FC <Props> = ({children, ...props}) => {
    return <StyledButtonText {...props}>{children}</StyledButtonText>;
};