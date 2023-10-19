import styled from 'styled-components';

import {
    ViewType,
    DAYS,
    NodeType
} from '../../utils/constants';

import {useRecoilValue} from 'recoil';

import {
    targetStateState,
    viewState
} from '../../recoil/atoms';

interface DaysType {
    type: string | null;
}

export const DaysComponent = ({children}: NodeType) => {
    const target = useRecoilValue(targetStateState);
    const {
        day,
    } = target;

    const view = useRecoilValue(viewState);
    const {type} = view;

    const daysArr = () => {
        const result = Object.keys(DAYS).slice(type === ViewType.Three ? Number(day) : 0, type === ViewType.Three ? Number(day) + 3 : 7);

        if (result.length < 3) {
            return new Array(3 - result.length).fill(null).reduce((acc, curr, i) => {
                return [...acc, Object.keys(DAYS)[i]];
            }, [...result]);
        }

        return result;
    };

    return (
        <>
            {type !== ViewType.Day && <StyledDays>
                {daysArr().map((day: string) =>
                    <StyledDay key={DAYS[day].id}
                               type={type}>
                        {DAYS[day].ko}
                    </StyledDay>)}
            </StyledDays>}
            {children}
        </>
    );
};

const StyledDays = styled.ul`
  display: grid;
  justify-content: center;
  width: 100%;
`;

const StyledDay = styled.li <DaysType>`
  flex: 1;
  text-align: center;
  padding: 10px 0 5px;
  font-size: var(--small-font);
  color: var(--black-color);
  border-right: 1px solid var(--light-gray-color);
  box-sizing: border-box;
  ${props => props.type !== ViewType.Month && `
    border: none;
  `};

  &:nth-child(7) {
    border-right: none;
  }
`;