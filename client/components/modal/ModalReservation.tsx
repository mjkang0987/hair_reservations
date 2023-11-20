import styled from 'styled-components';

import {ReservationsType} from '../../recoil/atoms';
import {
    setTimeHeight,
    setTimeText
} from '../../utils/utils';
import {
    COLORS,
    ViewType
} from '../../utils/constants';
import {ButtonText} from '../common/ButtonText';
import {ButtonSquare} from '../common/Buttons';
import React from 'react';

export const ModalReservation = ({item}: { item: ReservationsType }) => {
    return (<StyledItems>
            <StyledItem><StyledService>{item.service}</StyledService></StyledItem>
            <StyledItem>
                {setTimeText({
                    startHours  : item.startHours,
                    startMinutes: item.startMinutes
                })} - {setTimeText({
                startHours  : item.endHours,
                startMinutes: item.endMinutes
            })}
            </StyledItem>
            <StyledItem>
                <ButtonSquare padding={['5px']}
                              height={'30px'}
                              backgroundColor={COLORS[+item.color]}>
                    <ButtonText a11y={false}
                                fontSize={'var(--font)'}>{item.name}</ButtonText>
                </ButtonSquare>
            </StyledItem>
            <StyledItem>
                <a href={`tel:${item.tel}`}>{item.tel}</a>
            </StyledItem>
        </StyledItems>
    );
};

const StyledItems = styled.ul`
`;

const StyledItem = styled.li`
  word-break: break-all;
  
  + li {
    margin-top: 10px;
  }
`;

const StyledService = styled.strong`
  font-size: var(--big-font);
`;
