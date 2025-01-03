import React from "react";

const DashboardIcon = <i className="bx bx-home-alt side-menu__icon"></i>;

const UserManagerIcon = <i className="bx bx-user side-menu__icon"></i>;

const WorldsManagerIcon = <i className="bx bx-globe side-menu__icon"></i>;

const QuestManagerIcon = <i className="bx bx-task side-menu__icon"></i>;

const EnemyManagerIcon = <i className="bx bx-bomb side-menu__icon"></i>;

const BuildingManagerIcon = <i className="bx bx-building side-menu__icon"></i>;

const WeaponsManagerIcon = (
  <i className="bx bx-target-lock side-menu__icon"></i>
);

const badge = (
  <span className="badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2">
    12
  </span>
);
const badge1 = (
  <span className="text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-2">
    New
  </span>
);
const badge2 = (
  <span className="text-danger text-[0.75em] rounded-sm badge !py-[0.25rem] !px-[0.45rem] !bg-danger/10 ms-2">
    Hot
  </span>
);
const badge4 = (
  <span className="text-success text-[0.75em] badge !py-[0.25rem] !px-[0.45rem] rounded-sm bg-success/10 ms-2">
    3
  </span>
);

export const MenuItems: any = [
  {
    menutitle: "MAIN",
  },
  {
    icon: DashboardIcon,
    badgetxt: badge,
    title: "Dashboards",
    type: "link",
    active: false,
    selected: false,
    path: "/dashboard",
  },
  {
    icon: UserManagerIcon,
    title: "User Manager",
    type: "link",
    active: false,
    selected: false,
    path: "/dashboard/users",
  },
  {
    icon: WorldsManagerIcon,
    badgetxt: badge1,
    path: "/dashboard/worlds",
    type: "link",
    active: false,
    selected: false,
    title: "Worlds Manager",
  },
  {
    icon: QuestManagerIcon,
    title: "Quest Manager",
    type: "link",
    active: false,
    selected: false,
    path: "/dashboard/quests",
  },
  {
    icon: EnemyManagerIcon,
    title: "Item Manager",
    type: "link",
    active: false,
    selected: false,
    path: "/dashboard/items",
  },
  {
    icon: BuildingManagerIcon,
    title: "Building Manager",
    type: "link",
    active: false,
    selected: false,
    path: "/dashboard/buildings",
  },
  {
    path: "/dashboard/weapons",
    title: "Weapons Manager",
    icon: WeaponsManagerIcon,
    badgetxt: badge2,
    type: "link",
    active: false,
    selected: false,
  },
];
