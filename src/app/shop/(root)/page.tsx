import { Suspense } from 'react';

import { SearchInput2 } from '@/components/shared/ui/search-input2';
import { Container } from '@/components/shared/ui/container';
import { Title } from '@/components/shared/ui/title';
import { findPizzas, GetSearchParams } from '@/lib/find-pizzas';
import { CartButton, Filters, TopBar } from '../../../../shared/components/shared';
import { ProductsGroupList } from '@/components/product-group-list';
import { Footer } from '@/components/footer';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  const hasSearch = true;
  const hasCart = true;

  return (
    <>
      {/* Верхняя панель с заголовком, поиском и кнопкой корзины */}
      <Container className="mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Левая часть: Заголовок */}
          <Title text="Каталог" size="lg" className="font-extrabold" />

          {/* Средняя часть: Поиск */}
          {hasSearch && (
            <div className="w-full sm:flex-1 sm:ml-10">
              <SearchInput2 />
            </div>
          )}

          {/* Правая часть: Кнопка корзины */}
          {hasCart && (
            <div className="flex items-center gap-3">
              <CartButton />
            </div>
          )}
        </div>
      </Container>

      {/* Навигационная панель */}
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      {/* Основной контент */}
      <Container className="mt-10 pb-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px]">
          {/* Фильтры (скрыты на мобильных) */}
          <div className="lg:w-[250px] hidden lg:block">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1 pl-4 lg:pl-8">
            <div className="flex flex-col gap-8 sm:gap-16">
              {categories.map((category) =>
                category.products.length > 0 ? (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Нижний колонтитул */}
      <Footer />
    </>
  );
}
