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
import {TimelineComponent} from './Timeline';

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
                    <DaysComponent>
                        {(type === ViewType.Week || type === ViewType.Three) && <WeekWrapComponent type={type}/>}
                    </DaysComponent>
                </StyledDaysWrap>

                <StyledDatesWrap type={type}>
                    {type !== ViewType.Month && <TimelineComponent/>}
                    {type === ViewType.Month && <MonthWrapComponent/>}
                </StyledDatesWrap>
            </>}

            {(type === ViewType.Year) && <YearComponents/>}
        </>
    );
};

const StyledDaysWrap = styled.div <DaysType>`
  width: 100%;

  ${props => props.type !== ViewType.Month && `
    padding-left: 150px;
    box-sizing: border-box;
  `}
  ul {
    grid-template-columns: repeat(${props => props.type === ViewType.Three ? 3 : 7}, 1fr);
  }
`;

const StyledDatesWrap = styled.div<{ type: string | null }>`
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