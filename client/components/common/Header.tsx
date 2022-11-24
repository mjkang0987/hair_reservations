import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';

import styled from 'styled-components';

import {
    asideState,
    targetState,
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {A11Y_DIRECTION, ASIDE} from '../../utils/constants';

import {Icon} from './Icons';
import {ButtonText} from './ButtonText';
import {ButtonCircle, ButtonSquare} from './Buttons';

export const HeaderComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);

    const today = useRecoilValue(todayState);

    const view = useRecoilValue(viewState);
    const {type} = view;

    const curr = useRecoilValue(targetState);
    const {full, fullYear, month, date, day} = curr;

    const setCurr = useSetRecoilState(targetStateState);

    const controller = ({direction}: {direction: string}) => {
        if (!direction) {
            return;
        }

        const isPrev = direction === 'prev';
        const isDate = Object.keys(ASIDE).slice(0, 3).find((aside) => aside.toLowerCase() === type);

        if (type === 'year') {
            return setCurr(`${Number(fullYear) - (isPrev ? 1 : -1)}, ${Number(month) + 1}, ${Number(date)}`);
        }

        if (type === 'month') {
            const temporary = new Date(`${Number(fullYear)}, ${Number(month) + 1}, ${Number(date)}`);
            return setCurr(new Date(temporary.setMonth(Number(month) - (isPrev ? 1 : -1))));
        }

        if (isDate) {
            if (!type) {
                return;
            }

            const move = Number(ASIDE[type.toUpperCase()].move);

            const temporary = new Date(`${Number(fullYear)}, ${Number(month) + 1}, ${Number(date)}`);
            return setCurr(new Date(temporary.setDate(Number(date) - (isPrev ? move : -move) - (type === 'week' ? Number(day) : 0))));
        }
    }

    return (
        <Header>
            <Button type="button" onClick={() => setAside({
                isVisible: !aside.isVisible,
                isTransitionEnd: false
            })}>
                <Icon iconType="hamburger"/>
                <ButtonText a11y={true}>보기 옵션 {aside.isVisible ? '닫기' : '열기'}</ButtonText>
            </Button>
            <ButtonWrap>
                <ButtonSquare onClick={() => setCurr(today)}>
                    <ButtonText a11y={false}>오늘</ButtonText>
                </ButtonSquare>
                <ButtonCircle onClick={() => controller({direction: 'prev'})}>
                    <Icon iconType="leftArrow"/>
                    {type && <ButtonText a11y={true}>이전{A11Y_DIRECTION[type]}</ButtonText>}
                </ButtonCircle>
                <ButtonCircle onClick={() => controller({direction: 'next'})}>
                    <Icon iconType="rightArrow"/>
                    {type && <ButtonText a11y={true}>다음{A11Y_DIRECTION[type]}</ButtonText>}
                </ButtonCircle>
            </ButtonWrap>
            <Heading>
                {full && <DateWrap>
                    <Date>{full.getFullYear()}</Date>
                    {view.type !== 'year' && <Date>{full.getMonth() + 1}</Date>}
                    {(view.type === 'day' || view.type === 'three') && <Date>{full.getDate()}</Date>}
                </DateWrap>}
            </Heading>
        </Header>
    );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 8px 15px 7px;
  box-sizing: border-box;
  border-bottom: solid 1px var(--defaultLightGray);
`;

const Heading = styled.h1`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateWrap = styled.span`
  display: inline-flex;
  align-items: center;
`;

const Date = styled.span`
  display: inline-flex;
  font-size: 26px;
  
  + span {
    &:before {
      content: "/";
      display: inline-flex;
      position: relative;
      margin: 0 4px;
    }
  }
`;

const Unit = styled.span`
  display: inline-flex;
  margin: 0 10px;
  font-size: 22px;
`;

const ButtonWrap = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  button {
    &:first-child {
      margin-right: 40px;
    }
  }
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #fff;
  border: none;

  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }
`;
