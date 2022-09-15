import styled from 'styled-components';

import {ASIDE as asides} from '../../utils/constants/constants';

export const AsideComponent = () => {
    return (
        <Aside>
            {Object.keys(asides).map((a) =>
                <Button key={asides[a].id} type="button">
                    <ButtonText buttonType={asides[a].title === '일정추가'}>
                        {asides[a].title}
                    </ButtonText>
                </Button>
            )}
        </Aside>
    );
};

const Aside = styled.aside`
  padding: 0 10px;
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  + button {
    margin-top: 10px;
  }
`;

const ButtonText = styled.span<{ buttonType: boolean }>`
  display: flex;
  padding-left: ${props => props.buttonType ? `20px` : 0}
`;
