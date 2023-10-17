import styled from 'styled-components';

export const TimelineTitleComponent = () => {
    const setTimes = () => {
        return new Array(24).fill(null).reduce((acc, curr, index) => {
            const isMorning = index < 12
                              ? '오전'
                              : '오후';
            const isHalf = index > 12
                           ? index - 12
                           : index;
            const isSingle = String(isHalf + 1).length < 2
                             ? 0
                             : '';
            const result = `${isMorning} ${isSingle}${isHalf}:00`;
            return [...acc, result];
        }, []);
    };

    return (
        <StyledTimeline>
            <StyledTimes>
                {setTimes().map((t: string, index: number) => <StyledTime key={`time_${index}`}>
                    <StyledNum>{t}</StyledNum>
                </StyledTime>)}
            </StyledTimes>
        </StyledTimeline>
    );
};

const StyledTimeline = styled.div`
  flex-shrink: 0;
  width: 150px;
  border-right: 1px solid var(--defaultLightGray);
  box-sizing: border-box;
`;

const StyledTimes = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
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
    background-color: var(--defaultLightGray);
  }
`;

const StyledNum = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  font-size: var(--defaultTinyFont);
  color: var(--defaultGray);
`;
