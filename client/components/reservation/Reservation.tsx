import styled from 'styled-components';

import {
    ReservationsType
} from '../../recoil/atoms';

import {ButtonSquare} from '../common/Buttons';
import {ButtonText} from '../common/ButtonText';

export const ReservationComponent = ({
    items
}: { items: ReservationsType[] }) => {
    return (<ul>
        {items.length > 0 && <StyledReserve>
            {items.map(item => <ButtonSquare key={`${item.id}_${item.startHours}`}
                                             padding={[0, '5px']}
                                             height={'auto'}>
                <ButtonText a11y={false}
                            fontSize={'var(--tiny-font)'}>{item.name} - {item.service}</ButtonText>
            </ButtonSquare>)}
        </StyledReserve>}
    </ul>);
};

const StyledReserve = styled.li`
  width: 100%;

  button {
    width: 100%;
    text-align: left;

    > span {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
    }
  }
`;