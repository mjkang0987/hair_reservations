import {useRouter} from 'next/router';

import styled from 'styled-components';

import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

import {
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {
    isTodayValue,
} from '../../utils/constants';

import {useChangeDate} from '../../hooks/useChangeDate';

import {TimelineComponent} from './Timeline';
import {Num} from './Num';

interface WeekDatesType {
    currMonth: number
    weekDates: number[]
}

export const WeekComponent = ({
    currMonth,
    weekDates
}: WeekDatesType) => {
    const router = useRouter();

    const today = useRecoilValue(todayState);

    const [curr, setCurr] = useRecoilState(targetStateState);
    const setView = useSetRecoilState(viewState);

    const {
        fullYear
    } = curr;

    return (<>
            {weekDates.map((w: number) => <StyledWeek key={`week_${w}`}>
                <StyledNumWrap>
                    <Num onClick={() => {
                        useChangeDate({
                            currMonth,
                            currYear : fullYear,
                            currDate: w,
                            setCurr,
                            setView,
                            router
                        });
                    }}
                         isToday={isTodayValue(today, fullYear, currMonth, +w)}>{w}</Num>
                </StyledNumWrap>
                <TimelineComponent fullYear={fullYear}
                                   month={currMonth}
                                   date={+w}
                                   isToday={isTodayValue(today, fullYear, currMonth, +w)}/>
            </StyledWeek>)}
        </>
    );
};

const StyledWeek = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: var(--light-gray-color);
  }

  &:nth-child(7) {
    &:after {
      display: none;
    }
  }

  button {
    font-size: var(--default-font);
  }
`;

const StyledNumWrap = styled.span`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 35px;
  width: 100%;
  background-color: var(--white-color-80);
  z-index: 1;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .8) 100%);
    pointer-events: none;
  }
`;