import { Button, Nav, NavItem, DropdownItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt from "jwt-decode";

const Sidebar = ({ showMobilemenu }) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("retoken");
    console.log("logged out");
  };

  let curl = useRouter();
  const location = curl.pathname;
  let userid = "";
  if (typeof window !== 'undefined') {
    userid = jwt(localStorage.getItem("token"))['user_id']
  }

  let navigation = [
    {
      title: "Home",
      href: {
        pathname: '/homepage/[id]',
        query: { id: userid },
      },
      icon: "bi bi-house-door",
    },
    {
      title: "Profile",
      href: {
        pathname: '/profile/[id]',
        query: { id: userid },
      },
      icon: "bi bi-person",
    },
    {
      title: "Plans",
      href: {
        pathname: '/viewplan/[id]',
        query: { id: userid },
      },
      icon: "bi bi-book",
    },
    {
      title: "Community",
      href: {
        pathname: '/community/[id]',
        query: { id: userid },
      },
      icon: "bi bi-people",
    },
  ];

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <div className="d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto"
            onClick={showMobilemenu}
          ></Button>
        </div>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href.pathname
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
          <Button
            onClick={logout}
            color="danger"
            tag="a"
            className="mt-3"
            href="/login"
          >
            Logout
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
