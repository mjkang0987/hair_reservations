import styled from 'styled-components';

import {ASIDE as asides} from '../../utils/constants/constants';

import {ButtonText} from './ButtonText';
export const AsideComponent = () => {
    return (
        <Aside>
            {Object.keys(asides).map((a) =>
                <Button key={asides[a].id} type="button">
                    <ButtonText buttonIcon={asides[a].icon || ''}>
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
  align-items: center;
  justify-content: center;
  width: 100%;
  
  + input {
    margin-top: 20px;
  }
`;