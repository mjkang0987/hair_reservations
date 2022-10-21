import {useRecoilState} from 'recoil';

import styled from 'styled-components';

import {asideState} from '../../recoil/atoms';

import {Icon} from './Icons';
import {ButtonText} from './ButtonText';

export const HeaderComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);

    return (
        <Header>
            <Button type="button"
                    onClick={() => setAside({
                        isVisible: !aside.isVisible,
                        isTransitionEnd: false
                    })}>
                <Icon iconType="hamburger"/>
                <ButtonText a11y={true}>보기 옵션 {aside.isVisible ? '닫기' : '열기'}</ButtonText>
            </Button>
            <h1>타이틀</h1>
        </Header>
    );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 15px;
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