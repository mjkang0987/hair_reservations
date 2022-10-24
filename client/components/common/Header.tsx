import {useRecoilState, useRecoilValue} from 'recoil';

import styled from 'styled-components';

import {asideState, currentDate} from '../../recoil/atoms';

import {Icon} from './Icons';
import {ButtonText} from './ButtonText';
import {ButtonCircle, ButtonSquare} from './Buttons';

export const HeaderComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);
    const current = useRecoilValue(currentDate);

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
                <ButtonCircle>
                    <Icon iconType="leftArrow"/>
                    <ButtonText a11y={true}>이전달</ButtonText>
                </ButtonCircle>
                <ButtonCircle>
                    <Icon iconType="rightArrow"/>
                    <ButtonText a11y={true}>이전달</ButtonText>
                </ButtonCircle>
            </ButtonWrap>
            <Heading>
                <DateWrap>
                    <Date>{current.year}</Date><Unit>/</Unit>
                    <Date>{Number(current.month) + 1}</Date>
                </DateWrap>
            </Heading>
        </Header>
    );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 8px 15px 7px;
  gap: 20px;
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

const ButtonToday = styled.button`
  
`;