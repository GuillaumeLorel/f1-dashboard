"use client";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState, useEffect } from "react";
import {
  Home,
  Menu as MenuIcon,
  Users,
  User,
  Gauge,
  Wrench,
  Infinity as InfinityIcon,
  Info,
  Send,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === to}
      onClick={() => setSelected(to)}
      icon={icon}
      component={<Link href={to} />}>
      {title}
    </MenuItem>
  );
};

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const [selected, setSelected] = useState(pathname);

  return (
    <Sidebar
      width="300px"
      className="text-primary-foreground"
      collapsed={isCollapsed}
      rootStyles={{
        borderRight: "1px solid var(--separator)",
        [`.ps-sidebar-container`]: {
          backgroundColor: "hsl(var(--secondary))",
          color: "hsl(var(--foreground))",
        },
        [".ps-submenu-content"]: {
          backgroundColor: "transparent",
        },
        [".ps-menu-root"]: {
          "& ul": {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          },
        },

        [".ps-menuitem-root"]: {
          "& .ps-menu-button": {
            borderRadius: "6px",
            background: "transparent",

            "&.ps-active": {
              backgroundColor: "hsl(var(--tertiary))",
              color: "hsl(var(--foreground))",
            },

            "&:hover": {
              backgroundColor: "hsl(var(--tertiary))",
              color: "hsl(var(--foreground))",
            },
          },
        },
      }}>
      <header className="p-6 flex flex-col gap-9">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold">F1 Dashboard</h1>}
          <button className="" onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuIcon />
          </button>
        </div>
      </header>
      <Menu
        iconShape="square"
        className={`${isCollapsed ? "p-0 pt-5" : "p-6 pt-10"}`}>
        <Item
          title="Dashboard"
          to="/"
          icon={<Home />}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="flex flex-col gap-1">
          {isCollapsed ? (
            ""
          ) : (
            <span className="text-sm opacity-30 leading-10">Pages</span>
          )}
          <Item
            title="Drivers"
            to="/drivers"
            icon={<Users />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Constructors"
            to="/constructors"
            icon={<Wrench />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Circuits"
            to="/circuits"
            icon={<InfinityIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="flex flex-col gap-1">
          {isCollapsed ? (
            ""
          ) : (
            <span className="text-sm leading-10 opacity-30">Other</span>
          )}
          <Item
            title="Infos"
            to="/infos"
            icon={<Info />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="About"
            to="/about"
            icon={<User />}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
