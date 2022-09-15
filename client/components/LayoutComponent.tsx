import {ReactNode} from 'react';

import styled from 'styled-components';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';

type LayoutProps = {
    children: ReactNode
};

export default function LayoutComponent({children}: LayoutProps) {
    return (
        <>
            <HeaderComponent/>
            <Main>
                <AsideComponent/>
                {children}
            </Main>
            <FooterComponent/>
        </>
    );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 20% auto;
  height: calc(100vh - 160px);
`;