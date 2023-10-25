import React, {
    useState
} from 'react';

import {useRouter} from 'next/router';

import styled from 'styled-components';

import {
    useRecoilState
} from 'recoil';

import {
    asideState,
    targetStateState,
    todayState,
    viewState
} from '../recoil/atoms';

import {useIsomorphicEffect} from '../hooks/useIsomorphicEffect';

import {
    useToggleModal
} from '../hooks/useCloseModal';

import {
    NodeType,
    setRouter,
    ViewType
} from '../utils/constants';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';
import {Icon} from './common/Icons';

export default function LayoutComponent({children}: NodeType) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [today, setToday] = useRecoilState(todayState);
    const [aside, setAside] = useRecoilState(asideState);
    const [view, setView] = useRecoilState(viewState);
    const [curr, setCurr] = useRecoilState(targetStateState);

    const isomorphicEffect = useIsomorphicEffect();

    const arrayPath = router.asPath.split('/');
    const isInitPath = arrayPath.length === 2;

    const initDate: Date = new Date();

    const closeModal = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'ASIDE' || target.tagName === 'INPUT') {
            return;
        }

        if (!aside.isVisible) {
            return;
        }

        useToggleModal({
            event          : e,
            setAside,
            isVisible      : !aside.isVisible,
            isTransitionEnd: false
        });
    };

    isomorphicEffect(() => {
        setLoading(true);
        setToday(initDate);

        setCurr(isInitPath ? initDate : new Date(Number(arrayPath[2]), Number(arrayPath[3]) - 1, (Number(arrayPath[4]) || 1)));
        setView({
            type: isInitPath
                  ? ViewType.Week
                  : arrayPath[1]
        });

        setRouter({
            type: isInitPath
                  ? ViewType.Week
                  : arrayPath[1],
            year: isInitPath ? initDate.getFullYear() : Number(arrayPath[2]),
            month: isInitPath ? initDate.getMonth() + 1 : Number(arrayPath[3]),
            date: isInitPath ? initDate.getDate() : (Number(arrayPath[4]) || 1),
            router
        });
    }, []);

    return (
        <StyledWrapper onClick={closeModal}>
            {!loading && <Icon iconType="loading"/>}
            {(loading && today) && <>
                <HeaderComponent/>
                <StyledMain>
                    {curr && <AsideComponent/>}
                    {children}
                </StyledMain>
                <FooterComponent/>
            </>}
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledMain = styled.main`
  flex: 1;
  overflow: hidden;
  display: flex;
  height: 100%;
  position: relative;
`;