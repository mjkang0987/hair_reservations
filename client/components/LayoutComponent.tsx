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
        console.log(loading)
        setLoading(true);
        console.log(loading)
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
  display: grid;
  grid-template-columns: 250px auto;
  height: calc(100vh - 160px);
`;