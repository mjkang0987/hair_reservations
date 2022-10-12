interface AsideElementType {
    id: number
    title: string,
    icon?: string
}

interface AsideType {
    [key: string]: AsideElementType
}

const ASIDE: AsideType = {
    ADD    : {
        id   : 0,
        title: '일정추가',
        icon: 'plus'
    },
    DAILY  : {
        id   : 1,
        title: '일별',
    },
    THREE  : {
        id   : 2,
        title: '3일',
    },
    WEEKLY : {
        id   : 3,
        title: '주별',
    },
    MONTHLY: {
        id   : 4,
        title: '월별',
    },
};

export {
    ASIDE
};
