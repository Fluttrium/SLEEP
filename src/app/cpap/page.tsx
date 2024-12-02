
  import { Suspense } from 'react';
//   import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';
import { ProductsGroupList } from '@/components/product-group-list';
import { Container } from '@/components/shared/ui/container';
import { Title } from '@/components/shared/ui/title';
import { Categories } from '@/components/shared/categories2';
  
  export default async function Home() {
   
  
    return (
      <>
        {/* Заголовок с отступом слева для мобильных */}
        <Container className="mt-10 pl-4 md:pl-0">
          <Title text="Все товары" size="lg" className="font-extrabold" />
        </Container>
  
        {/* TopBar с фиксированным положением и горизонтальной прокруткой на мобильных устройствах */}
        <Container className="mt-4 sticky top-0 bg-white z-10 shadow-md"> {/* Фиксированное положение */}
        <Categories/>
        </Container>

        <Container className="mt-10">
        <div className="overflow-x-auto pl-4 md:pl-0">
          <Stories />
        </div>
      </Container>
  
       </>
    );
  }
  