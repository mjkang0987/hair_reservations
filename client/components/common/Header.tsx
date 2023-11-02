import React from 'react';

import {
    useRecoilState,
    useRecoilValue
} from 'recoil';

import styled from 'styled-components';

import {
    asideState,
    routerState
} from '../../recoil/atoms';

import {useToggleModal} from '../../hooks/useCloseModal';

import {CalendarDirection} from './CalendarDirection';
import {CalendarHeading} from './CalendarHeading';
import {Icon} from './Icons';
import {ButtonText} from './ButtonText';

export const HeaderComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);
    const curr = useRecoilValue(targetState);

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
            {curr && <CalendarDirection/>}
            {curr && <CalendarHeading/>}
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
