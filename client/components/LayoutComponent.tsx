import {ReactNode, useState} from 'react';

import styled from 'styled-components';

import {useIsomorphicEffect} from '../hooks/useIsomorphicEffect';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';
import {Icon} from './common/Icons';

type LayoutProps = {
    children: ReactNode
};

export default function LayoutComponent({children}: LayoutProps) {
    const [loading, setLoading] = useState(false);

    const isomorphicEffect = useIsomorphicEffect();

    isomorphicEffect(() => {
        setLoading(true);
    }, []);

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
  display: flex;
  height: calc(100vh - 160px);
`;