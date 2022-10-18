import Link from 'next/link';

import styled from 'styled-components';

import {ASIDE as asides} from '../../utils/constants/constants';

import {ButtonText} from './ButtonText';
import {InputWrap} from './Input';

export const AsideComponent = () => {
    return (
        <Aside>
            {Object.keys(asides).map((a) =>
                <Button key={asides[a].id} type="button">
                    <ButtonText buttonIcon={asides[a].icon || ''}
                                a11y={false}>
                        {asides[a].title}
                    </ButtonText>
                </Button>
            )}
            <InputWrap inputIcon="search">
                <input type="text" placeholder="사용자 검색"/>
            </InputWrap>
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
  height: 40px;
  border: 1px solid #ccc;
  background-color: var(--defaultWhite);
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
`;