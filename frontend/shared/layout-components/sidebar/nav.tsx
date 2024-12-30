import React from "react";

const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>;

const PagesIcon = <i className="bx bx-file-blank side-menu__icon"></i>;

const TaskIcon = <i className="bx bx-task side-menu__icon"></i>;

const AuthenticationIcon = (
  <i className="bx bx-fingerprint side-menu__icon"></i>
);

const ErrorIcon = <i className="bx bx-error side-menu__icon"></i>;

const WidgetsIcon = <i className="bx bx-gift side-menu__icon"></i>;

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
    path: "/partner-dashboard",
  },
  {
    icon: PagesIcon,
    badgetxt: badge1,
    path: "/partner-dashboard/file-manager",
    type: "link",
    active: false,
    selected: false,
    title: "File Manager",
  },
  {
    icon: DashboardIcon,
    title: "CRM",
    type: "link",
    active: false,
    selected: false,
    path: "/partner-dashboard/crm",
  },
  {
    icon: DashboardIcon,
    title: "HRM",
    type: "link",
    active: false,
    selected: false,
    path: "/partner-dashboard/hrm",
  },
  {
    path: "/list-view",
    title: "List View",
    icon: TaskIcon,
    badgetxt: badge1,
    type: "link",
    active: false,
    selected: false,
  },
  {
    icon: AuthenticationIcon,
    title: " Authentication",
    type: "sub",
    active: false,
    selected: false,
    children: [
      {
        path: "/authentication/coming-soon",
        type: "link",
        active: false,
        selected: false,
        title: "Coming Soon",
      },

      {
        title: "Create Password",
        type: "sub",
        menusub: true,
        active: false,
        selected: false,
        children: [
          {
            path: "/authentication/create-password/create-basic",
            type: "link",
            active: false,
            selected: false,
            title: "Basic",
          },
          {
            path: "/authentication/create-password/create-cover",
            type: "link",
            active: false,
            selected: false,
            title: "Cover",
          },
        ],
      },
      {
        title: "Lock Screen",
        type: "sub",
        menusub: true,
        active: false,
        selected: false,
        children: [
          {
            path: "/authentication/lock-screen/screen-basic",
            type: "link",
            active: false,
            selected: false,
            title: "Basic",
          },
          {
            path: "/authentication/lock-screen/screen-cover",
            type: "link",
            active: false,
            selected: false,
            title: "Cover",
          },
        ],
      },
      {
        title: "Reset Password",
        type: "sub",
        menusub: true,
        active: false,
        selected: false,
        children: [
          {
            path: "/authentication/reset-password/reset-basic",
            type: "link",
            active: false,
            selected: false,
            title: "Basic",
          },
          {
            path: "/authentication/reset-password/reset-cover",
            type: "link",
            active: false,
            selected: false,
            title: "Cover",
          },
        ],
      },
      {
        title: "Sign In",
        type: "sub",
        menusub: true,
        active: false,
        selected: false,
        children: [
          {
            path: "/authentication/sign-in/signin-basic",
            type: "link",
            active: false,
            selected: false,
            title: "Basic",
          },
          {
            path: "/authentication/sign-in/signin-cover",
            type: "link",
            active: false,
            selected: false,
            title: "Cover",
          },
        ],
      },
      {
        title: "Sign Up",
        type: "sub",
        menusub: true,
        active: false,
        selected: false,
        children: [
          {
            path: "/authentication/sign-up/signup-basic",
            type: "link",
            active: false,
            selected: false,
            title: "Basic",
          },
          {
            path: "/authentication/sign-up/signup-cover",
            type: "link",
            active: false,
            selected: false,
            title: "Cover",
          },
        ],
      },
      {
        title: "Two Step Verification",
        type: "sub",
        menusub: true,
        active: false,
        selected: false,
        children: [
          {
            path: "/authentication/two-step-verification/two-basic",
            type: "link",
            active: false,
            selected: false,
            title: "Basic",
          },
          {
            path: "/authentication/two-step-verification/two-cover",
            type: "link",
            active: false,
            selected: false,
            title: "Cover",
          },
        ],
      },
      {
        path: "/authentication/under-maintanance",
        type: "link",
        active: false,
        selected: false,
        title: "Under Maintainance",
      },
    ],
  },
  {
    icon: ErrorIcon,
    title: "Error",
    type: "sub",
    active: false,
    selected: false,
    children: [
      {
        path: "/error/error-401",
        type: "link",
        active: false,
        selected: false,
        title: "401-Error",
      },
      {
        path: "/error/error-404",
        type: "link",
        active: false,
        selected: false,
        title: "404-Error",
      },
      {
        path: "/error/error-500",
        type: "link",
        active: false,
        selected: false,
        title: "500-Error",
      },
    ],
  },
  {
    path: "/widgets",
    title: "widgets",
    icon: WidgetsIcon,
    badgetxt: badge2,
    type: "link",
    active: false,
    selected: false,
  },
];

export default MenuItems;
