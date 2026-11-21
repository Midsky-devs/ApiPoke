import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { TareaResponse, EstadoTarea } from '../../interfaces/pandoraApiResponse';
import { useTareaApi } from '../../hooks/useTareaApi';
import { TareaCard } from '../../components/tareaCard';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackTareaParams } from '../../navigator/TareaStackNavigator';

export const HomeTareas = () => {
  const { isLoading, loadTarea, listTarea } = useTareaApi();
  const focused = useIsFocused();
  const navigation = useNavigation<StackNavigationProp<StackTareaParams>>();

  useEffect(() => {
    (!isLoading) && loadTarea();
  }, [focused]);

  const create: TareaResponse = {
    id_tarea: 0,
    titulo: '',
    descripcion: '',
    estado: EstadoTarea.pendiente
  };

  return (
    <View>
      <FlatList
        data={listTarea}
        keyExtractor={(item) => `#${item.id_tarea}`}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={(
          <View style={styles.header}>
            <Text style={styles.title}>Mis tareas</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('FormTarea', { ...create })}
            >
              <Text style={styles.createButtonText}>Crear tarea</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={ isLoading }
            onRefresh={ loadTarea }
            colors={[ "purple", "black" ]}
            progressBackgroundColor='black'
          />
        )}
        ListEmptyComponent={!isLoading
          ? <Text style={styles.emptyText}>No hay tareas todavía.</Text>
          : undefined}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <TareaCard tarea={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 2,
    alignItems: 'center',
    padding: 2,
    
  },
  header: {
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderColor:'#d5d9de',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  title: {
    color: '#263445',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12
  },
  createButton: {
    alignSelf: 'center',
    backgroundColor: '#3f2079',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 14
  },
  emptyText: {
    color: '#536273',
    fontSize: 14
  }
});
