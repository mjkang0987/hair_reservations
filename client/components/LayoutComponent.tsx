import React, {
    useState
} from 'react';

import {useRouter} from 'next/router';

import styled from 'styled-components';

import {
    useRecoilState,
    useSetRecoilState
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

import {NodeType} from '../utils/constants';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';
import {Icon} from './common/Icons';

export default function LayoutComponent({children}: NodeType) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [today, setToday] = useRecoilState(todayState);
    const [aside, setAside] = useRecoilState(asideState);
    const setView = useSetRecoilState(viewState);
    const setCurr = useSetRecoilState(targetStateState);

    const isomorphicEffect = useIsomorphicEffect();

    const isInitPath = router.asPath === '/' || null;
    const initDate: Date = new Date();

    isomorphicEffect(() => {
        setLoading(true);
        setToday(initDate);
        setView({
            type: isInitPath
                  ? 'month'
                  : router.asPath.replace(/\//, '')
        });
    }, []);

    isomorphicEffect(() => {
        if (!today) {
            return;
        }

        setCurr(today);
    }, [today, setToday]);

    const closeModal = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'ASIDE' || target.tagName === 'INPUT') {
            return;
        }

        if (!aside.isVisible) {
            return;
        }

        useToggleModal({
            event: e,
            setAside,
            isVisible: !aside.isVisible,
            isTransitionEnd: false
        });
    };

    return (
        <StyledWrapper onClick={closeModal}>
            {!loading && <Icon iconType="loading"/>}
            {(loading && today) && <>
                <HeaderComponent/>
                <StyledMain>
                    <AsideComponent/>
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