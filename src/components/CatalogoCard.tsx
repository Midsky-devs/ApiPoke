import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CatalogoResponse } from '../interfaces/catalogo';
import { StackCatalogoParams } from '../navigator/CatalogoStackNavigator';

interface Props {
  libro: CatalogoResponse;
}

const imageUri = (image: string) =>
  image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;

export const CatalogoCard = ({ libro }: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<StackCatalogoParams>>();
  const cover = libro.imagen_1 || libro.imagen_2;

  return (
    <TouchableOpacity
      accessibilityRole='button'
      onPress={() =>
        navigation.navigate('FormCatalogo', {
          ...libro,
          anio: String(libro.anio),
          numero_paginas: String(libro.numero_paginas),
          imagen_1: libro.imagen_1 ?? '',
          imagen_2: libro.imagen_2 ?? '',
          imagen_3: libro.imagen_3 ?? '',
          imagen_4: libro.imagen_4 ?? '',
        })
      }
    >
      <View style={styles.card}>
        {cover ? (
          <Image
            source={{ uri: imageUri(cover) }}
            style={styles.cover}
            resizeMode='cover'
          />
        ) : (
          <View style={[styles.cover, styles.noCover]}>
            <Text style={styles.noCoverText}>Sin imagen</Text>
          </View>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {libro.titulo}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {libro.autor}
        </Text>
        <Text style={styles.details} numberOfLines={2}>
          {libro.editorial} · {libro.anio}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#d5d9de',
    borderRadius: 10,
    borderWidth: 2,
    margin: 6,
    overflow: 'hidden',
    padding: 10,
    width: 160,
  },
  cover: {
    backgroundColor: '#F1F2F4',
    borderRadius: 6,
    height: 150,
    marginBottom: 8,
    width: '100%',
  },
  noCover: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCoverText: {
    color: '#536273',
    fontSize: 13,
  },
  title: {
    color: '#263445',
    fontSize: 15,
    fontWeight: 'bold',
  },
  author: {
    color: '#3f2079',
    fontSize: 13,
    marginTop: 4,
  },
  details: {
    color: '#536273',
    fontSize: 12,
    marginTop: 4,
  },
});
