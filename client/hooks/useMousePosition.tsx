import React from 'react';
import {
    TIMELINE_DAY_TOP,
    TIMELINE_TOP,
    ViewType
} from '../utils/constants';

interface MousePositionType {
    event: React.MouseEvent | null,
    setPosition: Function,
    type: string,
    fullYear: number,
    month: number,
    date: number
}

export const useMousePosition = ({
    event,
    type,
    setPosition,
    fullYear,
    month,
    date
}: MousePositionType) => {
    if (event === null) {
        return;
    }

    event.preventDefault();

    const target = event.target as HTMLElement;

    const {
        clientX,
        clientY
    } = event;

    const x = clientX - target.getBoundingClientRect().left;
    const y = clientY - target.getBoundingClientRect().top - (type === ViewType.Day ? TIMELINE_DAY_TOP : TIMELINE_TOP);

    // console.log(x, y)

    return null;
};