import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import {
    timeState,
    viewState
} from '../../recoil/atoms';
import {ViewType} from '../../utils/constants';

export const TimelineComponent = ({
    isToday
}: {isToday: boolean}) => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    const time = useRecoilValue(timeState);

    const {
        start,
        end
    } = time;

    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();

    const timing = ((end - hour - 1) * 60 * 60) + (minutes * 2);

    return (<StyledTimelineWrap>
        {isToday && <StyledBar type={type}
                               timing={timing}
                               top={((hour - start) * 2 * 60) + (minutes * 2)}
                               full={(end - start - 1) * 2 * 60}/>}
    </StyledTimelineWrap>);
};
const StyledTimelineWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 30px 5px 0;
  box-sizing: border-box;
`;

const StyledBar = styled.span<{type: string, timing: number, top: number, full: number}>`
  --bar-top: ${props => Number(props.top ? props.top : 0)}px;
  --timeline-height: ${props => props.full ? props.full : 10 * 2 * 60}px;
  position: absolute;
  top: ${props => props.type === ViewType.Day ? 60 : 30}px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--orange-color);
  animation: down ${props => props.timing ? props.timing : 10 * 2 * 60 * 60}s linear;
  
  &:before {
    content: "";
    position: absolute;
    top: -4px;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: var(--orange-color);
    border-radius: 100%;
  }
`;

