import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//import { PositionScreen } from "./src/screens/PositionScreen";
//import { BoxObjectModelScreen } from "./src/screens/BoxObjectModelScreen";
//import { CounterScreen } from "./src/screens/CounterScreen";
//import { CounterReducerScreen } from "./src/screens/CounterReducerScreen";
//import { UseEffectScreen } from "./src/screens/UseEffectScreen";
//import { StackNavigator } from "./src/navigator/StackNavigator";
//import { PokemonNavigator } from "./src/navigator/PokemonNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./navigator/DrawerNavigator";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppState>
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
      </AppState>
    </GestureHandlerRootView>
  );

}

const AppState = ( { children }: { children: ReactNode } ) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  );
}

export default App;