import styled from "styled-components";

// const Header = styled.h3`
//   background: ${(props) => props.theme.fg};
//   color: ${(props) => props.theme.bg};
//   padding: ${(props) => props.theme.padding};
//   text-decoration: ${(props) =>
//     props.underline ? "underline overline wavy cyan" : "none"};
// `;

const Header = styled.h3`
  ${(props) =>
    `background: ${props.theme.fg}; color: ${props.theme.bg}; padding: ${props.theme.padding};`}
`;

export default Header;
