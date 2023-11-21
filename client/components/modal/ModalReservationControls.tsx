import {Icon} from '../common/Icons';
import {ButtonIcon} from '../common/Buttons';
import React from 'react';
import styled from 'styled-components';

export const ModalReservationControls = ({controls}: { controls: string[] }) => {
    return (<StyledControls>
            {controls.map((control) => <ButtonIcon key={control} aria-label={control}>
                <Icon iconType={control}/>
            </ButtonIcon>)}
        </StyledControls>
    );
};

const StyledControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  padding: 0 14px 14px;
`;
