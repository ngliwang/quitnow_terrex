import React from "react";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { useRouter } from "next/router";
 
const FullLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  const router = useRouter();

  if (router.pathname != "/login" && router.pathname != "/creation" && router.pathname != "/buddy/[id]"){
    return (
      <main>
        <div className="pageWrapper d-md-block d-lg-flex">
          {/******** Sidebar **********/}
          <aside
            className={`sidebarArea shadow bg-white ${
              !open ? "" : "showSidebar"
            }`}
          >
            <Sidebar showMobilemenu={() => showMobilemenu()} />
          </aside>
          {/********Content Area**********/}
  
          <div className="contentArea">
            {/********header**********/}
            <Header showMobmenu={() => showMobilemenu()} />
  
            {/********Middle Content**********/}
            <Container className="p-4 wrapper" fluid>
              <div>{children}</div>
            </Container>
          </div>
        </div>
      </main>
    );
  }
  else{
    return (
      <main>
      <div className="pageWrapper d-md-block d-lg-flex">
        {/******** Sidebar **********/}
        {/* <aside
          className={`sidebarArea shadow bg-white ${
            !open ? "" : "showSidebar"
          }`}
        >
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside> */}
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          {/* <Header showMobmenu={() => showMobilemenu()} /> */}

          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
    </main>
    );
  }




};

export default FullLayout;
