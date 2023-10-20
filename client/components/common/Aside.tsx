import React from 'react';

import Link from 'next/link';

import {useRecoilState, useSetRecoilState} from 'recoil';

import styled from 'styled-components';

import {asideState, targetStateState, viewState} from '../../recoil/atoms';

import {ASIDE as asides} from '../../utils/constants';

import {InputWrap} from './Input';

interface Props {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

export const AsideComponent = () => {
    const [aside, setAside] = useRecoilState(asideState);
    const setView = useSetRecoilState(viewState);

    const [curr, setCurr] = useRecoilState(targetStateState);

    const setChangeView = ({view}: { view: string }) => {
        const {
            fullYear,
            month,
            date,
            day
        } = curr;

        setAside({
            ...aside,
            isVisible: !aside.isVisible
        });
        setView({type: view.toLowerCase()});

        if (view === 'WEEK') {
            setCurr(new Date(fullYear, month, date - day));
        }
    };

    return (<StyledAside isVisible={aside.isVisible}
               isTransitionEnd={aside.isTransitionEnd}
                         className={!aside.isTransitionEnd
                                    ? 'animate'
                                    : ''}
               onAnimationEnd={() => {
                   setAside({
                       ...aside,
                       isTransitionEnd: true
                   });
               }}>
            {curr && Object.keys(asides).map((a) =>
                <Link href={`/`}
                      as={`/${a.toLowerCase()}`}
                      key={asides[a].id}
                      onClick={() => setChangeView({view: a})}>
                    <StyledLinkStyle>{asides[a].title}</StyledLinkStyle>
                </Link>
            )}
            <InputWrap inputIcon="search">
                <input type="text" placeholder="사용자 검색"/>
            </InputWrap>
            <Link href="/addressBook" passHref>주소록</Link>
        </StyledAside>
    );
};

const StyledAside = styled.aside <Props>`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${props => (!props.isVisible && props.isTransitionEnd) && 'display: none'};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  max-width: 80%;
  padding: 60px 15px 0;
  border-right: solid 1px var(--light-gray-color);
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 10px 0 10px 0 rgba(0 0 0 / .1);
  z-index: 1;
  
  &.animate {
      animation-name: asideHide;
      animation-duration: .4s;
      animation-timing-function: ease-in-out;
      animation-direction: ${props => props.isVisible ? 'reverse' : 'normal'};
      animation-fill-mode: forward;
  }
`;

const StyledLinkStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  background-color: var(--white-color);
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
`;