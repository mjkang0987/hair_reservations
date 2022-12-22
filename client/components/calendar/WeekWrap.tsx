import {useRouter} from "next/router";

import styled from 'styled-components';

import {useRecoilState, useSetRecoilState} from "recoil";
import {targetStateState, viewState} from "../../recoil/atoms";

import {Num} from './Num';

interface WeekType {
    type: string;
}

export const WeekWrapComponent = ({
    type
}: WeekType) => {
    const router = useRouter();

    const [curr, setCurr] = useRecoilState(targetStateState);
    const setView = useSetRecoilState(viewState);

    const {
        fullYear,
        month,
        date,
        weekLastDay,
        monthLastNumber,
    } = curr;

    const setDate = ({currentDate}: {currentDate: string | number}) => {
        setCurr(new Date(fullYear, month, Number(currentDate)));
        setView({type: 'day'});

        router.push('/day');
    };

    return (<Weeks>
            {curr[type]().map((w: string, index: number) => <Week key={`week_${index}`}>
                <Num onClick={() => setDate({currentDate: w})}>{w}</Num>
            </Week>)}
            {(type === 'week' && (weekLastDay < 6)) && new Array(6 - weekLastDay).fill(null).map((_, index) => <Week key={`next_${index}`}>
                <Num onClick={() => setDate({currentDate: index + 1})}>{index + 1}</Num>
            </Week>)}
            {(type === 'three' && (monthLastNumber <= date + 2)) && new Array((monthLastNumber - date === 0 ? 2 : monthLastNumber - date)).fill(null).map((_, index) => <Week key={`next_${index}`}>
                <Num onClick={() => setDate({currentDate: index + 1})}>{index + 1}</Num>
            </Week>)}
    </Weeks>
    );
};

const Weeks = styled.ul`
  flex: 1;
  position: relative;
  display: grid;
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
