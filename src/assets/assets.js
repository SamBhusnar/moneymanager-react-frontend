import {
  Coins,
  FunnelPlus,
  Layout,
  LayoutDashboard,
  List,
  Wallet,
} from "lucide-react";
import login_bg from "./login-bg.jpg";
import logo from "./logo.jpg";
import rupee from "./rupee.png";
export const assets = {
  login_bg,
  logo,
  rupee,
};
export const SIDE_BAR_DATA = [
  {
    id: "01",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "02",
    label: "Income",
    path: "/income",
    icon: Wallet,
  },
  {
    id: "03",
    label: "Expense",
    path: "/expense",
    icon: Coins,
  },
  {
    id: "04",
    label: "Category",
    path: "/category",
    icon: List,
  },
  {
    id: "05",
    label: "Filter",
    path: "/filter",
    icon: FunnelPlus,
  }
];
