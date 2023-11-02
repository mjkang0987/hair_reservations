import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import {
    timeState,
} from '../../recoil/atoms';

export const TimelineTitleComponent = () => {
    const time = useRecoilValue(timeState);

    const {
        start,
        end,
        is12Hour
    } = time;

    const setTimes = () => {
        const arr = new Array((end - start + 1)).fill(start);

        return arr.reduce((acc, _, index) => {
            const num = (start + index);

            const isMorning = num < 12
                              ? '오전'
                              : '오후';
            const isHalf = num > 12
                           ? num - 12
                           : num;
            const isSingle = String(isHalf + 1).length < 2
                             ? 0
                             : '';
            const result = [`${isMorning} ${isSingle}${isHalf}:00`];

            result.push(`${isMorning} ${isSingle}${isHalf}:30`);

            return [...acc, ...result];
        }, []);
    };

    return (<StyledTimelineTitle>
            <StyledTimes>
                {setTimes().map((t: string, index: number) => <StyledTime key={`time_${t}_${index}`}>
                    <StyledNum>{t}</StyledNum>
                </StyledTime>)}
            </StyledTimes>
        </StyledTimelineTitle>
    );
};

const StyledTimelineTitle = styled.div`
  flex-shrink: 0;
  width: 120px;
  border-right: 1px solid var(--light-gray-color);
  box-sizing: border-box;
`;

const StyledTimes = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 30px 0 60px;
`;

const StyledTime = styled.li`
  display: flex;
  justify-content: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% - 12px);
    width: 100vw;
    height: 1px;
    background-color: var(--light-gray-color);
  }
`;

const StyledNum = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  font-size: var(--tiny-font);
  color: var(--gray-color);
`;