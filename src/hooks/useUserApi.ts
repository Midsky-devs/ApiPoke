import { kzsvApi } from '../api/kzsvApi';
import { useCallback, useEffect, useState } from "react";
import { UserReponse } from "../interfaces/pandoraApiResponse";
import { FormUserData } from "./useUserForm";
import { useApiUrl } from './useApiUrl';

interface UseUserApi{
  isLoading:  boolean;
  listUser:   UserReponse[];
  loadUsers:  () => Promise<void>;
  createUser: (data: FormUserData) => void;
  updateUser: (data: FormUserData) => void;
  deleteUser: (data: FormUserData) => void;
}

export const useUserApi = (): UseUserApi => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ listUser, setListUser ] = useState<UserReponse[]>([]);
  const { apiUrl } = useApiUrl();
  const urlApi = `${apiUrl}/users`;

  const fetchUsers = useCallback(async () => {
    const response = await kzsvApi.get<UserReponse[]>(urlApi);
    return response.data;
  }, []);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      setListUser(await fetchUsers());
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  useEffect(() => {
    let active = true;
    fetchUsers()
      .then((users) => {
        if (active) setListUser(users);
      })
      .catch((error: unknown) => {
        console.error("Error al cargar los usuarios:", error);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchUsers]);

  const createUser = async ( data: FormUserData ) => {
    const dataBody = {
      username: data.username,
      password: data.password,
      email: data.email,
      imagen: data.imagen,
      location: data.location
    }

    await kzsvApi.post( urlApi, dataBody );
  }

  const updateUser = async ( data: FormUserData ) => {
    if (data.password){
      const dataBody = {
        username: data.username,
        password: data.password,
        email: data.email,
        imagen: data.imagen,
        location: data.location
      }

      await kzsvApi.patch( `${urlApi}/${data.id_user}`, dataBody );
    }else {
      const dataBody = {
        username: data.username,
        email: data.email,
        imagen: data.imagen,
        location: data.location
      }

      await kzsvApi.patch( `${urlApi}/${data.id_user}`, dataBody );
    }
  }

  const deleteUser = async ( data: FormUserData ) => {
    await kzsvApi.delete(`${urlApi}/${data.id_user}`);
  }

  return { isLoading, listUser, loadUsers, createUser, updateUser, deleteUser };

}