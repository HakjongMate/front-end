import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconBlue from "../../assets/icons/HakjongMate_Blue.png";
import { User, ShoppingCart, LogIn } from "lucide-react";

interface SideMenuProps {
  $isOpen: boolean;
}

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  max-width: 1200px;
  margin: -10px auto 0;
  padding: 0 15px;

  @media (max-width: 1024px) {
    max-width: 100%;
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

const NavLink = styled.li<{ $isActive: boolean }>`
  a {
    text-decoration: none;
    color: ${({ $isActive }) => ($isActive ? "#202594" : "#333")};
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
      transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
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
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconLink = styled(Link)`
  color: #333;
  margin-left: 15px;
  transition: color 0.3s ease;

  &:hover {
    color: #202594;
  }
`;

const UserMenuContainer = styled.div`
  position: relative;
`;

const UserMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #202594;
  }
`;

const UserMenuDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
  background-color: #ffffff;
  border: 1px solid #e9eaff;
  border-radius: 4px;
  padding: 5px 0;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  z-index: 1000;
  min-width: 120px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserMenuItem = styled.a`
  display: block;
  padding: 8px 12px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
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

const Bar = styled.div<{ $isOpen: boolean }>`
  width: 25px;
  height: 3px;
  background-color: #202594;
  margin: 3px 0;
  transition: all 0.3s ease;

  &:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(45deg) translate(7px, 5px)" : "rotate(0)"};
  }

  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
  }

  &:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(-45deg) translate(7px, -5px)" : "rotate(0)"};
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
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  z-index: 999;
  padding: 60px 20px 20px;
  overflow-y: auto;

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

const ServiceLinks = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 10px 0;
  border-top: 1px solid #e9eaff;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
    padding: 20px 0;
  }
`;

const ServiceLink = styled(NavLink)`
  margin: 10px 0;
  text-align: center;

  a {
    text-decoration: none;
    color: ${({ $isActive }) => ($isActive ? "#202594" : "#333")};
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s ease;

    &:hover {
      color: #202594;
    }
  }

  @media (min-width: 769px) {
    margin: 0;
  }
`;

function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showServiceLinks, setShowServiceLinks] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  // 로그인을 확인해 로그인 상태를 저장
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setLoggedIn(!!accessToken);
  }, []);

  // 페이지 이동 시 메뉴를 닫음
  useEffect(() => {
    setIsUserMenuOpen(false); 
    setIsMenuOpen(false);
  }, [location]);

  // 서비스 페이지인 경우 서비스 메뉴를 보여줌
  useEffect(() => {
    setShowServiceLinks(location.pathname.startsWith("/service"));
  }, [location]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleService = () => {
    setShowServiceLinks(!showServiceLinks);
    navigate("/service/book");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 토근 유효성 검사
  const checkTokenValidity = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (!accessToken || !refreshToken) {
      setLoggedIn(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/test`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        console.log('토큰이 만료되었습니다. 바로 로그아웃 처리합니다.');
        // 바로 토큰 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLoggedIn(false);
      navigate('/');
      console.error('토큰 유효성 검사 중 오류 발생:', error);
    }
  };
  

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 토큰이 없을 경우 로그아웃을 처리
    if (!accessToken || !refreshToken) {
      setLoggedIn(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsUserMenuOpen(false);
      navigate('/');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access': `Bearer ${accessToken}`,
          'refresh': refreshToken,
        },
      });

      const result = await response.json();

      // 로그아웃 성공 처리
      if (response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLoggedIn(false);
        setIsUserMenuOpen(false);
        navigate('/');
      } else {
        console.error('로그아웃 실패:', result.message);
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };  

  return (
    <NavbarContainer>
      <MainNavbar>
        <LogoContainer to="/">
          <LogoImage src={IconBlue} alt="HakjongMate" />
          <LogoText>HakjongMate</LogoText>
        </LogoContainer>

        <MenuButton onClick={toggleMenu}>
          <Bar $isOpen={isMenuOpen} />
          <Bar $isOpen={isMenuOpen} />
          <Bar $isOpen={isMenuOpen} />
        </MenuButton>

        <NavLinksContainer>
          <NavLinks>
            <NavLink $isActive={isActive("/intro")}>
              <Link to="/intro">학종메이트 소개</Link>
            </NavLink>
            <NavLink $isActive={isActive("/service")}>
              <a onClick={toggleService}>서비스</a>
            </NavLink>
            <NavLink $isActive={isActive("/review")}>
              <Link to="/review">사용 후기</Link>
            </NavLink>
            <NavLink $isActive={isActive("/contact")}>
              <Link to="/contact">문의하기</Link>
            </NavLink>
          </NavLinks>
        </NavLinksContainer>

        <AuthContainer>
          {loggedIn ? (
            <>
              <UserMenuContainer>
                <UserMenuButton onClick={toggleUserMenu}>
                  <User size={24} />
                </UserMenuButton>
                <UserMenuDropdown $isOpen={isUserMenuOpen}>
                  <UserMenuItem as={Link} to="/my">마이페이지</UserMenuItem>
                  <UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
                </UserMenuDropdown>
              </UserMenuContainer>
              <IconLink to="/my/cart">
                <ShoppingCart size={24} />
              </IconLink>
            </>
          ) : (
            <IconLink to="/login">
              <LogIn size={24} />
            </IconLink>
          )}
        </AuthContainer>
      </MainNavbar>

      {showServiceLinks && (
        <ServiceLinks>
          <ServiceLink $isActive={isActive("/service/book")}>
            <Link to="/service/book">학종 가이드북</Link>
          </ServiceLink>
          <ServiceLink $isActive={isActive("/service/analyze")}>
            <Link to="/service/analyze">생기부 진단 서비스</Link>
          </ServiceLink>
          <ServiceLink $isActive={isActive("/service/ai")}>
            <Link to="/service/ai">AI 주제 추천 서비스</Link>
          </ServiceLink>
        </ServiceLinks>
      )}

      <SideMenu $isOpen={isMenuOpen}>
        <SideMenuLink $isActive={isActive("/intro")}>
          <Link to="/intro" onClick={toggleMenu}>
            학종메이트 소개
          </Link>
        </SideMenuLink>
        <SideMenuLink $isActive={isActive("/service")}>
          <a
            onClick={() => {
              toggleService();
              toggleMenu();
            }}
          >
            서비스
          </a>
        </SideMenuLink>

        {showServiceLinks && (
          <ServiceSubLinks>
            <ServiceSubLink>
              <Link to="/service/book" onClick={toggleMenu}>
                학종 가이드북
              </Link>
            </ServiceSubLink>
            <ServiceSubLink>
              <Link to="/service/analyze" onClick={toggleMenu}>
                생기부 진단 서비스
              </Link>
            </ServiceSubLink>
            <ServiceSubLink>
              <Link to="/service/ai" onClick={toggleMenu}>
                AI 주제 추천 서비스
              </Link>
            </ServiceSubLink>
          </ServiceSubLinks>
        )}

        <SideMenuLink $isActive={isActive("/review")}>
          <Link to="/review" onClick={toggleMenu}>
            사용 후기
          </Link>
        </SideMenuLink>
        <SideMenuLink $isActive={isActive("/contact")}>
          <Link to="/contact" onClick={toggleMenu}>
            문의하기
          </Link>
        </SideMenuLink>
        {loggedIn ? (
          <>
            <SideMenuLink $isActive={false}>
              <a
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                로그아웃
              </a>
            </SideMenuLink>
            <SideMenuLink $isActive={isActive("/my")}>
              <Link to="/my" onClick={toggleMenu}>
                마이페이지
              </Link>
            </SideMenuLink>
            <SideMenuLink $isActive={isActive("/my/cart")}>
              <Link to="/my/cart" onClick={toggleMenu}>
                장바구니
              </Link>
            </SideMenuLink>
          </>
        ) : (
          <SideMenuLink $isActive={false}>
            <Link to="/login" onClick={toggleMenu}>
              로그인
            </Link>
          </SideMenuLink>
        )}
      </SideMenu>
    </NavbarContainer>
  );
}

export default Navbar;
