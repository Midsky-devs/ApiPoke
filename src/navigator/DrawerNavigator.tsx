import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerMenu } from "../components/DrawerMenu";
import { FormScreen } from "../screens/FormScreen";
import { ImagePickerScreen } from "../screens/ImagePickerScreen";
import { LocationScreen } from "../screens/LocationScreen";
import { PokemonNavigator } from "./PokemonNavigator";
import { StackNavigator } from "./StackNavigator";
import { UserStackNavigator } from "./UserStackNavigator";
import { useWindowDimensions } from "react-native";
import { TareaStackNavigator} from './TareaStackNavigator'
import { Login } from "../screens/users/Login";
import { CatalogoStackNavigator } from './CatalogoStackNavigator';
import { DataResponseScreen } from "../screens/DataResponseScreen";
import { LibroDataScreen } from "../screens/LibroDataScreen";
import { ConfiguracionScreen } from "../screens/ConfiguracionScreen";
import { appColors } from "../theme/appTheme";

export type RootDrawerParams = {
  StackNavigator:         undefined;
  PokemonNavigator:       undefined;
  FormScreen:             undefined;
  ImagePickerScreen:      undefined;
  LocationScreen:         undefined;
  UserStackNavigator:     undefined;
  TareaStackNavigator:    undefined;
  CatalogoStackNavigator: undefined;
  Login:                  undefined;
  DataResponseScreen:     undefined;
  ConfiguracionScreen:   undefined;
  LibrosDataScreen:       undefined;
}

const Drawer = createDrawerNavigator<RootDrawerParams>();


export const DrawerNavigator = () => {

  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: true,
        drawerType: width > 720 ? 'permanent': 'slide',
        drawerPosition: 'left',
        overlayColor: 'rgba(4, 10, 20, 0.72)',
        drawerStyle: {
          backgroundColor: appColors.background,
          width: width > 720 ? 310 : Math.min(width * 0.84, 360),
        },
        headerStyle: {
          backgroundColor: appColors.background,
          borderBottomColor: appColors.border,
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: appColors.text,
        headerTitleStyle: {
          color: appColors.text,
          fontSize: 17,
          fontWeight: '700',
        },
      }}
      drawerContent={ (props) => <DrawerMenu {...props} /> }
    >
    <Drawer.Screen
      name="StackNavigator"
      component={StackNavigator}
      options={{ title: 'Pantallas' }}
    />
      <Drawer.Screen
        name="PokemonNavigator"
        component={PokemonNavigator}
        options={{ title: 'Pokédex' }}
      />
      <Drawer.Screen
        name="FormScreen"
        component={FormScreen}
        options={{ title: 'Formulario' }}
      />
      <Drawer.Screen
        name="ImagePickerScreen"
        component={ImagePickerScreen}
        options={{ title: 'Imágenes' }}
      />
      <Drawer.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{ title: 'Ubicación' }}
      />
      <Drawer.Screen
        name="UserStackNavigator"
        component={UserStackNavigator}
        options={{ title: 'Usuarios' }}
      />
      <Drawer.Screen
        name="TareaStackNavigator"
        component={TareaStackNavigator}
        options={{ title: 'Tareas' }}
      />
      <Drawer.Screen
        name="CatalogoStackNavigator"
        component={CatalogoStackNavigator}
        options={{ title: 'Catálogo' }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ title: 'Iniciar sesión' }}
      />
      <Drawer.Screen
        name="DataResponseScreen"
        component={DataResponseScreen}
        options={{ title: 'Datos' }}
      />
      <Drawer.Screen
        name="LibrosDataScreen"
        component={LibroDataScreen}
        options={{ title: 'Libros' }}
      />
      <Drawer.Screen
        name="ConfiguracionScreen"
        component={ConfiguracionScreen}
        options={{ title: 'Configuración' }}
      />
    </Drawer.Navigator>

  );
}

export const Navigator = DrawerNavigator;
