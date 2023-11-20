import styled from 'styled-components';

import {ReservationsType} from '../../recoil/atoms';

import {
    COLORS
} from '../../utils/constants';

import {ButtonText} from '../common/ButtonText';
import {ButtonSquare} from '../common/Buttons';
import React from 'react';

export const ModalReservations = ({items}: { items: ReservationsType[] }) => {
    return (<StyledItems>
            {items.map((item) => <StyledItem key={`${item.name}_${item.service}`}>
                <ButtonSquare padding={['5px']}
                              height="auto"
                              backgroundColor={COLORS[+item.color]}>
                    <ButtonText a11y={false}
                                fontSize={'var(--tiny-font)'}>{item.name} - {item.service}</ButtonText>
                </ButtonSquare>
            </StyledItem>)}
        </StyledItems>
    );
};

const StyledItems = styled.ul`
`;

const StyledItem = styled.li`
  
  + li {
    margin-top: 4px;
  }
    
  button {
    justify-content: flex-start;
    width: 100%;
    
    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;