import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import type { RootDrawerParams } from "../navigator/DrawerNavigator";
import { appColors } from "../theme/appTheme";

interface MenuItem {
  route: keyof RootDrawerParams;
  text: string;
}

const mainItems: MenuItem[] = [
  { route: 'PokemonNavigator', text: 'Pokédex' },
  { route: 'CatalogoStackNavigator', text: 'Catálogo' },
  { route: 'TareaStackNavigator', text: 'Tareas' },
  { route: 'UserStackNavigator', text: 'Usuarios' },
  { route: 'Login', text: 'Iniciar sesión' },
  { route: 'StackNavigator', text: 'Pantallas' },
  { route: 'FormScreen', text: 'Formulario' },
  { route: 'ImagePickerScreen', text: 'Seleccionar imagen' },
  { route: 'LocationScreen', text: 'Localización' },
  { route: 'DataResponseScreen', text: 'Datos' },
  { route: 'LibrosDataScreen', text: 'Libros' },
  { route: 'ConfiguracionScreen', text: 'Configuración' },
];

export const DrawerMenu = ({ navigation, state }: DrawerContentComponentProps) => {
  const { authState, logout } = useContext(AuthContext);
  const activeRoute = state.routes[state.index]?.name;
  const displayName = authState.username?.trim() || 'Invitado';

  const renderItem = ({ route, text }: MenuItem) => {
    const isActive = activeRoute === route;

    return (
      <Pressable
        key={route}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
        onPress={() => navigation.navigate(route)}
        style={({ pressed }) => [
          styles.menuItem,
          isActive && styles.menuItemActive,
          pressed && styles.menuItemPressed,
        ]}
      >
        <View style={[styles.activeMark, isActive && styles.activeMarkSelected]} />
        <Text style={[styles.menuText, isActive && styles.menuTextActive]}>{text}</Text>
        {isActive && <Text style={styles.chevron}>›</Text>}
      </Pressable>
    );
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.content}
      style={styles.drawer}
    >
      <View style={styles.profile}>
        <View style={styles.avatar}>
          {authState.isLoggedIn && authState.avatar ? (
            <Image
              style={styles.avatarImage}
              source={{ uri: `data:image/png;base64,${authState.avatar}` }}
            />
          ) : (
            <Text style={styles.avatarInitial}>{displayName.charAt(0).toUpperCase()}</Text>
          )}
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.eyebrow}>TU ESPACIO</Text>
          <Text numberOfLines={1} style={styles.username}>{displayName}</Text>
          <Text style={styles.accountStatus}>
            {authState.isLoggedIn ? 'Sesión activa' : 'Sesión no iniciada'}
          </Text>
        </View>
        <View style={styles.brandMark}>
          <Text style={styles.brandInitial}>P</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>EXPLORAR</Text>
      {mainItems.map(renderItem)}

      {authState.isLoggedIn && (
        <Pressable
          accessibilityRole="button"
          onPress={logout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.menuItemPressed]}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      )}
      <Text style={styles.footer}>HECHO PARA DESCUBRIR</Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: appColors.background,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  profile: {
    alignItems: 'center',
    backgroundColor: appColors.surface,
    borderColor: appColors.border,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 30,
    padding: 14,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: appColors.panel,
    borderColor: appColors.accentSecondary,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 50,
  },
  avatarImage: {
    height: '100%',
    width: '100%',
  },
  avatarInitial: {
    color: appColors.accent,
    fontSize: 20,
    fontWeight: '800',
  },
  profileCopy: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },
  eyebrow: {
    color: appColors.accentSecondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  username: {
    color: appColors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  accountStatus: {
    color: appColors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: appColors.accent,
    borderRadius: 13,
    height: 34,
    justifyContent: 'center',
    marginLeft: 8,
    width: 34,
  },
  brandInitial: {
    color: appColors.background,
    fontSize: 17,
    fontWeight: '900',
  },
  sectionTitle: {
    color: appColors.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    marginBottom: 9,
    marginLeft: 12,
  },
  menuItem: {
    alignItems: 'center',
    borderRadius: 13,
    flexDirection: 'row',
    marginBottom: 4,
    minHeight: 46,
    paddingHorizontal: 12,
  },
  menuItemActive: {
    backgroundColor: appColors.panel,
  },
  menuItemPressed: {
    opacity: 0.72,
  },
  activeMark: {
    backgroundColor: appColors.border,
    borderRadius: 2,
    height: 7,
    marginRight: 13,
    width: 7,
  },
  activeMarkSelected: {
    backgroundColor: appColors.accent,
  },
  menuText: {
    color: appColors.muted,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  menuTextActive: {
    color: appColors.text,
    fontWeight: '700',
  },
  chevron: {
    color: appColors.accent,
    fontSize: 25,
    lineHeight: 27,
  },
  divider: {
    backgroundColor: appColors.border,
    height: 1,
    marginBottom: 20,
    marginTop: 18,
  },
  logoutButton: {
    alignItems: 'center',
    borderColor: appColors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
    paddingVertical: 13,
  },
  logoutText: {
    color: appColors.danger,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    color: appColors.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 25,
    textAlign: 'center',
  },
});