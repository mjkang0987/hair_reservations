import styled from 'styled-components';

const StyledInput = styled.input<{ type: string, inputIcon:string, placeholder: string }>`
  position: relative;
  padding: 5px 5px 5px 25px;
  box-sizing: border-box;

  &::placeholder {
    color: var(--defaultGray);
  }
  
  ${props => props.inputIcon === 'search' && `
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 
  `};
`;

export const Input = ({type, inputIcon, placeholder}: { type: string, inputIcon: string, placeholder: string }) => {
    return <StyledInput type={type}
                        inputIcon={inputIcon}
                        placeholder={placeholder}/>;
};
