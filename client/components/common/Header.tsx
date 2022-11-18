import {useRecoilState, useRecoilValue} from 'recoil';

import styled from 'styled-components';

import {asideState, viewState} from '../../recoil/atoms';

import {A11Y_DIRECTION} from '../../utils/constants';

import {Icon} from './Icons';
import {ButtonText} from './ButtonText';
import {ButtonCircle, ButtonSquare} from './Buttons';
import {useChangeDateBridge} from '../../hooks/useChangeDate';

export const HeaderComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);

    const view = useRecoilValue(viewState);

    const changeDate = useChangeDateBridge();
    const {current} = changeDate;
    const {full} = current;

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
                <ButtonSquare>
                    <ButtonText a11y={false}>오늘</ButtonText>
                </ButtonSquare>
                <ButtonCircle onClick={() => changeDate.changeBridge({direction: 'prev'})}>
                    <Icon iconType="leftArrow"/>
                    <ButtonText a11y={true}>이전{A11Y_DIRECTION[view.type]}</ButtonText>
                </ButtonCircle>
                <ButtonCircle onClick={() => changeDate.changeBridge({direction: 'next'})}>
                    <Icon iconType="rightArrow"/>
                    <ButtonText a11y={true}>다음{A11Y_DIRECTION[view.type]}</ButtonText>
                </ButtonCircle>
            </ButtonWrap>
            <Heading>
                {full && <DateWrap>
                    <Date>{full.getFullYear()}</Date><Unit>/</Unit>
                    <Date>{full.getMonth() + 1}</Date>
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
