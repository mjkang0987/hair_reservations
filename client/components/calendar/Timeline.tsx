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

    const timing = (hour - start) * 60 * 60;

    return (<StyledTimelineWrap>
        {isToday && <StyledBar type={type}
                               timing={timing}
                               top={((hour - start) * 120) + minutes}
                               height={(end - start) * 2 * 60}/>}
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

const StyledBar = styled.span<{type: string, timing: number, top: number, height: number}>`
  --bar-top: ${props => (props.top ? props.top : 0) + (props.type === ViewType.Day ? 120 : 90)}px;
  --timeline-height: ${props => props.height ? props.height : 10 * 2 * 60}px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--orange-color);
  animation: down ${props => props.timing ? props.timing : 20 * 60 * 60}s linear;
  
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

