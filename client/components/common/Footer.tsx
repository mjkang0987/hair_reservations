import styled from 'styled-components';

export const FooterComponent = () => {
    return (
        <Footer>Made By</Footer>
    );
};

const Footer = styled.footer `
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-top: solid 1px var(--defaultLightGray);
  font-size: var(--defaultSmallFont);
  color: var(--defaultGray);
`;