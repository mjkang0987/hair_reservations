import Link from 'next/link';

import {useRecoilState} from 'recoil';

import styled from 'styled-components';

import {asideState} from '../../recoil/atoms';

import {ASIDE as asides} from '../../utils/constants';

import {ButtonText} from './ButtonText';
import {InputWrap} from './Input';

interface Props {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

export const AsideComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);

    return (
        <Aside isVisible={aside.isVisible}
               isTransitionEnd={aside.isTransitionEnd}
               className={!aside.isTransitionEnd ? 'animate' : ''}
               onAnimationEnd={() => {
                   setAside({
                       ...aside,
                       isTransitionEnd: true
                   });
               }}>
            {Object.keys(asides).map((a) =>
                <Button key={asides[a].id} type="button">
                    <ButtonText a11y={false}>
                        {asides[a].title}
                    </ButtonText>
                </Button>
            )}
            <InputWrap inputIcon="search">
                <input type="text" placeholder="사용자 검색"/>
            </InputWrap>
            <Link href="/addressBook" passHref>주소록</Link>
        </Aside>
    );
};

const Aside = styled.aside <Props>`
  flex-shrink: 0;
  display: flex;
  ${props => (!props.isVisible && props.isTransitionEnd) && 'display: none'};
  width: 200px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 10px;
  padding: 60px 15px 0;
  
  &.animate {
      animation-name: asideHide;
      animation-duration: .4s;
      animation-timing-function: ease-in-out;
      animation-direction: ${props => props.isVisible ? 'reverse' : 'normal'};
      animation-fill-mode: forward;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  background-color: var(--defaultWhite);
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
`;