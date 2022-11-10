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
  ${props => props.iconType === 'loading' && `
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #00afff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s cubic-bezier(.09, .49, .85, .42) infinite;
  `}
  
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
  
  ${props => props.iconType.includes('Arrow') && `
    height: 40px;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -${props.iconType === 'rightArrow' ? 8 : 2}px;
      width: 10px;
      height: 10px;
      border: solid var(--defaultBlack);
      border-width: 1px 1px 0 0;
      transform: translateY(-50%) rotate(${props.iconType === 'rightArrow' ? 45 : -135}deg);      
    }
  `}
`;

export const Icon: React.FC <Props> = ({iconType}) => {
    return <StyledIcon iconType={iconType}/>;
};