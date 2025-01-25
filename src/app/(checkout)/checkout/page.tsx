'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import React from 'react';
import { useSession } from 'next-auth/react';

import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar, Container, Title } from '../../../../shared/components/shared';
import { checkoutFormSchema, CheckoutFormValues } from '@/constants/checkout-form-schema';
import { Api } from '@/services/api-client';
import { useCart } from '@/hooks/use-cart';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });
// eslint-disable-next-line react-hooks/exhaustive-deps
   React.useEffect(() => {
     async function fetchUserInfo() {
       try {
         const data = await Api.auth.getMe();

         if (data?.name && data?.surname && data?.email) {
           form.setValue('firstName', data.name);
           form.setValue('lastName', data.surname);
           form.setValue('email', data.email);
         } else {
           throw new Error('Ошибка: Неполные данные пользователя');
         }
       } catch (error: any) {
         console.error('Ошибка при получении данных пользователя:', error.message);
         return null; // или выбросить ошибку, если нужно
       }
     }

     if (session) {
      fetchUserInfo();
     }
   }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className=" ml-10 font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <div className="w-[400px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
            </div>

            {/* Правая часть */}
            {/* <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div> */}
          </div>
        </form> 
      </FormProvider>
    </Container>
  );
}
