import { useEffect } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import {
  CatalogoEditableField,
  CatalogoImageField,
} from '../../interfaces/catalogo';
import { StackCatalogoParams } from '../../navigator/CatalogoStackNavigator';
import { useCatalogoForm } from '../../hooks/useCatalogoForm';

interface Props extends StackScreenProps<StackCatalogoParams, 'FormCatalogo'> {}

const imageFields: CatalogoImageField[] = [
  'imagen_1',
  'imagen_2',
  'imagen_3',
  'imagen_4',
];

const imageUri = (image: string) =>
  image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;

export const CatalogoForm = ({ route, navigation }: Props) => {
  const { state, handleInputChange, handleSubmit, handleDelete, loadForm } =
    useCatalogoForm();

  useEffect(() => {
    const libro = route.params;
    loadForm({
      ...libro,
      imagen_1: libro.imagen_1 ?? '',
      imagen_2: libro.imagen_2 ?? '',
      imagen_3: libro.imagen_3 ?? '',
      imagen_4: libro.imagen_4 ?? '',
    });
  }, [route.params, loadForm]);

  const pickImage = async (fieldName: CatalogoImageField) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
        base64: true,
      });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];
      if (!asset.base64) {
        Alert.alert('No se pudo leer la imagen', 'Elige otra imagen e inténtalo de nuevo.');
        return;
      }

      const mimeType = asset.mimeType ?? 'image/jpeg';
      handleInputChange(fieldName, `data:${mimeType};base64,${asset.base64}`);
    } catch (error) {
      Alert.alert(
        'No se pudo abrir la galería',
        error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
      );
    }
  };

  const submit = async () => {
    const requiredFields: CatalogoEditableField[] = [
      'titulo',
      'autor',
      'isbn',
      'editorial',
      'anio',
      'genero',
      'idioma',
      'numero_paginas',
      'ubicacion',
    ];
    const missingField = requiredFields.find(
      (fieldName) => !state[fieldName].trim(),
    );

    if (missingField) {
      Alert.alert('Faltan datos', 'Completa todos los campos del libro.');
      return;
    }

    const year = Number(state.anio);
    const pages = Number(state.numero_paginas);
    if (
      !Number.isInteger(year) ||
      year < 1000 ||
      year > 9999 ||
      !Number.isInteger(pages) ||
      pages < 1
    ) {
      Alert.alert(
        'Revisa los números',
        'El año debe tener cuatro cifras y las páginas deben ser un número mayor que cero.',
      );
      return;
    }

    if (await handleSubmit()) {
      navigation.popToTop();
    }
  };

  const confirmDelete = () => {
    Alert.alert('Eliminar libro', '¿Quieres eliminar este libro del catálogo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          if (await handleDelete()) {
            navigation.popToTop();
          }
        },
      },
    ]);
  };

  const textFields: {
    label: string;
    name: CatalogoEditableField;
    keyboardType?: 'default' | 'numeric';
  }[] = [
    { label: 'Título', name: 'titulo' },
    { label: 'Autor', name: 'autor' },
    { label: 'ISBN', name: 'isbn' },
    { label: 'Editorial', name: 'editorial' },
    { label: 'Año', name: 'anio', keyboardType: 'numeric' },
    { label: 'Género', name: 'genero' },
    { label: 'Idioma', name: 'idioma' },
    {
      label: 'Número de páginas',
      name: 'numero_paginas',
      keyboardType: 'numeric',
    },
    { label: 'Ubicación', name: 'ubicacion' },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='handled'
    >
      <TouchableOpacity
        accessibilityRole='button'
        style={styles.backButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>
          {state.id_catalogo === 0 ? 'Nuevo libro' : 'Editar libro'}
        </Text>

        {textFields.map(({ label, name, keyboardType }) => (
          <TextInput
            key={name}
            style={styles.input}
            value={state[name]}
            onChangeText={(text) => handleInputChange(name, text)}
            placeholder={label}
            placeholderTextColor='#8A8F98'
            keyboardType={keyboardType ?? 'default'}
            accessibilityLabel={label}
          />
        ))}

        <Text style={styles.sectionTitle}>Imágenes del libro</Text>
        <Text style={styles.helpText}>
          Elige hasta cuatro imágenes de tu galería.
        </Text>
        {imageFields.map((fieldName, index) => (
          <View key={fieldName} style={styles.imageRow}>
            {state[fieldName] ? (
              <Image
                source={{ uri: imageUri(state[fieldName]) }}
                style={styles.preview}
              />
            ) : (
              <View style={[styles.preview, styles.emptyPreview]}>
                <Text style={styles.emptyPreviewText}>Imagen {index + 1}</Text>
              </View>
            )}
            <View style={styles.imageActions}>
              <TouchableOpacity
                accessibilityRole='button'
                style={styles.secondaryButton}
                onPress={() => void pickImage(fieldName)}
              >
                <Text style={styles.secondaryButtonText}>
                  {state[fieldName] ? 'Cambiar imagen' : 'Seleccionar'}
                </Text>
              </TouchableOpacity>
              {!!state[fieldName] && (
                <TouchableOpacity
                  accessibilityRole='button'
                  onPress={() => handleInputChange(fieldName, '')}
                >
                  <Text style={styles.removeImage}>Quitar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity
          accessibilityRole='button'
          style={styles.primaryButton}
          onPress={() => void submit()}
        >
          <Text style={styles.primaryButtonText}>
            {state.id_catalogo === 0 ? 'Guardar libro' : 'Guardar cambios'}
          </Text>
        </TouchableOpacity>

        {state.id_catalogo !== 0 && (
          <TouchableOpacity
            accessibilityRole='button'
            style={styles.deleteButton}
            onPress={confirmDelete}
          >
            <Text style={styles.deleteButtonText}>Eliminar libro</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#3f2079',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
  },
  title: {
    color: '#263445',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderColor: '#D5D9DE',
    borderRadius: 10,
    borderWidth: 2,
    color: '#263445',
    fontSize: 15,
    marginBottom: 10,
    padding: 12,
  },
  sectionTitle: {
    color: '#263445',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 12,
  },
  helpText: {
    color: '#536273',
    fontSize: 13,
    marginBottom: 10,
  },
  imageRow: {
    alignItems: 'center',
    borderBottomColor: '#E7E9ED',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  preview: {
    backgroundColor: '#F1F2F4',
    borderRadius: 6,
    height: 72,
    width: 72,
  },
  emptyPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  emptyPreviewText: {
    color: '#536273',
    fontSize: 11,
    textAlign: 'center',
  },
  imageActions: {
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 12,
  },
  secondaryButton: {
    backgroundColor: '#EEF0F4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  secondaryButtonText: {
    color: '#3f2079',
    fontSize: 13,
    fontWeight: '600',
  },
  removeImage: {
    color: '#B44949',
    marginTop: 7,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#3f2079',
    borderRadius: 10,
    marginTop: 18,
    padding: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#B44949',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    padding: 12,
  },
  deleteButtonText: {
    color: '#B44949',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
