import {Icon} from './Icons';
import {ButtonText} from './ButtonText';
import styled from 'styled-components';

export const HeaderComponent = () => {
    return (
        <Header>
            <Button type="button">
                <Icon iconType="hamburger"/>
                <ButtonText a11y={true}>메뉴 닫기</ButtonText>
            </Button>
        </Header>
    );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 15px;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #fff;
  border: none;
  
  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }
`;