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

export const getStaticProps = (async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    const reservations = await res.json() || {};

    return {
        props: {
            reservations,
        }
    };
});