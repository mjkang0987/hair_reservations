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

    const initDate: Date = new Date();

    isomorphicEffect(() => {

        setToday({
            full: initDate
        });

        setLoading(true);
    }, []);

    isomorphicEffect(() => {
        const {full} = today;

        if (!full) {
            return;
        }

        const currentLastDate = new Date(full.getFullYear(), full.getMonth() + 1, 0);
        const currentFirstDate = new Date(full.getFullYear(), full.getMonth(), 1);
        const prevLastDate = new Date(full.getFullYear(), full.getMonth(), 0);

        setCurrentDate({
            ...today,
            firstDay: currentFirstDate.getDay(),
            lastDay: currentLastDate.getDay(),
            lastDate: currentLastDate.getDate(),
            prevLastDate: prevLastDate.getDate(),
        });
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
`;