import { Suspense } from 'react';




import { Container } from '@/components/shared/ui/container';
import { Title } from '@/components/shared/ui/title';

import { TopBar } from '../../../shared/components/shared/top-bar';
import { CartButton, Filters, ProductsGroupList, Stories } from '../../../shared/components/shared';
import { findPizzas, GetSearchParams } from '@/lib/find-pizzas';
import { SearchInput2 } from '@/components/shared/ui/search-input2';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  const hasSearch = true;

  const hasCart = true;

  return (
    <>
      <Container className="mt-10">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Левая часть: Заголовок */}
    <Title text="Каталог" size="lg" className="font-extrabold" />

    {/* Средняя часть: Поиск */}
    {/* {hasSearch && (
      <div className="flex-1 md:ml-10">
        <SearchInput2 />
      </div>
    )} */}

    {/* Правая часть: Кнопка корзины */}
    {/* <div className="flex items-center gap-3">
      {hasCart && <CartButton />}
    </div> */}
  </div>
</Container>    

      {/* <TopBar categories={categories.filter((category) => category.products.length > 0)} /> */}

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}



{/* <CPAPMachineList />
      <Footer/> */}