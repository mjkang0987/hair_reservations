import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {targetStateState} from '../../recoil/atoms';

import {DAYS} from '../../utils/constants';

import {WeekWrapComponent} from './WeekWrap';

interface DaysType {
    type: string;
}

export const DaysComponent = ({type}: DaysType)  => {
    const target = useRecoilValue(targetStateState);
    const {
        weekLastDay,
        week
    } = target;
    return (
        <DaysWrap type={type}>
            <Days>
                {Object.keys(DAYS).map((day =>
                    <Day key={DAYS[day].id} type={type}>
                        {DAYS[day].ko}
                    </Day>))}
            </Days>
            {type === 'week' &&
                <WeekWrapComponent weekLastDay={weekLastDay} week={week}/>}
        </DaysWrap>
    );
};

const DaysWrap = styled.div <DaysType>`
  width: 100%;
  ${props => props.type !== 'month' && `
    padding-left: 149px;
    box-sizing: border-box;
  `}
`;

const Days = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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