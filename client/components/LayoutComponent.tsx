import React, {
    useEffect,
    useState
} from 'react';

import {useRouter} from 'next/router';

import styled from 'styled-components';

import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';

import {
    asideState,
    routerState,
    targetState,
    targetStateState,
    todayState,
    viewState,
} from '../recoil/atoms';

import {useIsomorphicEffect} from '../hooks/useIsomorphicEffect';

import {
    useToggleModal
} from '../hooks/useCloseModal';

import {
    handleOnload,
    isCalendar,
    NodeType,
    setRouter,
    ViewType
} from '../utils/constants';

import {HeaderComponent} from './common/Header';
import {AsideComponent} from './common/Aside';
import {FooterComponent} from './common/Footer';
import {Icon} from './common/Icons';
import {ButtonText} from './common/ButtonText';

export default function LayoutComponent({children}: NodeType) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [aside, setAside] = useRecoilState(asideState);
    const setToday = useSetRecoilState(todayState);
    const [routers, setRouters] = useRecoilState(routerState);
    const currValue = useRecoilValue(targetState);
    const setCurr = useSetRecoilState(targetStateState);
    const setView = useSetRecoilState(viewState);


    const isomorphicEffect = useIsomorphicEffect();

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

    const array = router.asPath.split('/');
    const isRootPath = array.join('').length === 0;
    const isCalendarPath = isCalendar(array);

    const currDate = !isCalendarPath || isRootPath ? initDate : new Date(Number(array[2]), Number(array[3]) - 1, Number(array[4]) || 1);

    handleOnload({
        setRouters
    });

    isomorphicEffect(() => {
        setLoading(true);
        setToday(initDate);
        setCurr(currDate);

        setRouters({
            arrayRouter: router.asPath.split('/'),
            isRootPath,
            isCalendarPath
        });

        setRouter({
            type : isRootPath ? ViewType.Week : array[1],
            year : currDate.getFullYear(),
            month: currDate.getMonth() + 1,
            date : currDate.getDate(),
            router
        });
    }, []);

    useEffect(() => {
        setView({
            type: isRootPath || !isCalendarPath ? ViewType.Week : array[1]
        });
    }, [routers, setRouters]);

    return (<StyledWrapper onClick={closeModal}>
            {!loading && <Icon iconType="loading"/>}
            <HeaderComponent/>
            {currValue.full !== null && <>
                <StyledMain>
                    <StyledButton type="button"
                                  isVisible={aside.isVisible}>
                        <Icon iconType="plus"/>
                        {aside.isVisible && <ButtonText a11y={false}>일정추가</ButtonText>}
                    </StyledButton>
                    <AsideComponent/>
                    {children}
                </StyledMain>
                <FooterComponent/>
            </>}
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div<{ onClick?: Function }>`
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

const StyledButton = styled.button <{ isVisible: boolean }>`
  display: inline-flex;
  position: absolute;
  top: 10px;
  left: 15px;
  align-items: center;
  justify-content: center;
  width: ${props => props.isVisible
                    ? '189px'
                    : 'auto'};
  max-width: calc(80% - 30px);
  height: 35px;
  border: 1px solid #ccc;
  background-color: ${props => props.isVisible
                               ? 'var(--white-color)'
                               : 'rgb(255 255 255 / .6)'};
  border-radius: ${props => props.isVisible
                            ? '5px'
                            : '20px'};
  box-shadow: ${props => props.isVisible
                         ? '0 0 10px 0 rgba(0, 0, 0, .1)'
                         : '0 0 10px 0 rgba(0, 0, 0, .2)'};
  font-size: var(--small-font);
  z-index: 3;
  transition: box-shadow .1s ease-in-out;

  &:hover {
    ${props => !props.isVisible && `
      box-shadow:  0 0 15px 0 rgba(0, 0, 0, .4);
    `}
  }
`;
