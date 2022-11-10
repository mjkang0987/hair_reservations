import React from 'react';

import styled from 'styled-components';

import {Icon} from './Icons';
import {ButtonText} from './ButtonText';

interface Props {
    inputIcon?: string
    children: React.ReactNode
}

const StyledInput = styled.div<Props>`
  display: flex;
  overflow: hidden;
  position: relative;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: var(--defaultWhite);
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);

  &::placeholder {
    color: var(--defaultGray);
  }
  
  ${props => props.inputIcon === 'search' && `
    input {
      border: none;
      background-color: var(--defaultWhite);
      padding: 0 0 0 10px;
      box-sizing: border-box;
    }
    
    button {
      display: flex;
      position: relative;
      width: 40px;
      border: none;
      background-color: var(--defaultWhite);
    }
  `};
`;

export const InputWrap:React.FC <Props> = ({children, inputIcon}) => {
    return <StyledInput inputIcon={inputIcon}>
        {children}
        {(inputIcon && inputIcon === 'search') && <button type="button">
            <Icon iconType="search"/>
            <ButtonText a11y={true}>검색</ButtonText>
        </button> }
    </StyledInput>;
};
