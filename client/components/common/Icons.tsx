import styled from 'styled-components';
import React from 'react';

interface Props {
    iconType: string
}

const StyledIcon = styled.span <Props>`
  flex-shrink: 0;
  display: inline-flex;
  position: relative;
  width: 40px;
  ${props => props.iconType === 'search' && `
    &::before,
    &::after {
      content: "";
      position: absolute;
    }
    
    &::before {
      top: 10px;
      right: 14px;
      width: 14px;
      height: 14px;
      border: solid 1px var(--defaultBlack);
      border-radius: 100%;
    }
    
    &::after {
      top: 26px;
      right: 12px;
      width: 6px;
      height: 1px;
      background-color: var(--defaultBlack);
      transform: rotate(45deg);
    }
  `}

  ${props => props.iconType === 'plus' && `
    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 2px;
      background-color: var(--defaultBlack);
      border-radius: 2px;
      pointer-events: none;
    }
    
    &::before {
      transform: translate(-50%, -50%);
    }
    
    &:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  `};
  
  ${props => props.iconType === 'hamburger' && `
    height: 40px;

    &::before {
      content: "";
      position: absolute;
      top: 14px;
      left: 50%;
      width: 18px;
      height: 2px;
      margin-left: -9px;
      border-radius: 2px;
      background-color: var(--defaultBlack);
      box-shadow: 0 10px 0 0 var(--defaultBlack);
    }
  `}
`;

export const Icon: React.FC <Props> = ({iconType}) => {
    return <StyledIcon iconType={iconType}/>;
};