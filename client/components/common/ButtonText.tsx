import styled from 'styled-components';
import React from 'react';

interface Props {
    children: string
    buttonIcon?: string
    a11y: boolean
}

const StyledButtonText = styled.span <Props>`
  position: relative;
  padding-left: ${props => (props.buttonIcon !== '' && !props.a11y) ? `20px` : 0};
  ${props => props.buttonIcon === 'plus' && `
    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 14px;
      height: 2px;
      background-color: var(--defaultBlack);
      border-radius: 2px;
      pointer-events: none;
    }
    
    &::before {
      transform: translateY(-50%);
    }
    
    &:after {
      transform: translateY(-50%) rotate(90deg);
    }
  `};
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

export const ButtonText: React.FC <Props> = ({children, buttonIcon, a11y}) => {
    return <StyledButtonText buttonIcon={buttonIcon}
                             a11y={a11y}>{children}</StyledButtonText>;
};