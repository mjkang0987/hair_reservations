import React from 'react';

import {
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import styled from 'styled-components';

import {
    targetState,
    targetStateState,
    viewState
} from '../../recoil/atoms';

import {
    ViewType
} from '../../utils/constants';

export const CalendarHeading = () => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    const currValue = useRecoilValue(targetState);
    const {full, fullYear, month, date} = currValue;

    const curr = useRecoilValue(targetStateState);

    const setMonth = () => {
        if (type === ViewType.Day || type === ViewType.Month) {
            return Number(month) + 1;
        }

        if (Number(date) + (type === ViewType.Week ? 6 : 2) > curr?.monthLastNumber) {
            const calcYear = month === 11 ? `${Number(fullYear) + 1} / 1` : Number(month) + 2;
            return `${Number(month) + 1} - ${calcYear}`;
        }

        return `${Number(month) + 1}`;
    }

    return (<StyledHeading>
            {full && <StyledDateWrap>
                <StyledDateElement>{Number(fullYear)}</StyledDateElement>
                {type !== ViewType.Year && <StyledDateElement>
                    {setMonth()}
                </StyledDateElement>}
                {type === ViewType.Day && <StyledDateElement>{Number(date)}</StyledDateElement>}
            </StyledDateWrap>}
        </StyledHeading>
    );
};

const StyledHeading = styled.h1`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDateWrap = styled.span`
  display: inline-flex;
  align-items: center;
`;

const StyledDateElement = styled.span`
  display: inline-flex;
  font-size: 26px;

  + span {
    &:before {
      content: "/";
      display: inline-flex;
      position: relative;
      margin: 0 4px;
    }
  }
`;
