  import { useReducer, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LoginReponse } from "../interfaces/pandoraApiResponse";
import { kzsvApi } from "../api/kzsvApi";
import { useApiUrl } from "./useApiUrl";

export interface LoginData {
  email: string;
  password: string;
}

export interface UseLogin {
  isLoading: boolean;
  state:  LoginData;
  errorMessage: string | null;
  handleLogin: (apiUrlOverride?: string) => Promise<void>;
  handleInputChange: ( fieldName: keyof LoginData, value: string ) => void;
  request: LoginReponse;
}

export const useLogin = () => {

  const initialState: LoginData = {
    email: '',
    password: ''
  }

  type Action = { type: 'handleInputChange', payload: { fieldName: keyof LoginData, value: string } };

  const dataReducer = ( state: LoginData, action: Action ) => {
    switch( action.type ){
      case 'handleInputChange':
        return {
          ...state,
          [ action.payload.fieldName ] : action.payload.value
      }
      default:
        return state;
    }
  }

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ state, dispatch ] = useReducer( dataReducer, initialState );
  const [ request, setRequest ] = useState<LoginReponse>({} as LoginReponse);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  const { singIn, changeUsername, changeAvatar } = useContext( AuthContext ); 

  const { apiUrl } = useApiUrl();

  const handleInputChange = ( fieldName: keyof LoginData, value: string ) => {
    dispatch({  type:'handleInputChange', payload: { fieldName, value } });
    setErrorMessage(null);
  }

  const handleLogin = async (apiUrlOverride?: string) => {
    if (isLoading) return;

    if (!state.email.trim() || !state.password) {
      setErrorMessage('Ingresa tu correo y contraseña.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    const dataBody = {
      email: state.email.trim(),
      password: state.password,
    }

    try{
      const baseUrl = (apiUrlOverride ?? apiUrl).replace(/\/+$/, '');
      const loginUrl = `${baseUrl}/users/login`;
      const response = await kzsvApi.post<LoginReponse>(loginUrl, dataBody);

      setRequest( response.data );

      if (!response.data) {
        setErrorMessage('Correo o contraseña incorrectos.');
        return;
      }

      singIn();
      if (response.data.username) changeUsername(response.data.username);
      if (response.data.imagen) changeAvatar(response.data.imagen);
    } catch (error){
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, state, errorMessage, handleLogin, handleInputChange, request };

}
