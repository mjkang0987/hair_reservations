import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {
    viewState
} from '../../recoil/atoms';

import {ViewType} from '../../utils/constants';

import {DaysComponent} from './Days';
import {YearComponents} from './Year';
import {WeekWrapComponent} from './WeekWrap';
import {MonthWrapComponent} from './MonthWrap';
import {TimelineTitleComponent} from './TimelineTitle';
import {DayComponent} from './Day';

interface DaysType {
    type: string | null;
}

export const CalendarComponent = () => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    return (
        <>
            {(type !== ViewType.Year) && <>
                <StyledDaysWrap type={type}>
                    {type !== ViewType.Month && <TimelineTitleComponent/>}
                    {type !== ViewType.Day && <DaysComponent/>}
                    {type === ViewType.Day && <DayComponent/>}
                    {(type === ViewType.Week || type === ViewType.Three) && <WeekWrapComponent type={type}/>}
                </StyledDaysWrap>

                {type === ViewType.Month && <MonthWrapComponent/>}
            </>}

            {(type === ViewType.Year) && <YearComponents/>}
        </>
    );
};

const StyledDaysWrap = styled.div <DaysType>`
  display: grid;
  width: 100%;
  
  ${props => props.type !== ViewType.Month && `
  grid-template-columns: 120px 1fr;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  
  > div {
    grid-row: 2 / 3;
  }
  
  > ul {
    grid-column: 2 / 3;
  }
  `}

  > ul {
  grid-template-columns: repeat(${props => props.type === ViewType.Three ? 3 : 7}, 1fr);
  }
}
`;
