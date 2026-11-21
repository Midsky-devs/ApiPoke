import { createStackNavigator } from "@react-navigation/stack";
import { Screen1 } from "../screens/stack/Screen1";
import { Screen2 } from "../screens/stack/Screen2";
import { Screen3 } from "../screens/stack/Screen3";
import { appColors } from "../theme/appTheme";

export type StackParams = {
  Screen1: undefined;
  Screen2: undefined;
  Screen3: undefined;
}

const Stack = createStackNavigator<StackParams>();

export const StackNavigator = () => {
  return(
    <Stack.Navigator
      initialRouteName="Screen1"
      screenOptions={{
        headerMode: 'float',
        headerShown: true,
        headerStyle: {
          backgroundColor: appColors.background,
          borderBottomColor: appColors.border,
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: appColors.text
        },
        headerTintColor: appColors.accent,
        cardStyle: {
          backgroundColor: appColors.background
        }
      }}
    >
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{ title: 'Pantalla 1' }}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{ title: 'Pantalla 2' }}
      />
      <Stack.Screen
        name="Screen3"
        component={Screen3}
        options={{ title: 'Pantalla 3' }}
      />
    </Stack.Navigator>
  );
}