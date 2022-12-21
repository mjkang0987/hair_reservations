import styled from 'styled-components';

import {useRecoilValue} from "recoil";
import {targetStateState} from "../../recoil/atoms";

import {Num} from './Num';

interface WeekType {
    type: string;
}

export const WeekWrapComponent = ({
    type
}: WeekType) => {
    const target = useRecoilValue(targetStateState);
    const {
        date,
        weekLastDay,
        monthLastNumber,
    } = target;

    return (<Weeks>
            {target[type]().map((w: string, index: number) => <Week key={`week_${index}`}>
                <Num>{w}</Num>
            </Week>)}
            {(type === 'week' && (weekLastDay < 6)) && new Array(6 - weekLastDay).fill(null).map((_, index) => <Week key={`next_${index}`}>
                <Num>{index + 1}</Num>
            </Week>)}
            {(type === 'three' && (monthLastNumber < date + 2)) && new Array((monthLastNumber - date)).fill(null).map((_, index) => <Week key={`next_${index}`}>
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
