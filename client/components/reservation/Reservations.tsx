import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import styled from 'styled-components';

import {useRecoilValue} from 'recoil';

import {
    ReservationsType,
    viewState
} from '../../recoil/atoms';

import {
    COLORS,
    HEIGHTS,
    ViewType
} from '../../utils/constants';

import {ButtonSquare} from '../common/Buttons';
import {ButtonText} from '../common/ButtonText';
import {Reservation} from './Reservation';

export const ReservationsComponents = ({
    items
}: { items: ReservationsType[] }) => {
    const view = useRecoilValue(viewState);
    const [height, setHeight] = useState(0);
    const [overIndex, setOverIndex] = useState(-1);
    const reservationsRef = useRef<HTMLDivElement | null>(null);

    interface TimeStartType {
        startHours: number;
        startMinutes: number;
    }

    interface TimeEndType {
        endHours: number;
        endMinutes: number;
    }

    const setTimeHeight = ({
        startHours,
        startMinutes,
        endHours,
        endMinutes
    }: TimeStartType&TimeEndType) => {
        return `${((endHours - startHours) * 120) + ((endMinutes - startMinutes) * 2)}px`
    }

    const setTimePosition = ({
        startHours,
        startMinutes
    }: TimeStartType) => {
        return ((startHours - 10) * 120) + (startMinutes * 2);
    }

    const setTimeText = ({
        startHours,
        startMinutes
    }: TimeStartType) => {
        const hours = startHours < 12 ? `오전 ${startHours}` : `오후 ${(startHours - 12).toString().length === 0 ? `0${(startHours - 12)}` : startHours - 12}`;
        const minutes = startMinutes.toString().length === 1 ? `0${startMinutes}` : startMinutes

        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        if (!reservationsRef.current) {
            return;
        }

        const currHeight = reservationsRef.current.clientHeight;

        if (height !== currHeight) {
            setHeight(currHeight);
        }

        const findIndex = items.findIndex((_, i) => (i + 2) * HEIGHTS.RESERVATION > height);
        setOverIndex(findIndex);
    }, [height, setHeight]);

    const filterItems = view.type === ViewType.Month ? items.slice(0, overIndex === -1 ? items.length : overIndex) : items;

    return (<StyledReserveWrap ref={reservationsRef} type={view.type}>
        {height !== 0 && filterItems.map((item, i) => <Reservation key={`${item.id}_${item.startHours}_${item.startMinutes}`}
                                                   padding={[0, '5px']}
                                                   height={view.type === ViewType.Month ? '20px' : setTimeHeight({startHours: item.startHours, startMinutes: item.startMinutes, endHours: item.endHours, endMinutes: item.endMinutes})}
                                                   backgroundColor={COLORS[+item.color]}
                                                   transform={`translate(0, ${view.type === ViewType.Month ? HEIGHTS.RESERVATION * i : setTimePosition({startHours: item.startHours, startMinutes: item.startMinutes})}px)`}
                                                   method={() => {}}
                                                   fontSize={'var(--tiny-font)'}
                                                   text={view.type === ViewType.Month ? `${item.name} - ${item.service}` : [setTimeText({startHours: item.startHours, startMinutes: item.startMinutes}), item.name, item.service]}/>
        )}
        {items.length - filterItems.length > 0 && <ButtonSquare padding={[0, '5px']}
                                                                height={'20px'}
                                                                transform={`translate(0, ${HEIGHTS.RESERVATION * (filterItems.length)}px)`}>
            <ButtonText a11y={false}
                        fontSize={'var(--tiny-font)'}>{items.length - filterItems.length}개 더보기</ButtonText>
        </ButtonSquare>}
    </StyledReserveWrap>);
};

const StyledReserveWrap = styled.div<{type: string}>`
  flex: 1;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  button {
    display: block;
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: left;
    ${props => props.type !== ViewType.Month && `
      overflow: hidden;
      text-align: center;
    `};
    
    @media (max-width: 767px) {
      > span {
        ${props => props.type === ViewType.Week && `
          white-space: wrap;
          word-break: break-all;
          
          &:first-of-type,
          &:last-of-type {
            display: none;
          }`}
      }
    }
    
    @media (min-width: 768px) {
      > span {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
`;
