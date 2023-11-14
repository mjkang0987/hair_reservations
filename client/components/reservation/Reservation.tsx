import {useEffect} from 'react';
import styled from 'styled-components';

import {useRecoilValue} from 'recoil';

import {
    currReservationsState,
    ReservationsType
} from '../../recoil/atoms';

import {ButtonSquare} from '../common/Buttons';
import {ButtonText} from '../common/ButtonText';

export const ReservationComponent = ({
    item
}: any) => {
    return (<StyledReserve>
        <ButtonSquare padding={[0, '5px']} height={'auto'}>
            <ButtonText a11y={false}
                        fontSize={'var(--tiny-font)'}>{item}</ButtonText>
        </ButtonSquare>
    </StyledReserve>);
};

const StyledReserve = styled.li`
  width: 100%;
  
  button {
    > span {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
`;