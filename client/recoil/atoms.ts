import {atom} from 'recoil';

interface AsideType {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

export const asideState = atom<AsideType>({
    key: 'asideState',
    default: {
        isVisible: true,
        isTransitionEnd: true
    }
});
