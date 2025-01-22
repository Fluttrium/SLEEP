import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>('/cart')).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  console.log('addCartItem called with values:', values); // Логируем входные данные

  try {
    const response = await axiosInstance.post<CartDTO>('/cart', values);
    console.log('addCartItem response:', response.data); // Логируем успешный ответ
    return response.data;
  } catch (error) {
    console.error('addCartItem error:', error); // Логируем ошибки
    throw error; // Пробрасываем ошибку для обработки в вызывающем коде
  }
};
