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
            return +month + 1;
        }

        if (+date + (type === ViewType.Week ? 6 : 2) > curr?.monthLastNumber) {
            const calcYear = month === 11 ? `${+fullYear + 1} / 1` : +month + 2;
            return `${+month + 1} - ${calcYear}`;
        }

        return `${+month + 1}`;
    }

    return (<StyledHeading>
            {full && <StyledDateWrap>
                <StyledDateElement>{+fullYear}</StyledDateElement>
                {type !== ViewType.Year && <StyledDateElement>
                    {setMonth()}
                </StyledDateElement>}
                {type === ViewType.Day && <StyledDateElement>{+date}</StyledDateElement>}
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
  @media (max-width: 767px) {
    font-size: var(--font);
  }
  @media (min-width: 768px) {
    font-size: var(--bigger-font);
  }

  + span {
    &:before {
      content: "/";
      display: inline-flex;
      position: relative;
      margin: 0 4px;
    }
  }
`;
