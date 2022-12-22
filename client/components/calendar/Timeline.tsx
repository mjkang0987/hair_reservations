import styled from 'styled-components';

export const TimelineComponent = () => {
    const setTimes = () => {
        return new Array(23).fill(null).reduce((acc, curr, index) => {
            const isMorning = index < 11 ? '오전' : '오후';
            const isHalf = index > 11 ? index - 12 : index;
            const isSingle = String(isHalf + 1).length < 2 ? 0 : '';
            const result = `${isMorning} ${isSingle}${isHalf + 1}:00`;
            return [...acc, result];
        }, []);
    };

    return (
        <Timeline>
            <Times>
                {setTimes().map((t: string, index: number) => <Time key={`time_${index}`}>
                    <Num>{t}</Num>
                </Time>)}
            </Times>
        </Timeline>
    );
};

const Timeline = styled.div`
  flex-shrink: 0;
  width: 150px;
  border-right: 1px solid var(--defaultLightGray);
  box-sizing: border-box;
`

const Times = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
`;

const Time = styled.li`
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

const Num = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  font-size: var(--defaultTinyFont);
  color: var(--defaultGray);
`;
