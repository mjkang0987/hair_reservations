import {atom} from 'recoil';

export const asideState = atom({
    key: 'asideState',
    default: {
        isVisible: true,
        isTransitionEnd: true
    }
});