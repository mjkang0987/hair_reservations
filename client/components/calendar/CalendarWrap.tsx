import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {ViewType} from '../../utils/constants';

import {DaysComponent} from './Days';
import {DatesComponent} from './Dates';
import {YearComponents} from './Year';
import {WeekWrapComponent} from './WeekWrap';
import {MonthWrapComponent} from './MonthWrap';

interface DaysType {
    type: string | null;
}

export const CalendarComponent = () => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    return (
        <>
            {(type !== ViewType.Year) && <StyledDaysWrap type={type}>
                <DaysComponent>
                    {(type === ViewType.Week || type === ViewType.Three) && <WeekWrapComponent type={type}/>}
                </DaysComponent>
            </StyledDaysWrap>}

            <DatesComponent>
                {type === ViewType.Month && <MonthWrapComponent/>}
            </DatesComponent>

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