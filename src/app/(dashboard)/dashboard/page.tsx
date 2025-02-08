import { PostProducts } from "@/components/admincomps/PostProducts";
import DashboardProducts from "./products/page";

export default function Dashboard() {
  return (
    <div>
      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <DashboardProducts />
      </div>
      <PostProducts />
    </div>
  );
}
