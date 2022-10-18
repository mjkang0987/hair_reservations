import React from 'react';

import styled from 'styled-components';

import {Icon} from './Icons';

interface Props {
    children: React.ReactNode | string
    buttonIcon?: string
    a11y: boolean
}

const StyledButtonText = styled.span <Props>`
  display: flex;
  position: relative;
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
    return <StyledButtonText a11y={a11y}
                             buttonIcon={buttonIcon}>
        {(buttonIcon && buttonIcon === 'plus') && <Icon iconType="plus"/>}
        {children}
    </StyledButtonText>;
};