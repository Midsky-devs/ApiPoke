import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Keyboard } from 'react-native';
import { useApiUrl } from '../hooks/useApiUrl';
import { appColors } from '../theme/appTheme';

export const ConfiguracionScreen = () => {
  const { apiUrl, guardarApiUrl } = useApiUrl();
  const [url, setUrl] = useState(apiUrl);
  const [mensaje, setMensaje] = useState('');

  const guardar = async () => {
    Keyboard.dismiss();
    const guardada = await guardarApiUrl(url);
    setUrl(guardada);
    setMensaje('Dirección guardada. Las pantallas de datos se recargan solas.');
  };

  return (
    <ScrollView
      style={style.pantalla}
      contentContainerStyle={{ flexGrow: 1, padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={style.encabezado}>
        <Text style={style.header}>Servidor</Text>
        <Text style={style.sub}>Dirección de la API para todas las pantallas</Text>
      </View>

      <View style={style.tarjeta}>
        <Text style={style.titulo}>URL de la API</Text>
        <Text style={style.subtitulo}>Ejemplo: http://192.168.1.15:3000</Text>

        <TextInput
          style={style.input}
          value={url}
          onChangeText={text => {
            setUrl(text);
            setMensaje('');
          }}
          placeholder="http://192.168.1.15:3000"
          placeholderTextColor={appColors.muted}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />

        <Pressable style={style.boton} onPress={guardar}>
          <Text style={style.botonTexto}>Guardar</Text>
        </Pressable>

        {mensaje !== '' && <Text style={style.mensaje}>{mensaje}</Text>}

        <Text style={style.actual}>En uso: {apiUrl}</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: appColors.background },
  encabezado: { marginBottom: 12 },
  header: { color: appColors.text, fontSize: 26, fontWeight: 'bold' },
  sub: { color: appColors.muted, fontSize: 14, marginTop: 2 },
  tarjeta: {
    backgroundColor: appColors.surface,
    borderColor: appColors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 15
  },
  titulo: { color: appColors.text, fontSize: 17, fontWeight: 'bold' },
  subtitulo: { color: appColors.muted, fontSize: 13, marginTop: 2, marginBottom: 14 },
  input: {
    color: appColors.text,
    borderColor: appColors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12
  },
  boton: { backgroundColor: appColors.accentSecondary, borderRadius: 10, padding: 12, alignItems: 'center' },
  botonTexto: { color: appColors.background, fontWeight: 'bold' },
  mensaje: { color: appColors.accent, fontSize: 13, marginTop: 12 },
  actual: { color: appColors.muted, fontSize: 12, marginTop: 12 }
});