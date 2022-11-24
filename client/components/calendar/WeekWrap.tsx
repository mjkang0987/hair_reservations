import styled from 'styled-components';
import {Num} from './Num';

interface WeekType {
    weekLastDay:number;
    week: Function;
}

export const WeekWrapComponent = ({
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
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -150px;
    width: 100vw;
    height: 1px;
    background-color: var(--defaultLightGray);
  }
`;

const Week = styled.li`
  text-align: center;
  padding: 5px;
  border-right: 1px solid var(--defaultLightGray);

  &:nth-child(7) {
    border-right: none;
  }
`;
