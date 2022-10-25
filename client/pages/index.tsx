import type {NextPage} from 'next';

import Head from 'next/head';

import {useRecoilState} from 'recoil';

import styled from 'styled-components';

import {asideState} from '../recoil/atoms';

import {Icon} from '../components/common/Icons';
import {ButtonText} from '../components/common/ButtonText';
import {Calendar} from '../components/calendar/Calendar';

interface Props {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

const Home: NextPage = () => {
    const [aside, setAside] = useRecoilState(asideState);

    return (<>
            <Head>
                <title>RESERVATION</title>
            </Head>
            <Button type="button"
                    isVisible={aside.isVisible}>
                <Icon iconType="plus"/>
                {aside.isVisible && <ButtonText a11y={false}>일정추가</ButtonText>}
            </Button>
            <Section isVisible={aside.isVisible}
                     isTransitionEnd={aside.isTransitionEnd}>
                <Calendar/>
            </Section>
        </>
    );
};

export default Home;

const Section = styled.section <Props>`
  flex: 1;
  display: flex;
  height: 100%;
  ${props => props.isVisible && `
  `}
`;

const Button = styled.button <{isVisible: boolean}>`
  display: inline-flex;
  position: absolute;
  top: 70px;
  left: 15px;
  align-items: center;
  justify-content: center;
  width: ${props => props.isVisible ? '170px' : 'auto'};
  height: 40px;
  border: 1px solid #ccc;
  background-color: var(--defaultWhite);
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
`;