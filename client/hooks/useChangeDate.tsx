import {useRecoilState, useRecoilValue} from 'recoil';
import {currentDate, viewState} from '../recoil/atoms';

interface ChangeType {
    direction?: string;
}

interface MethodType {
    [key: string]: Function;
}

export const useCangeDateBridge = () => {
    const [current, setCurrent] = useRecoilState(currentDate);
    let {full} = current;

    const view = useRecoilValue(viewState);
    const {type} = view;

    const changeMethod: MethodType = {
        setDate({targetDate}: { targetDate: Date }) {
            if (!targetDate) {
                return;
            }

            const currentLastDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
            const currentFirstDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
            const prevLastDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);

            setCurrent({
                full: targetDate,
                firstDay: currentFirstDate.getDay(),
                lastDay: currentLastDate.getDay(),
                lastDate: currentLastDate.getDate(),
                prevLastDate: prevLastDate.getDate(),
            });
        },
        changeDate() {
        },

        changeMonth({direction}: {direction: string}) {
            const isPrev = direction === 'prev';
            changeMethod.setDate({
                targetDate: new Date(full.setMonth(full.getMonth() - (isPrev ? 1 : -1)))
            })
        },

        changeYear() {
            changeMethod.setDate({
                targetDate: new Date(full.setYear(full.getFullYear() - 1))
            })
        }
    };

    const changeBridge = ({direction}: ChangeType) => {
        const isMethod = type === 'year' || type === 'month';

        if (isMethod) {
            return changeMethod[`change${type.replace(/^[a-z]/, char => char.toUpperCase())}`]({direction});
        }
    };

    // const isDate = type !== 'month' && type !== 'year';


    // if (!isDate) {
    // changeMethod[`change${type.replace(/^[a-z]/, char => char.toUpperCase())}`]();
    // }

    const {setDate} = changeMethod;

    return {
        current,
        changeBridge,
        setDate
    };
};
