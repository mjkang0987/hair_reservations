import styled from 'styled-components';
import {Num} from './Num';

interface WeekType {
    weekFirstDay: number;
    monthPrevLastNumber: number;
    weekLastDay:number;
    week: Function;
}

export const WeekWrapComponent = ({
    weekFirstDay,
    monthPrevLastNumber,
    weekLastDay,
    week
}: WeekType) => {
    return (<Weeks>
            {week().map((w: string, index: number) => <Week key={`week_${index}`}>
                <Num>{w}</Num>
            </Week>)}
            {(weekLastDay < 6) && new Array(6 - weekLastDay).fill(null).map((_, index) => <Week key={`prev_${index}`}>
                <Num>{index + 1}</Num>
            </Week>)}
    </Weeks>
    );
};

const Weeks = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  height: 100%;
`;

const Week = styled.li`
  text-align: center;
  padding: 5px;
  border-right: 1px solid var(--defaultLightGray);
  border-top: 1px solid var(--defaultLightGray);

  &:nth-child(7) {
    border-right: none;
  }
`;
