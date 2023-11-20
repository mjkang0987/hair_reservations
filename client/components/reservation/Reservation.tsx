import React, {useState} from 'react';
import {createPortal} from 'react-dom';

import {useRecoilValue} from 'recoil';

import {
    portalState,
    ReservationsType,
    viewState
} from '../../recoil/atoms';

import {
    COLORS,
    ViewType
} from '../../utils/constants';

import {
    setTimeHeight,
    setTimeText
} from '../../utils/utils';

import {ButtonSquare} from '../common/Buttons';
import {ButtonText} from '../common/ButtonText';
import {ModalComponent} from '../modal/Modal';
import {ModalReservation} from '../modal/ModalReservation';

interface ReservationType {
    transform: string;
    item: ReservationsType;
}

export const Reservation = ({
    transform,
    item
}: ReservationType) => {
    const portal = useRecoilValue(portalState);
    const [isOpen, setIsOpen] = useState(false);
    const view = useRecoilValue(viewState);

    const handlerOpenModal = () => {
        setIsOpen(true);
    };

    const text = view.type === ViewType.Month
                 ? [`${item.name} - ${item.service}`]
                 : [
            setTimeText({startHours: item.startHours, startMinutes: item.startMinutes}),
            item.name,
            item.service
        ];

    return (<>
        <ButtonSquare padding={[0, '5px']}
                      height={view.type === ViewType.Month
                              ? '20px'
                              : setTimeHeight({
                              startHours  : item.startHours,
                              startMinutes: item.startMinutes,
                              endHours    : item.endHours,
                              endMinutes  : item.endMinutes
                          })}
                      backgroundColor={COLORS[+item.color]}
                      transform={transform}
                      onClick={() => handlerOpenModal()}>
            {text.map((t) => <ButtonText key={t}
                                         a11y={false}
                                         fontSize={'var(--tiny-font)'}>{t}</ButtonText>)}
        </ButtonSquare>

        {(isOpen && portal) && createPortal(<ModalComponent isOpen={isOpen}
                                                            handlerModalClose={() => setIsOpen(false)}
                                                            body={<ModalReservation item={item}/>}/>, portal)}

    </>);
};