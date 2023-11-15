import styled from 'styled-components';

export const FooterComponent = () => {
    return (
        <StyledFooter>&copy; jiwoo kang</StyledFooter>
    );
};

const StyledFooter = styled.footer `
  display: flex;
  justify-content: center;
  padding: 6px 0;
  border-top: solid 1px var(--light-gray-color);
  font-size: var(--tiny-font);
  color: var(--gray-color);
`;