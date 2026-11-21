import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLogin } from '../../hooks/useLogin';
import { useApiUrl } from '../../hooks/useApiUrl';

const C = {
  fondo: '#090d16',
  superficieInput: '#3f485a',
  bordeInput: 'rgba(171, 175, 219, 0.25)',
  bordeError: 'rgba(148, 180, 59, 0.65)',
  acento: '#3fb144',
  acentoGlow: 'rgba(99, 102, 241, 0.2)',
  textoPrincipal: '#c3c9cf',
  textoSecundario: '#3e4550',
  placeholder: '#183153',
  error: '#439e57',
} as const;

export const LoginUser: React.FC = () => {
  const { state, isLoading, errorMessage, handleInputChange, handleLogin } = useLogin();
  const passwordRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const { apiUrl, guardarApiUrl } = useApiUrl();
  const [servidor, setServidor] = useState<string>(apiUrl ?? '');
  const [verServidor, setVerServidor] = useState<boolean>(false);
  const [mostrarPassword, setMostrarPassword] = useState<boolean>(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [guardandoUrl, setGuardandoUrl] = useState<boolean>(false);

  useEffect(() => {
    if (apiUrl) {
      setServidor(apiUrl);
    }
  }, [apiUrl]);

  const entrar = async (): Promise<void> => {
    setErrorLocal(null);

    if (!state.email.trim() || !state.password) {
      setErrorLocal('Completa tu correo electrónico y contraseña.');
      return;
    }

    let servidorParaLogin = apiUrl;

    if (verServidor && servidor.trim()) {
      const candidata = servidor.trim();
      if (!/^https?:\/\/.+/i.test(candidata)) {
        setErrorLocal('La URL del servidor debe comenzar con http:// o https://');
        return;
      }

      try {
        setGuardandoUrl(true);
        const guardada = await guardarApiUrl(candidata);
        if (typeof guardada === 'string') {
          setServidor(guardada);
          servidorParaLogin = guardada;
        }
      } catch {
        setErrorLocal('No se pudo guardar la dirección del servidor.');
        return;
      } finally {
        setGuardandoUrl(false);
      }
    }

    await handleLogin(servidorParaLogin ?? undefined);
  };

  const ocupado = isLoading || guardandoUrl;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Text style={styles.subtitle}>Ingresa tus datos para continuar</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={state.email}
                onChangeText={(text: string) => {
                  if (errorLocal) setErrorLocal(null);
                  handleInputChange('email', text);
                }}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={C.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                editable={!ocupado}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONTRASEÑA</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={passwordRef}
                style={[styles.input, styles.inputPassword]}
                value={state.password}
                onChangeText={(text: string) => {
                  if (errorLocal) setErrorLocal(null);
                  handleInputChange('password', text);
                }}
                placeholder="••••••••"
                placeholderTextColor={C.placeholder}
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={entrar}
                editable={!ocupado}
              />
              <TouchableOpacity
                style={styles.togglePasswordBtn}
                onPress={() => setMostrarPassword((prev) => !prev)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.togglePasswordText}>
                  {mostrarPassword ? 'Ocultar' : 'Ver'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setVerServidor((v) => !v)}
            disabled={ocupado}
          >
            <Text style={styles.linkServidor}>
              {verServidor ? 'Ocultar servidor' : 'Cambiar servidor'}
            </Text>
          </TouchableOpacity>

          {verServidor && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>SERVIDOR (API)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={servidor}
                  onChangeText={(text: string) => {
                    if (errorLocal) setErrorLocal(null);
                    setServidor(text);
                  }}
                  placeholder="http://192.168.1.15:3000"
                  placeholderTextColor={C.placeholder}
                  keyboardType="url"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={entrar}
                  editable={!ocupado}
                />
              </View>
            </View>
          )}

          {(errorLocal || errorMessage) && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorLocal ?? errorMessage}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, ocupado && styles.buttonDisabled]}
            onPress={entrar}
            disabled={ocupado}
            activeOpacity={0.82}
          >
            {ocupado ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const Login = LoginUser;
export default LoginUser;

const styles = StyleSheet.create({
  root: {
    backgroundColor: C.fondo,
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    color: C.textoPrincipal,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: C.textoSecundario,
    fontSize: 14,
    marginTop: 6,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: C.textoSecundario,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: C.superficieInput,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.bordeInput,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: C.textoPrincipal,
    fontSize: 16,
    height: 54,
    paddingHorizontal: 18,
  },
  inputPassword: {
    paddingRight: 10,
  },
  togglePasswordBtn: {
    paddingHorizontal: 14,
    height: 54,
    justifyContent: 'center',
  },
  togglePasswordText: {
    color: C.textoSecundario,
    fontSize: 13,
    fontWeight: '600',
  },
  linkServidor: {
    color: C.acento,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 18,
  },
  errorBox: {
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    borderWidth: 1,
    borderColor: C.bordeError,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: C.acento,
    borderRadius: 10,
    height: 54,
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});