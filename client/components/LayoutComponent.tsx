import {ReactNode, useState} from 'react';

import styled from 'styled-components';

import {useRecoilState, useSetRecoilState} from 'recoil';

import {useIsomorphicEffect} from '../hooks/useIsomorphicEffect';
import {useChangeDateBridge} from '../hooks/useChangeDate';
import {currentDate, todayDate} from '../recoil/atoms';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';
import {Icon} from './common/Icons';
import {useCangeDateBridge} from '../hooks/useChangeDate';

type LayoutProps = {
    children: ReactNode
};

export default function LayoutComponent({children}: LayoutProps) {
    const [loading, setLoading] = useState(false);
    const [today, setToday] = useRecoilState(todayDate);

    const isomorphicEffect = useIsomorphicEffect();
    const changeDate = useChangeDateBridge();

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