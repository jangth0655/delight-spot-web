import { KindMenu, Store, StoreDetail } from '@/types/domain/stores';
import api from '../httpClient';

const getStores = async (page: number = 1, type?: string): Promise<Store[]> => {
  const data = await (
    await api.get(`/stores`, {
      params: {
        ...(type !== 'all' && { type }),
        page,
      },
    })
  )?.data;
  return data;
};

type CreateAndUpdateStoreArgs = {
  name: string;
  description: string;
  kind_menu: KindMenu;
  city: string;
  store_photo: string[];
  pet_friendly: boolean;
};

const createStore = async ({
  city,
  description,
  kind_menu,
  name,
  store_photo,
  pet_friendly,
}: CreateAndUpdateStoreArgs) => {
  const response = await (
    await api.post(`/stores`, {
      name,
      description,
      kind_menu,
      city,
      store_photo,
      pet_friendly,
    })
  ).data;

  return response;
};

const getStoreDetail = async (id: number): Promise<StoreDetail> => {
  const result = await (await api.get(`/stores/${id}`)).data;
  return result;
};

const updateStore = async (
  storeId: number,
  { city, description, kind_menu, name, pet_friendly, store_photo }: CreateAndUpdateStoreArgs
): Promise<void> => {
  const response = await (
    await api.put(`/stores/${storeId}`, {
      storeId,
      description,
      kind_menu,
      city,
      name,
      ...(pet_friendly && { pet_friendly }),
      ...(store_photo && { store_photo }),
    })
  ).data;
  return response;
};

const deleteStore = async ({ storeId }: { storeId: number; fileUrls?: string[] }) => {
  return await (
    await api.delete(`/stores/${storeId}`)
  ).data;
};

export { getStores, getStoreDetail, createStore, deleteStore, updateStore };
export type { CreateAndUpdateStoreArgs };
