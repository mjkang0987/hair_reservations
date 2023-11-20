import React, {useState} from 'react';
import {createPortal} from 'react-dom';

import {useRecoilValue} from 'recoil';

import {
    portalState,
    ReservationsType
} from '../../recoil/atoms';

import {HEIGHTS} from '../../utils/constants';

import {ButtonText} from '../common/ButtonText';
import {ButtonSquare} from '../common/Buttons';
import {ModalComponent} from '../modal/Modal';
import {ModalReservations} from '../modal/ModalReservations';
import {
    ModalReservationsTitle
} from '../modal/ModalReservationsTitle';

interface RestReservationsType {
    items: ReservationsType[];
    filterItems: ReservationsType[];
}

export const RestReservationsComponent = ({
    items,
    filterItems
}: RestReservationsType) => {
    const portal = useRecoilValue(portalState);
    const [isOpen, setIsOpen] = useState(false);

    const handlerOpenModal = () => {
        setIsOpen(true);
    };

    return (<>
            <ButtonSquare padding={[0, '5px']}
                          height={'20px'}
                          transform={`translate(0, ${HEIGHTS.RESERVATION * (filterItems.length)}px)`}
                          onClick={() => handlerOpenModal()}>
                <ButtonText a11y={false}
                            fontSize={'var(--tiny-font)'}>{items.length - filterItems.length}개 더보기</ButtonText>
            </ButtonSquare>
            {(isOpen && portal) && createPortal(<ModalComponent isOpen={isOpen}
                                                                handlerModalClose={() => setIsOpen(false)}
                                                                title={<ModalReservationsTitle item={items[0]}/>}
                                                                body={<ModalReservations items={items}/>}/>, portal)}
        </>
    );
};
