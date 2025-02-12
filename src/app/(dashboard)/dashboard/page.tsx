import { PostProducts } from "@/components/admincomps/PostProducts";
import DashboardProducts from "./products/page";
import { PostCategoryProducts } from "@/components/admincomps/PostCategoryProducts";
import { PostAccessories } from "@/components/admincomps/PostAccessories";

export default function Dashboard() {
  return (
    <div className="h-screen ">
      <div className="flex-1 overflow-y-auto p-4">
        <DashboardProducts />
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex-col">
      <PostCategoryProducts />
        <PostProducts />
        <PostAccessories />
      </div>
    </div>
  );
}