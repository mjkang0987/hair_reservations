import {useRecoilValue} from 'recoil';

import {currentDate} from '../../recoil/atoms';
import styled from 'styled-components';

interface Props {
    prevDates?: [];
    nextDates?: [];
}

export const DatesComponent = ({prevDates, nextDates}: Props) => {
    const current = useRecoilValue(currentDate);

    const {firstDay, lastDay, lastDate, prevLastDate} = current;
    console.log(lastDay)

    return (
        <CalendarWrap>
            <DateWrap>
                {Number(firstDay) < 7 && new Array(firstDay).fill(null).map((_, index) => <Date>
                    {Number(prevLastDate) - index}
                </Date>).reverse()}
                {new Array(lastDate).fill(null).map((_, index) =>
                <Date key={index}>{index + 1}</Date>)}
                {Number(lastDay) < 6 && new Array(6 - Number(lastDay)).fill(null).map((_, index) => <Date>
                    {index + 1}
                </Date>)}
            </DateWrap>
        </CalendarWrap>
    );
};

const CalendarWrap = styled.div`
  flex: 1;
`;

const DateWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  height: 100%;
`;

const Date = styled.li`
  padding: 5px;
  text-align: center;
  font-size: var(--defaultSmallFont);
  color: var(--defaultBlack);
  border-right: 1px solid var(--defaultLightGray);
  border-top: 1px solid var(--defaultLightGray);
  
  &:nth-child(7n) {
    border-right: none;
  }
  
  &:nth-child(-n+7) {
    border-top: none;
  }
`
