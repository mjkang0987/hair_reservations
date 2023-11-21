import React, {useState} from 'react';

import {createPortal} from 'react-dom';

import styled from 'styled-components';

import {useRecoilValue} from 'recoil';

import {
    portalState,
    ReservationsType
} from '../../recoil/atoms';

import {
    COLORS
} from '../../utils/constants';

import {ButtonText} from '../common/ButtonText';
import {ButtonSquare} from '../common/Buttons';
import {ModalComponent} from './Modal';
import {ModalReservation} from './ModalReservation';
import {ModalReservationControls} from './ModalReservationControls';

export const ModalReservations = ({items}: { items: ReservationsType[] }) => {
    const portal = useRecoilValue(portalState);
    const [isOpen, setIsOpen] = useState(false);
    const [currItem, setCurrItem] = useState<ReservationsType | null>(null);

    const handlerOpenModal = () => {
        setIsOpen(true);
    };

    return (<StyledItems>
            {items.map((item) => <ButtonSquare key={`${item.name}_${item.service}`}
                                               padding={['5px']}
                                               height="auto"
                                               backgroundColor={COLORS[+item.color]}
                                               onClick={() => {
                                                   handlerOpenModal();
                                                   setCurrItem(item);
                                               }}>
                <ButtonText a11y={false}
                            fontSize={'var(--tiny-font)'}>{item.name} - {item.service}</ButtonText>
            </ButtonSquare>)}

            {(isOpen && portal && currItem) && createPortal(
                <ModalComponent isOpen={isOpen}
                                handlerModalClose={() => setIsOpen(false)}
                                controls={<ModalReservationControls controls={['delete', 'modify']}/>}
                                body={<ModalReservation item={currItem}/>}/>, portal)}
        </StyledItems>
    );
};

const StyledItems = styled.div`
  button {
    justify-content: flex-start;
    width: 100%;

    + button {
      margin-top: 4px;
    }

    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;