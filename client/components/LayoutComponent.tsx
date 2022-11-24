import {ReactNode, useState} from 'react';

import {useRouter} from 'next/router';

import styled from 'styled-components';

import {useRecoilState, useSetRecoilState} from 'recoil';
import {targetStateState, todayState, viewState} from '../recoil/atoms';

import {useIsomorphicEffect} from '../hooks/useIsomorphicEffect';

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
    const [today, setToday] = useRecoilState(todayState);
    const setView = useSetRecoilState(viewState);
    const setCurr = useSetRecoilState(targetStateState);

    const isomorphicEffect = useIsomorphicEffect();

    const isInitPath = router.asPath === '/' || null;
    const initDate: Date = new Date();

    isomorphicEffect(() => {
        setLoading(true);
        setToday(initDate);
        setView({type: isInitPath ? 'month' : router.asPath.replace(/\//, '')});
    }, []);

    isomorphicEffect(() => {
        if (!today) {
            return;
        }

        setCurr(today);
    }, [today, setToday]);

    return (
        <>
            {!loading && <Icon iconType="loading"/>}
            {(loading && today) && <>
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
  
  > button {
    opacity: .7;
  }
`;