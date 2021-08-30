import { Link, withRouter } from "react-router-dom";

import styled from "styled-components";
import useSearchForm from "util/useSearchForm";

const SHeader = styled.header`
  position: fixed;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.background};
  z-index: 1;
  top: 0;
  left: 0;
  padding: 0px 40px;
  opacity: 0.9;
`;

const Logo = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: ${(props) => props.theme.color.purple};
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 200px;
`;

const Item = styled.li<IProps>`
  margin: 0 7px;
  letter-spacing: -0.2px;
  font-size: 13px;
  font-weight: ${(props) => (props.current ? 500 : 300)};
  transition: font-weight 0.1s ease-in-out;
  &:hover {
    opacity: ${(props) => (props.current ? 1 : 0.8)};
  }
`;

const Form = styled.form`
  position: relative;
  width: 300px;
  height: 40px;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0 15px 0 45px;
  font-size: 14px;
  color: ${(props) => props.theme.color.text};
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  opacity: 0.9;
`;

const SLink = styled(Link)`
  cursor: pointer;
`;

interface IProps {
  current: boolean;
}

const Header = withRouter(({ location: { pathname } }) => {
  const { register, handleSubmit, onSubmit } = useSearchForm();

  return (
    <SHeader>
      <Logo>
        <SLink to="/">MOVIETRIP</SLink>
      </Logo>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">홈</SLink>
        </Item>
        <Item current={pathname.includes("/movie")}>
          <SLink to="/movie">영화</SLink>
        </Item>
        <Item current={pathname.includes("/show")}>
          <SLink to="/show">TV 프로그램</SLink>
        </Item>
        {/* <Item current={pathname === "#"}>
          <SLink to="#">내가 찜한 콘텐츠</SLink>
        </Item> */}
        <Item current={pathname === "/search"}>
          <SLink to="/search">검색</SLink>
        </Item>
      </List>
      <>
        {pathname === "/" ? (
          ""
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="제목을 입력하세요"
              {...register("search")}
            />
            <Icon className="fas fa-search"></Icon>
          </Form>
        )}
      </>
    </SHeader>
  );
});

export default Header;
