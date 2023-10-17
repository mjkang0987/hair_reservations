import styled from 'styled-components';

import {
    ViewType,
    DAYS
} from '../../utils/constants';

import {useRecoilValue} from 'recoil';

import {
    targetStateState,
    viewState
} from '../../recoil/atoms';

import {WeekWrapComponent} from './WeekWrap';

interface DaysType {
    type: string | null;
}

export const DaysComponent = ()  => {
    const target = useRecoilValue(targetStateState);
    const {
        day,
    } = target;

    const view = useRecoilValue(viewState);
    const {type} = view;

    const daysArr = () => {
        const result = Object.keys(DAYS).slice(type === ViewType.Three ? Number(day) : 0, type === ViewType.Three ? Number(day) + 3 : 7);

        if (result.length < 3) {
            return new Array(3 - result.length).fill(null).reduce((acc, curr, i) => {
                return [...acc, Object.keys(DAYS)[i]];
            }, [...result]);
        }

        return result;
    }

    return (
        <StyledDaysWrap type={type}>
            {type !== ViewType.Day && <StyledDays>
                {daysArr().map((day: string) =>
                    <Day key={DAYS[day].id} type={type}>
                        {DAYS[day].ko}
                    </Day>)}
            </StyledDays>}
            {(type === ViewType.Week || type === ViewType.Three) && <WeekWrapComponent type={type} />}
        </StyledDaysWrap>
    );
};

const StyledDaysWrap = styled.div <DaysType>`
  width: 100%;
  ${props => props.type !== 'month' && `
    padding-left: 150px;
    box-sizing: border-box;
  `}

  ul {
    grid-template-columns: repeat(${props => props.type === ViewType.Three ? 3 : 7}, 1fr);
  }
`;

const StyledDays = styled.ul`
  display: grid;
  justify-content: center;
  width: 100%;
`;

const Day = styled.li <DaysType>`
  flex: 1;
  text-align: center;
  padding: 10px 0 5px;
  font-size: var(--defaultSmallFont);
  color: var(--defaultBlack);
  border-right: 1px solid var(--defaultLightGray);
  box-sizing: border-box;
  ${props => props.type !== 'month' && `
    border: none;
  `};
  
  &:nth-child(7) {
    border-right: none;
  }
`;