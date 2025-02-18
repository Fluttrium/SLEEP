import { PostProducts } from "@/components/admincomps/productRedactor/PostProducts";
import { PostCategoryProducts } from "@/components/admincomps/productRedactor/PostCategoryProducts";
import { PostAccessories } from "@/components/admincomps/productRedactor/PostAccessories";
import DashboardProducts from "@/components/admincomps/productRedactor/productListRedactor";

export default function Dashboard() {
    return (
        <div className="h-screen ">
            <div className="flex-1 overflow-y-auto p-4">
                <DashboardProducts /> {/*Список продуктов и их удаление*/}
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex-col">
                <PostCategoryProducts /> {/*Действия с категориями */}
                <PostProducts />
                <PostAccessories />
            </div>
        </div>
    );
}