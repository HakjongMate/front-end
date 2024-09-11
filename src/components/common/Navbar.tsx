import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconBlue from "../../assets/icons/HakjongMate_Blue.png";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const MainNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 30px;
  height: 34px;
  margin-right: 10px;
`;

const LogoText = styled(Link)`
  font-size: 18px;
  font-weight: 400;
  color: #202594;
  text-decoration: none;
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;
`;

const NavLink = styled.li<{ isActive: boolean }>`
  a {
    text-decoration: none;
    color: ${({ isActive }) => (isActive ? "#202594" : "#333")};
    font-size: 18px;
    font-weight: 700;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      color: #202594;
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 5px;
      left: 0;
      bottom: -2px;
      background-color: #e9eaff;
      transition: all 0.3s ease;
      transform: scaleX(${({ isActive }) => (isActive ? 1 : 0)});
      transform-origin: left;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 200px;
`;

const AuthLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 15px;
`;

const AuthLink = styled.li`
  a {
    text-decoration: none;
    color: #333;
    font-size: 18px;
    font-weight: 700;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      color: #202594;
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 5px;
      left: 0;
      bottom: -2px;
      background-color: #e9eaff;
      transition: all 0.3s ease;
      transform: scaleX(0);
      transform-origin: left;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

const ServiceLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;
  margin-top: 0px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e9eaff;
  padding-top: 18px;
`;

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showServiceLinks, setShowServiceLinks] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  useEffect(() => {
    setShowServiceLinks(location.pathname.startsWith("/service"));
  }, [location]);

  const toggleService = () => {
    setShowServiceLinks(true);
    navigate("/service/book");
  };

  const handleLoginLogout = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <NavbarContainer>
      <MainNavbar>
        <LogoContainer>
          <LogoImage src={IconBlue} alt="HakjongMate" />
          <LogoText to="/">HakjongMate</LogoText>
        </LogoContainer>

        <NavLinksContainer>
          <NavLinks>
            <NavLink isActive={isActive("/intro")}>
              <Link to="/intro">학종메이트 소개</Link>
            </NavLink>
            <NavLink isActive={isActive("/service")}>
              <a onClick={toggleService}>서비스</a>
            </NavLink>
            <NavLink isActive={isActive("/review")}>
              <Link to="/review">사용 후기</Link>
            </NavLink>
            <NavLink isActive={isActive("/contact")}>
              <Link to="/contact">문의하기</Link>
            </NavLink>
          </NavLinks>
        </NavLinksContainer>

        <AuthContainer>
          <AuthLinks>
            {loggedIn ? (
              <>
                <AuthLink>
                  <a onClick={handleLoginLogout}>로그아웃</a>
                </AuthLink>
                <AuthLink>
                  <Link to="/mypage">마이페이지</Link>
                </AuthLink>
              </>
            ) : (
              <AuthLink>
                <a onClick={handleLoginLogout}>로그인</a>
              </AuthLink>
            )}
          </AuthLinks>
        </AuthContainer>
      </MainNavbar>

      {showServiceLinks && (
        <ServiceLinks>
          <NavLink isActive={isActive("/service/book")}>
            <Link to="/service/book">학종 가이드북</Link>
          </NavLink>
          <NavLink isActive={isActive("/service/analyze")}>
            <Link to="/service/analyze">생기부 진단 서비스</Link>
          </NavLink>
          <NavLink isActive={isActive("/service/ai")}>
            <Link to="/service/ai">AI 주제 추천 서비스</Link>
          </NavLink>
        </ServiceLinks>
      )}
    </NavbarContainer>
  );
}

export default Navbar;