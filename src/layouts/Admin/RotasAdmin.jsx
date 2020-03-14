import Dashboard from "../../views/Dashboard";
import UserProfile from "../../views/UserProfile";
import Notifications from "../../views/Notifications";
import Order from "../../views/Order";

let Rotas = [
  {
    path: "/dashboard", //url sem o admin
    name: "Dashboard", //Nome no menu
    icon: "tim-icons icon-chart-pie-36", //icone
    layout: "/admin", //tipo de layout padrao adm
    component: Dashboard //disponibiliza o componente para registro
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/Order", //url sem o admin
    name: "Pedido", //Nome no menu
    icon: "tim-icons icon-chart-pie-36", //icone
    component: Order,
    layout: "/admin" //tipo de layout padrao adm
  },
  {
    path: "/*",
    name: "Not Found",
    icon: "tim-icons icon-single-02",
    component: Dashboard,
    layout: "/admin"
  }
];

export default Rotas;
