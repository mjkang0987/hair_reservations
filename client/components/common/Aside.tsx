import Link from 'next/link';

import styled from 'styled-components';

import {ASIDE as asides} from '../../utils/constants/constants';

import {ButtonText} from './ButtonText';
import {Input} from './Input';

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
            <form>
                <Input type="text"
                       inputIcon="search"
                       placeholder="사용자 검색"/>
            </form>
            <Link href="/addressBook" passHref>주소록</Link>
        </Aside>
    );
};

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
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