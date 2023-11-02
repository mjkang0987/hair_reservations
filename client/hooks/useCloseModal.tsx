import React from 'react';

interface CloseModalType {
    event: React.MouseEvent
    setAside: Function
    isVisible: boolean
    isTransitionEnd: boolean
}

export const useToggleModal = ({
    event,
    setAside,
    isVisible,
    isTransitionEnd
}: CloseModalType) => {
    event.preventDefault();

    setAside({
        isVisible,
        isTransitionEnd
    });

    return null;
};