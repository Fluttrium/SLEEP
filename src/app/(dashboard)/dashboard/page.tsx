import { PostProducts } from "@/components/admincomps/PostProducts";
import DashboardProducts from "./products/page";
import { PostCategoryProducts } from "@/components/admincomps/PostCategoryProducts";

export default function Dashboard() {
  return (
    <div className="h-screen">
      {/* Основной контент с прокруткой */}
      <div className="flex-1 overflow-y-auto p-4">
        <DashboardProducts />
      </div>

      Фиксированные кнопки управления
      <div className="flex-1 overflow-y-auto p-4 flex-col">
        <PostCategoryProducts />
        <PostProducts />
      </div>
    </div>
  );
}