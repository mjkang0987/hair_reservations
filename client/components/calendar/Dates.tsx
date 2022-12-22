import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {targetStateState, todayState, viewState} from '../../recoil/atoms';

import {ASIDE} from "../../utils/constants";

import {MonthWrapComponent} from './MonthWrap';
import {TimelineTitleComponent} from './Timeline';

export const DatesComponent = () => {
    const today = useRecoilValue(todayState);
    const target = useRecoilValue(targetStateState);
    const {
        fullYear,
        month,
        date,
    } = target;

    const view = useRecoilValue(viewState);
    const {type} = view;

    const isToday = [today.getFullYear(), today.getMonth(), today.getDate()].join(' ') === [fullYear, month, date].join(' ');
    return (<CalendarWrap type={type}>
            {(type !== 'month' && type !== 'year') && <>
                <TimelineTitleComponent/>
                <TimelineWrap>
                    {type && new Array(ASIDE[type.toUpperCase()].move).fill(null).map((a, i) =>
                    <Timeline key={`timeline_${i}`}></Timeline>)}
                </TimelineWrap>
            </>}
            {type === 'month' &&
                <MonthWrapComponent isToday={isToday}/>}
        </CalendarWrap>
    );
};

const CalendarWrap = styled.div<{ type: string | null }>`
  flex: 1;
  display: grid;
  grid-template-columns: ${props => props.type !== 'month' ? '150px auto' : '1fr'};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  
  ul {
    grid-template-columns: repeat(${props => props.type === 'three' ? 3 : 7}, 1fr);
  }
`;

const TimelineWrap = styled.ul`
  display: grid;
`;

const Timeline = styled.li`
    border-right: 1px solid var(--defaultLightGray);
  box-sizing: border-box;
  
  &:nth-last-child(1) {
    border-right: none;
  }
`;
