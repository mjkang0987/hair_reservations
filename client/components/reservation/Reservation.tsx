import React, {useState} from 'react';
import {createPortal} from 'react-dom';

import {useRecoilValue} from 'recoil';

import {
    dragTargetState,
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
import {ModalReservationControls} from '../modal/ModalReservationControls';

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
    const dragTarget = useRecoilValue(dragTargetState);

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

    const handlerDrag = (e: React.MouseEvent) => {
    };

    const handlerDragStart = (e: React.MouseEvent) => {
        console.log('start', e)
    };

    const handlerDragEnd = (e: React.MouseEvent) => {
        console.log(dragTarget.arrayDate)
    }

    return (<>
        <ButtonSquare draggable={true}
                      padding={[0, '5px']}
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
                      onClick={() => handlerOpenModal()}
                      onDragStart={(e) => handlerDragStart(e)}
                      onDrag={(e) => handlerDrag(e)}
                      onDragEnd={(e) => handlerDragEnd(e)}>
            {text.map((t) => <ButtonText key={t}
                                         a11y={false}
                                         fontSize={'var(--tiny-font)'}>{t}</ButtonText>)}
        </ButtonSquare>

        {(isOpen && portal) && createPortal(<ModalComponent isOpen={isOpen}
                                                            handlerModalClose={() => setIsOpen(false)}
                                                            controls={<ModalReservationControls controls={['delete', 'modify']}/>}
                                                            body={<ModalReservation item={item}/>}/>, portal)}

    </>);
};