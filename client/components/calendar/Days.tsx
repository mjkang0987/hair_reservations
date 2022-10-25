import {DAYS} from '../../utils/constants';
import styled from 'styled-components';

export const DaysComponent = ()  => {
    return (
        <DaysWrap>
            <Days>
                {Object.keys(DAYS).map((day =>
                    <Day key={DAYS[day].id}>
                        {DAYS[day].ko}
                    </Day>))}
            </Days>
        </DaysWrap>
    );
};

const DaysWrap = styled.div`
  width: 100%;
`;

const Days = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Day = styled.li`
  flex: 1;
  text-align: center;
  padding: 10px 0 5px;
  font-size: var(--defaultFont);
  color: var(--defaultBlack);
`;