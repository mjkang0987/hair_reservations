import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {currentDate, todayDate} from '../../recoil/atoms';

interface DateType {
    isToday: boolean;
    isCurrentMonth: boolean;
}
export const DateWrpComponent = ({isToday}: DateType) => {
    const today = useRecoilValue(todayDate);
    const current = useRecoilValue(currentDate);

    const {firstDay, lastDay, lastDate, prevLastDate} = current;

    return (<DateWrap>
                {Number(firstDay) < 7 && new Array(firstDay).fill(null).map((_, index) => <Date key={`prev_${index}`}>
                    <Num className="disabled">{Number(prevLastDate) - index}</Num>
                </Date>).reverse()}

                {new Array(lastDate).fill(null).map((_, index) => <Date key={`curr_${index}`}>
                    <Num isToday={isToday && index + 1 === today.getDate()}>{index + 1}</Num>
                </Date>)}

                {Number(lastDay) < 6 && new Array(6 - Number(lastDay)).fill(null).map((_, index) => <Date key={`next_${index}`}>
                    <Num className="disabled">{index + 1}</Num>
                </Date>)}
            </DateWrap>
    );
};

const DateWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  height: 100%;
`;

const Date = styled.li`
  padding: 5px;
  text-align: center;
  border-right: 1px solid var(--defaultLightGray);
  border-top: 1px solid var(--defaultLightGray);
  
  &:nth-child(7n) {
    border-right: none;
  }
  
  &:nth-child(-n+7) {
    border-top: none;
  }
`

interface NumProps {
    isToday?: boolean;
}

const Num = styled.button <NumProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: transparent;
  border: none;
  font-size: var(--defaultSmallFont);
  color: var(--defaultBlack);
  ${props => props.isToday && `
    background-color: var(--defaultBlue);
    color: #fff;
  `}
  
  &:hover {
    background-color: var(--defaultDarkGray);
    color: #fff;
  }
  
  &.disabled {
    color: var(--defaultLightGray);
  }
`;