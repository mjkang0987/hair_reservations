import {ReactNode, useState} from 'react';

import {useRouter} from 'next/router';

import styled from 'styled-components';

import {useRecoilState, useSetRecoilState} from 'recoil';
import {todayDate, viewState} from '../recoil/atoms';

import {useIsomorphicEffect} from '../hooks/useIsomorphicEffect';
import {useChangeDateBridge} from '../hooks/useChangeDate';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';
import {Icon} from './common/Icons';

type LayoutProps = {
    children: ReactNode
};

export default function LayoutComponent({children}: LayoutProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [today, setToday] = useRecoilState(todayDate);
    const setView = useSetRecoilState(viewState);

    const isomorphicEffect = useIsomorphicEffect();
    const changeDate = useChangeDateBridge();

    const isInitPath = router.asPath === '/';
    const initDate: Date = new Date();

    isomorphicEffect(() => {
        setLoading(true);

        setToday(initDate);

        setView({type: isInitPath ? 'month' : router.asPath.replace(/\//, '')});
    }, []);

    isomorphicEffect(() => {
        const {full} = today;
            return;
        }

        changeDate.setDate({targetDate: new Date(full)});
    }, [today]);

    return (
        <>
            {!loading && <Icon iconType="loading"/>}
            {loading && <>
                <HeaderComponent/>
                <Main>
                    <AsideComponent/>
                    {children}
                </Main>
                <FooterComponent/>
            </>}
        </>
    );
}

const Main = styled.main`
  flex: 1;
  display: flex;
  height: 100%;
  position: relative;
`;