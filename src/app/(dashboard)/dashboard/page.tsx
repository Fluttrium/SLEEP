import { PostTable } from "@/components/admincomps/PostTable";
import DashboardProducts from "./products/page";
import { PostProducts } from "@/components/admincomps/PostProducts";

export default function Dashboard() {
  return <div><DashboardProducts/>
  <PostProducts/>
  </div>;
}
