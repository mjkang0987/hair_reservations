import {ReactNode, useState} from 'react';

import styled from 'styled-components';

import {useRecoilState, useSetRecoilState} from 'recoil';

import {useIsomorphicEffect} from '../hooks/useIsomorphicEffect';

import {currentDate, todayDate} from '../recoil/atoms';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';
import {Icon} from './common/Icons';

type LayoutProps = {
    children: ReactNode
};

export default function LayoutComponent({children}: LayoutProps) {
    const [loading, setLoading] = useState(false);

    const [today, setToday] = useRecoilState(todayDate);
    const setCurrentDate = useSetRecoilState(currentDate);

    const isomorphicEffect = useIsomorphicEffect();

    isomorphicEffect(() => {
        const getToday = new Date();

        setToday({
            year: getToday.getFullYear(),
            month: getToday.getMonth(),
            date: getToday.getDate(),
            day: getToday.getDay(),
        });

        setLoading(true);
    }, []);

    isomorphicEffect(() => {
        setCurrentDate({
            ...today
        });
    }, [today])

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
`;