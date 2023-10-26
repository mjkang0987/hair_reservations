import React from 'react';

import {useRouter} from 'next/router';

import {
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import styled from 'styled-components';

import {
    asideState,
    targetState,
    targetStateState,
    viewState
} from '../../recoil/atoms';

import {
    ViewType
} from '../../utils/constants';

import {useToggleModal} from '../../hooks/useCloseModal';

import {CalendarDirection} from './CalendarDirection';
import {Icon} from './Icons';
import {ButtonText} from './ButtonText';

export const HeaderComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);

    const view = useRecoilValue(viewState);
    const {type} = view;

    const curr = useRecoilValue(targetState);
    const {full, fullYear, month, date, day} = curr;

    const [updateCurr, setUpdateCurr] = useRecoilState(targetStateState);

    const setMonth = () => {
        if (type === ViewType.Day || type === ViewType.Month) {
            return Number(month) + 1;
        }

        if (Number(date) + (type === ViewType.Week ? 6 : 2) > updateCurr?.monthLastNumber) {
            const calcYear = month === 11 ? `${Number(fullYear) + 1} / 1` : Number(month) + 2;
            return `${Number(month) + 1} - ${calcYear}`;
        }

        return `${Number(month) + 1}`;
    }

    return (
        <StyledHeader>
            <StyledButton type="button" onClick={(event: React.MouseEvent) => useToggleModal({
                event,
                setAside,
                isVisible: !aside.isVisible,
                isTransitionEnd: false
            })}>
                <Icon iconType="hamburger"/>
                <ButtonText a11y={true}>보기 옵션 {aside.isVisible ? '닫기' : '열기'}</ButtonText>
            </StyledButton>
            <CalendarDirection/>
            <StyledHeading>
                {full && <StyledDateWrap>
                    <StyledDateElement>{Number(fullYear)}</StyledDateElement>
                    {type !== ViewType.Year && <StyledDateElement>
                        {setMonth()}
                    </StyledDateElement>}
                    {type === ViewType.Day && <StyledDateElement>{Number(date)}</StyledDateElement>}
                </StyledDateWrap>}
            </StyledHeading>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 8px 15px 7px;
  box-sizing: border-box;
  border-bottom: solid 1px var(--light-gray-color);
`;

const StyledHeading = styled.h1`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDateWrap = styled.span`
  display: inline-flex;
  align-items: center;
`;

const StyledDateElement = styled.span`
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

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #fff;
  border: none;

  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }
`;
