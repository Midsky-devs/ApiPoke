import { StyleSheet } from "react-native";

export const appColors = {
  background: '#0B1220',
  surface: '#111C2E',
  panel: '#17243A',
  accent: '#C8F169',
  accentSecondary: '#55D6BE',
  text: '#F5F7F1',
  muted: '#A4B0C0',
  border: '#28364B',
  input: '#0D1727',
  danger: '#FF7B72',
};

export const appTheme = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.background,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    color: appColors.accent,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    fontSize: 25,
    backgroundColor: appColors.panel,
    textAlign: 'center',
    width: 350,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.border,
    marginTop: 10
  }
});