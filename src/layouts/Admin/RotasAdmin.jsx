import Dashboard from "../../views/Dashboard";
import UserProfile from "../../views/UserProfile";
import Notifications from "../../views/Notifications";
import PurchaseRequest from "../../views/PurchaseRequest";

let Rotas = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    layout: "/admin",
    component: Dashboard
  },
  {
    path: "/user-profile",
    name: "Perfil de Usuário",
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
    path: "/purchase-request",
    name: "Pedido de Compra",
    icon: "tim-icons icon-bag-16",
    component: PurchaseRequest,
    layout: "/admin"
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
