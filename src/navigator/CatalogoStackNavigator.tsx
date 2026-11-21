import { createStackNavigator } from '@react-navigation/stack';
import { CatalogoForm } from '../screens/catalogo/CatalogoForm';
import { CatalogoHome } from '../screens/catalogo/CatalogoHome';
import { CatalogoFormData } from '../interfaces/catalogo';

export type StackCatalogoParams = {
  CatalogoHome: undefined;
  FormCatalogo: CatalogoFormData;
};

const Stack = createStackNavigator<StackCatalogoParams>();

export const CatalogoStackNavigator = () => (
  <Stack.Navigator
    initialRouteName='CatalogoHome'
    screenOptions={{
      headerMode: 'float',
      headerShown: false,
    }}
  >
    <Stack.Screen name='CatalogoHome' component={CatalogoHome} />
    <Stack.Screen name='FormCatalogo' component={CatalogoForm} />
  </Stack.Navigator>
);
