import styled from 'styled-components';

const StyledButtonText = styled.span<{ buttonIcon: string }>`
  position: relative;
  padding-left: ${props => props.buttonIcon !== '' ? `20px` : 0};
  ${props => props.buttonIcon === 'plus' && `
    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 14px;
      height: 2px;
      background-color: var(--defaultBlack);
      border-radius: 2px;
      pointer-events: none;
    }
    
    &::before {
      transform: translateY(-50%);
    }
    
    &:after {
      transform: translateY(-50%) rotate(90deg);
    }
  `};
`;

export const ButtonText = ({children, buttonIcon}: { children: string, buttonIcon: string }) => {
    return <StyledButtonText buttonIcon={buttonIcon}>{children}</StyledButtonText>;
};