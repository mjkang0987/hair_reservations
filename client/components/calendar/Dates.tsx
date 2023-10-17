import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {targetStateState, todayState, viewState} from '../../recoil/atoms';

import {
    ASIDE,
    NodeType,
    ViewType
} from '../../utils/constants';

import {MonthWrapComponent} from './MonthWrap';
import {TimelineTitleComponent} from './Timeline';

export const DatesComponent = ({children}: NodeType) => {
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
    return (<StyledCalendar type={type}>
            {(type !== ViewType.Month && type !== ViewType.Year) && <>
                <TimelineTitleComponent/>
                <StyledTimelineWrap>
                    {type && new Array(ASIDE[type.toUpperCase()].move).fill(null).map((a, i) =>
                    <StyledTimeline key={`timeline_${i}`}></StyledTimeline>)}
                </StyledTimelineWrap>
            </>}
            {children}
        </StyledCalendar>
    );
};

const StyledCalendar = styled.div<{ type: string | null }>`
  flex: 1;
  display: grid;
  grid-template-columns: ${props => props.type !== ViewType.Month ? '150px auto' : '1fr'};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  
  ul {
    grid-template-columns: repeat(${props => props.type === ViewType.Three ? 3 : 7}, 1fr);
  }
`;

const StyledTimelineWrap = styled.ul`
  display: grid;
`;

const StyledTimeline = styled.li`
    border-right: 1px solid var(--defaultLightGray);
  box-sizing: border-box;
  
  &:nth-last-child(1) {
    border-right: none;
  }
`;
