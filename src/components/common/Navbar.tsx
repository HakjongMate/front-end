import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconBlue from "../../assets/icons/HakjongMate_Blue.png";

interface SideMenuProps {
  isOpen: boolean;
}

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 0 15px;
  }
`;

const MainNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 30px;
  height: 34px;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 24px;
    height: 27px;
  }
`;

const LogoText = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #202594;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 20px;
  }
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
      height: 3px;
      left: 0;
      bottom: -5px;
      background-color: #202594;
      transition: all 0.3s ease;
      transform: scaleX(${({ isActive }) => (isActive ? 1 : 0)});
      transform-origin: left;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 1024px) {
    a {
      font-size: 16px;
    }
  }
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
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
      height: 3px;
      left: 0;
      bottom: -5px;
      background-color: #202594;
      transition: all 0.3s ease;
      transform: scaleX(0);
      transform-origin: left;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 1024px) {
    a {
      font-size: 16px;
    }
  }
`;

const MenuButton = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.div<{ isOpen: boolean }>`
  width: 25px;
  height: 3px;
  background-color: #202594;
  margin: 3px 0;
  transition: all 0.3s ease;

  &:nth-child(1) {
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(45deg) translate(7px, 5px)" : "rotate(0)"};
  }

  &:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
  }

  &:nth-child(3) {
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(-45deg) translate(7px, -5px)" : "rotate(0)"};
  }

  @media (max-width: 425px) {
    width: 20px;
    height: 2px;
    margin: 3px 0;
  }
`;

const SideMenu = styled.div<SideMenuProps>`
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  padding: 60px 20px 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const SideMenuLink = styled(NavLink)`
  margin-bottom: 20px;
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    color: #202594;
  }
`;

const ServiceSubLinks = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ServiceSubLink = styled.li`
  margin-bottom: 10px;
  
  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    
    &:hover {
      color: #202594;
    }
  }
`;

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showServiceLinks, setShowServiceLinks] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  useEffect(() => {
    setShowServiceLinks(location.pathname.startsWith("/service"));
  }, [location]);

  const toggleService = () => {
    setShowServiceLinks(!showServiceLinks);
  };

  const handleLoginLogout = () => {
    setLoggedIn(!loggedIn);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarContainer>
      <MainNavbar>
        <LogoContainer to="/">
          <LogoImage src={IconBlue} alt="HakjongMate" />
          <LogoText>HakjongMate</LogoText>
        </LogoContainer>

        <MenuButton onClick={toggleMenu}>
          <Bar isOpen={isMenuOpen} />
          <Bar isOpen={isMenuOpen} />
          <Bar isOpen={isMenuOpen} />
        </MenuButton>

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
                  <Link to="/my">마이페이지</Link>
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
      
      <SideMenu isOpen={isMenuOpen}>
        <SideMenuLink isActive={isActive("/intro")}>
          <Link to="/intro" onClick={toggleMenu}>학종메이트 소개</Link>
        </SideMenuLink>
        <SideMenuLink isActive={isActive("/service")}>
          <a onClick={toggleService}>서비스</a>
        </SideMenuLink>
        {showServiceLinks && (
          <ServiceSubLinks>
            <ServiceSubLink>
              <Link to="/service/book" onClick={toggleMenu}>학종 가이드북</Link>
            </ServiceSubLink>
            <ServiceSubLink>
              <Link to="/service/analyze" onClick={toggleMenu}>생기부 진단 서비스</Link>
            </ServiceSubLink>
            <ServiceSubLink>
              <Link to="/service/ai" onClick={toggleMenu}>AI 주제 추천 서비스</Link>
            </ServiceSubLink>
          </ServiceSubLinks>
        )}
        <SideMenuLink isActive={isActive("/review")}>
          <Link to="/review" onClick={toggleMenu}>사용 후기</Link>
        </SideMenuLink>
        <SideMenuLink isActive={isActive("/contact")}>
          <Link to="/contact" onClick={toggleMenu}>문의하기</Link>
        </SideMenuLink>
        {loggedIn ? (
          <>
            <SideMenuLink isActive={false}>
              <a onClick={() => { handleLoginLogout(); toggleMenu(); }}>로그아웃</a>
            </SideMenuLink>
            <SideMenuLink isActive={isActive("/my")}>
              <Link to="/my" onClick={toggleMenu}>마이페이지</Link>
            </SideMenuLink>
          </>
        ) : (
          <SideMenuLink isActive={false}>
            <a onClick={() => { handleLoginLogout(); toggleMenu(); }}>로그인</a>
          </SideMenuLink>
        )}
      </SideMenu>
    </NavbarContainer>
  );
}

export default Navbar;