import React from 'react';

import styled from 'styled-components';

import {
    useRecoilValue,
    useSetRecoilState
} from 'recoil';

import {
    ReservationsType,
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {ViewType} from '../../utils/constants';

import {isTodayValue} from '../../utils/utils';

import {Num} from '../calendar/Num';

export const ModalReservationsTitle = ({item}: { item: ReservationsType }) => {
    const today = useRecoilValue(todayState);
    const setCurr = useSetRecoilState(targetStateState);
    const setView = useSetRecoilState(viewState);

    return (<StyledTitleWrap>
        <StyledMonth>{item.year} / {item.month}</StyledMonth>
        <Num onClick={() => {
            setCurr(new Date(item.year, item.month - 1, item.date));
            setView({type: ViewType.Day});
        }}
             isToday={isTodayValue(today, item.year, item.month - 1, item.date)}>{item.date}</Num>
    </StyledTitleWrap>);
};

const StyledTitleWrap = styled.strong`
  display: block;
  text-align: center;
  
  > button {
    font-size: var(--big-font);
    font-weight: bold;
  }
`;

const StyledMonth = styled.span`
  display: block;
  padding-bottom: 10px;
`;
