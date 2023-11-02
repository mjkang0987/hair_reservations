import type {
    NextPage
} from 'next';

import Head from 'next/head';

import {
    useRecoilValue,
} from 'recoil';

import styled from 'styled-components';

import {
    asideState,
    targetStateState,
} from '../recoil/atoms';

import {CalendarComponent} from '../components/calendar/CalendarWrap';

interface Props {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

const Home: NextPage = ({
    reservations
}: any) => {
    const aside = useRecoilValue(asideState);
    const curr = useRecoilValue(targetStateState);

    return (<>
            <Head>
                <title>RESERVATION</title>
            </Head>
            <StyledSection isVisible={aside.isVisible}
                           isTransitionEnd={aside.isTransitionEnd}>
                {curr && <CalendarComponent/>}
            </StyledSection>
        </>
    );
};

export default Home;

const StyledSection = styled.section <Props>`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: solid var(--light-gray-color) ${props => props.isVisible ? `1px` : 0};
`;

const StyledButton = styled.button <{ isVisible: boolean }>`
  display: inline-flex;
  position: absolute;
  top: 10px;
  left: 15px;
  align-items: center;
  justify-content: center;
  width: ${props => props.isVisible
                    ? '189px'
                    : 'auto'};
  max-width: calc(80% - 30px);
  height: 35px;
  border: 1px solid #ccc;
  background-color: ${props => props.isVisible
                               ? 'var(--white-color)'
                               : 'rgb(255 255 255 / .6)'};
  border-radius: ${props => props.isVisible
                            ? '5px'
                            : '20px'};
  box-shadow: ${props => props.isVisible
                         ? '0 0 10px 0 rgba(0, 0, 0, .1)'
                         : '0 0 10px 0 rgba(0, 0, 0, .2)'};
  font-size: var(--small-font);
  z-index: 3;
  transition: box-shadow .1s ease-in-out;

  &:hover {
    ${props => !props.isVisible && `
      box-shadow:  0 0 15px 0 rgba(0, 0, 0, .4);
    `}
  }
`;

export const getStaticProps = (async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    const reservations = await res.json() || {};

    return {
        props: {
            reservations,
        }
    };
});