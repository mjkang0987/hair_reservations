import React from 'react';

import {useRouter} from 'next/router';

import {
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

import styled from 'styled-components';

import {
    targetState,
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {
    A11Y_DIRECTION,
    ASIDE,
    setRouter,
    ViewType
} from '../../utils/constants';

import {Icon} from '../common/Icons';
import {ButtonText} from '../common/ButtonText';
import {
    ButtonCircle,
    ButtonSquare
} from '../common/Buttons';

export const CalendarDirection = () => {
    const router = useRouter();

    const today = useRecoilValue(todayState);

    const view = useRecoilValue(viewState);
    const {type} = view;

    const currValue = useRecoilValue(targetState);
    const {fullYear, month, date, day} = currValue;

    const setUpdateCurr = useSetRecoilState(targetStateState);

    const handlerView = {
        yearView(isPrev: boolean) {
            setRouter({
                type,
                year : +fullYear - (isPrev ? 1 : -1),
                month: +month + 1,
                date : +date,
                router
            });

            return setUpdateCurr(`${+fullYear - (isPrev
                                                 ? 1
                                                 : -1)}, ${+month + 1}, ${+date}`);
        },
        monthView(isPrev: boolean) {
            const temporary = new Date(`${+fullYear}, ${+month + 1}, 1`);
            const currentDate = new Date(temporary.setMonth(+month - (isPrev
                                                                      ? 1
                                                                      : -1)));

            setRouter({
                type,
                year : currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                date : currentDate.getDate(),
                router
            });

            return setUpdateCurr(currentDate);
        },
        dayView(isPrev: boolean) {
            const move = Number(ASIDE[type.toUpperCase()].move);
            const temporary = new Date(`${+fullYear}, ${+month + 1}, ${+date}`);
            const currentDate = new Date(temporary.setDate(+date - (isPrev ? move : -move) - (type === 'week' ? +day : 0)));

            setRouter({
                type,
                year : currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                date : currentDate.getDate(),
                router
            });

            return setUpdateCurr(currentDate);
        }
    };

    const controller = ({direction}: { direction: string }) => {
        if (!direction) {
            return;
        }

        const isPrev = direction === 'prev';
        const isDate = ASIDE.hasOwnProperty(type.toUpperCase());

        if (type === ViewType.Year) {
            handlerView.yearView(isPrev);
        }

        if (type === ViewType.Month) {
            handlerView.monthView(isPrev);
        }

        if (isDate) {
            handlerView.dayView(isPrev);
        }
    };

    return (<StyledButtonWrap>
            <ButtonSquare onClick={() => {
                setUpdateCurr(today);
                setRouter({
                    type,
                    year : today.getFullYear(),
                    month: today.getMonth() + 1,
                    date : today.getDate(),
                    router
                });
            }}>
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
        </StyledButtonWrap>
    );
};

const StyledButtonWrap = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  button {
    &:first-child {
      margin-right: 40px;
    }
  }
`;
