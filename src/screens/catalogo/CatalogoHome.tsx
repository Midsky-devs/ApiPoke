import { useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CatalogoCard } from '../../components/CatalogoCard';
import { CatalogoFormData } from '../../interfaces/catalogo';
import { StackCatalogoParams } from '../../navigator/CatalogoStackNavigator';
import { useCatalogoApi } from '../../hooks/useCatalogoApi';

export const CatalogoHome = () => {
  const { isLoading, listCatalogo, loadCatalogo } = useCatalogoApi();
  const focused = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<StackCatalogoParams>>();

  useEffect(() => {
    if (focused) {
      void loadCatalogo();
    }
  }, [focused]);

  const create: CatalogoFormData = {
    id_catalogo: 0,
    titulo: '',
    autor: '',
    isbn: '',
    editorial: '',
    anio: '',
    genero: '',
    idioma: '',
    numero_paginas: '',
    ubicacion: '',
    imagen_1: '',
    imagen_2: '',
    imagen_3: '',
    imagen_4: '',
  };

  return (
    <FlatList
      data={listCatalogo}
      keyExtractor={(item) => String(item.id_catalogo)}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Catálogo de libros</Text>
          <TouchableOpacity
            accessibilityRole='button'
            style={styles.createButton}
            onPress={() => navigation.navigate('FormCatalogo', create)}
          >
            <Text style={styles.createButtonText}>Agregar libro</Text>
          </TouchableOpacity>
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadCatalogo}
          colors={['purple', 'black']}
          progressBackgroundColor='white'
        />
      }
      ListEmptyComponent={!isLoading
        ? <Text style={styles.emptyText}>Todavía no hay libros registrados.</Text>
        : undefined}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <CatalogoCard libro={item} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 8,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#d5d9de',
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 15,
    padding: 15,
    width: '90%',
  },
  title: {
    color: '#263445',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  createButton: {
    backgroundColor: '#3f2079',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyText: {
    color: '#536273',
    fontSize: 14,
    marginTop: 20,
  },
});
