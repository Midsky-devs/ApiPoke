import { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackUserParams } from '../../navigator/UserStackNavigator';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useLocation } from '../../hooks/useLocation';
import { useUserForm } from '../../hooks/useUserForm';

interface Props extends StackScreenProps<StackUserParams,'FormUser'>{};

export const FormUser = ( { route, navigation }:Props ) => {

  const { state, handleInputChange, handleSubmit, handleDelete  } = useUserForm();
  const { location } = useLocation();
  const { image64, pickImage } = useImagePicker()

  useEffect( () => {
    const user = route.params;
    handleInputChange('id_user', user.id_user);
    handleInputChange('username', user.username);
    handleInputChange('email', user.email);
    handleInputChange('imagen', user.imagen);
    handleInputChange('location', `${location?.coords.altitude},${location?.coords.latitude}`);
  },[]);

  useEffect( () => {
    image64 && handleInputChange('imagen', image64);
  },[ image64 ]);

  return(
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.popToTop()}>
          <Text style={styles.backText}>‹  Volver</Text>
        </TouchableOpacity>

        <Text style={styles.eyebrow}>GESTIÓN DE USUARIOS</Text>
        <Text style={styles.title}>
          {state.id_user === 0 ? 'Nuevo usuario' : 'Editar usuario'}
        </Text>
        <Text style={styles.subtitle}>Completa los datos de la cuenta</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.avatarContainer} onPress={() => pickImage()} activeOpacity={0.8}>
            {state.imagen ? (
              <Image
                style={styles.avatar}
                source={{ uri: `data:image/png;base64,${state.imagen}` }}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>+</Text>
              </View>
            )}
            <Text style={styles.imageHint}>Cambiar foto</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            value={state.username}
            onChangeText={(text) => handleInputChange('username', text)}
            placeholder="Ingresa el nombre del usuario"
            placeholderTextColor="#8b8795"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={state.password}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholder={state.id_user === 0 ? 'Crea una contraseña' : 'Deja vacío para conservarla'}
            placeholderTextColor="#8b8795"
            secureTextEntry
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={state.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="nombre@correo.com"
            placeholderTextColor="#8b8795"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              handleSubmit();
              navigation.popToTop();
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>
              {state.id_user === 0 ? 'Crear usuario' : 'Guardar cambios'}
            </Text>
          </TouchableOpacity>

          {state.id_user !== 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                handleDelete();
                navigation.popToTop();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.deleteButtonText}>Eliminar usuario</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f4f1f8',
    flex: 1
  },
  content: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 28,
    paddingVertical: 8
  },
  backText: {
    color: '#5b2ca0',
    fontSize: 16,
    fontWeight: '600'
  },
  eyebrow: {
    color: '#735d91',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2
  },
  title: {
    color: '#302044',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 6
  },
  subtitle: {
    color: '#777180',
    fontSize: 15,
    marginBottom: 24,
    marginTop: 6
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e8e1f0',
    borderRadius: 18,
    borderWidth: 1,
    padding: 20
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24
  },
  avatar: {
    borderRadius: 48,
    height: 96,
    width: 96
  },
  avatarPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#f0e9f8',
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    width: 96
  },
  avatarPlaceholderText: {
    color: '#5b2ca0',
    fontSize: 36,
    fontWeight: '300'
  },
  imageHint: {
    color: '#5b2ca0',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8
  },
  label: {
    color: '#40374c',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#faf9fc',
    borderColor: '#ded6e9',
    borderRadius: 10,
    borderWidth: 1,
    color: '#302044',
    fontSize: 16,
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 13
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#5b2ca0',
    borderRadius: 10,
    marginTop: 6,
    paddingVertical: 15
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700'
  },
  deleteButton: {
    alignItems: 'center',
    borderColor: '#d92d20',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 13
  },
  deleteButtonText: {
    color: '#b42318',
    fontSize: 15,
    fontWeight: '600'
  }
});
