import styled from 'styled-components';

import {
    ViewType,
    DAYS
} from '../../utils/constants';

import {useRecoilValue} from 'recoil';

import {
    targetStateState,
    viewState
} from '../../recoil/atoms';

interface DaysType {
    type: string | null;
}

export const DaysComponent = () => {
    const target = useRecoilValue(targetStateState);
    const {
        day,
    } = target;

    const view = useRecoilValue(viewState);
    const {type} = view;

    const daysArr = () => {
        const result = Object.keys(DAYS)
                             .slice(type === ViewType.Three
                                    ? +day
                                    : 0,
                                 type === ViewType.Three
                                 ? +day + 3
                                 : 7
                             );

        if (result.length < 3) {
            return new Array(3 - result.length).fill(null).reduce((acc, curr, i) => {
                return [...acc, Object.keys(DAYS)[i]];
            }, [...result]);
        }

        return result;
    };

    return (<StyledDays type={type}>
            {daysArr().map((day: string) =>
                <StyledDay key={DAYS[day].id}>
                    {DAYS[day].ko}
                </StyledDay>)}
        </StyledDays>
    );
};

const StyledDays = styled.ul <DaysType>`
  display: grid;
  justify-content: center;
  width: 100%;
  background-color: var(--white-color-80);
  z-index: 1;
  
  ${props => (props.type !== ViewType.Month) && `
  position: sticky;
  top: 0;
  grid-row: 1 / 2;
      
  li {
    border: none;
  }
  `
}
`;

const StyledDay = styled.li`
  flex: 1;
  text-align: center;
  padding: 10px 0 5px;
  font-size: var(--small-font);
  color: var(--black-color);
  border-right: 1px solid var(--light-gray-color);
  box-sizing: border-box;

  &:nth-child(7) {
    border-right: none;
  }
`;