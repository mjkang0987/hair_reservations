import React from 'react';

import type {NextPage} from 'next';
import Head from 'next/head';

import {useRecoilValue} from 'recoil';

import styled from 'styled-components';

import {asideState, targetStateState} from '../recoil/atoms';

import {Icon} from '../components/common/Icons';
import {ButtonText} from '../components/common/ButtonText';
import {CalendarComponent} from '../components/calendar/CalendarWrap';

interface Props {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

const Home: NextPage = () => {
    const aside = useRecoilValue(asideState);
    const target = useRecoilValue(targetStateState);
    return (<>
            <Head>
                <title>RESERVATION</title>
            </Head>
            <ButtonUI type="button"
                    isVisible={aside.isVisible}>
                <Icon iconType="plus"/>
                {aside.isVisible && <ButtonText a11y={false}>일정추가</ButtonText>}
            </ButtonUI>
            <SectionUI isVisible={aside.isVisible}
                     isTransitionEnd={aside.isTransitionEnd}>
                {target && <CalendarComponent/>}
            </SectionUI>
        </>
    );
};

export default Home;

const SectionUI = styled.section <Props>`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: solid var(--defaultLightGray) ${props => props.isVisible ? `1px` : 0};
`;

const ButtonUI = styled.button <{isVisible: boolean}>`
  display: inline-flex;
  position: absolute;
  top: 10px;
  left: 15px;
  align-items: center;
  justify-content: center;
  width: ${props => props.isVisible ? '219px' : 'auto'};
  max-width: calc(80% - 30px);
  height: 40px;
  border: 1px solid #ccc;
  background-color: ${props => props.isVisible ? 'var(--defaultWhite)' : 'rgb(255 255 255 / .6)'};
  border-radius: ${props => props.isVisible ? '5px' : '20px'};
  box-shadow: ${props => props.isVisible ? '0 0 10px 0 rgba(0, 0, 0, .1)' : '0 0 10px 0 rgba(0, 0, 0, .2)'};
  z-index: 1;
  transition: box-shadow .1s ease-in-out;
  
  &:hover {
    ${props => !props.isVisible && `
      box-shadow:  0 0 15px 0 rgba(0, 0, 0, .4);
    `}
  }
`;