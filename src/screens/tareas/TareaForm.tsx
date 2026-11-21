import { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackTareaParams } from '../../navigator/TareaStackNavigator';
import { useTareaForm } from '../../hooks/useTareaForm';
import { EstadoTarea } from '../../interfaces/pandoraApiResponse';

interface Props extends StackScreenProps<StackTareaParams, 'FormTarea'> {};

export const FormTarea = ({ route, navigation }: Props) => {
  const { state, handleInputChange, handleSubmit, handleDelete, handleUpdate } = useTareaForm();

  useEffect(() => {
    const tarea = route.params;
    handleInputChange('id_tarea', tarea.id_tarea);
    handleInputChange('titulo', tarea.titulo);
    handleInputChange('descripcion', tarea.descripcion);
    handleInputChange('estado', tarea.estado);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='handled'
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>
          {state.id_tarea === 0 ? 'Nueva tarea' : 'Editar tarea'}
        </Text>

        <TextInput
          style={styles.input}
          value={state.titulo}
          onChangeText={(text) => handleInputChange('titulo', text)}
          placeholder='Título'
          placeholderTextColor='#8A8F98'
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={state.descripcion}
          onChangeText={(text) => handleInputChange('descripcion', text)}
          placeholder='Descripción'
          placeholderTextColor='#8A8F98'
          multiline
          textAlignVertical='top'
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={async () => {
            await handleSubmit();
            navigation.popToTop();
          }}
        >
          <Text style={styles.primaryButtonText}>
            {state.id_tarea === 0 ? 'Crear tarea' : 'Guardar cambios'}
          </Text>
        </TouchableOpacity>

        {state.id_tarea !== 0 && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={async () => {
              await handleDelete();
              navigation.popToTop();
            }}
          >
            <Text style={styles.deleteButtonText}>Eliminar tarea</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>Estado</Text>
        {Object.values(EstadoTarea).map((estado) => (
          <TouchableOpacity
            key={estado}
            style={[
              styles.statusButton,
              state.estado === estado && styles.selectedStatusButton
            ]}
            onPress={async () => {
              await handleUpdate(estado);
              navigation.popToTop();
            }}
          >
            <Text
              style={[
                styles.statusButtonText,
                state.estado === estado && styles.selectedStatusButtonText
              ]}
            >
              {estado}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 32
  },
  backButton: {
    backgroundColor: '#3f2079',
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 12
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 15
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 25
  },
  title: {
    color: '#263445',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderColor: '#D5D9DE',
    borderRadius: 10,
    borderWidth: 2,
    color: '#263445',
    fontSize: 12,
    marginBottom: 10,
    padding: 10
  },
  descriptionInput: {
    minHeight: 90
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#3f2079',
    borderRadius: 10,
    padding: 10
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15
  },
  deleteButton: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#B44949',
    borderRadius: 10,
    color: '#B44949',
    fontSize: 14,
  },
  deleteButtonText: {
    color: '#B44949',
    fontSize: 14,
    fontWeight: 'bold'
  },
  sectionTitle: {
    color: '#263445',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10
  },
  statusButton: {
    borderColor: '#bbbbbb',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 6,
    padding: 8
  },
  selectedStatusButton: {
    backgroundColor: '#3f2079',
  },
  statusButtonText: {
    color: '#536273',
    fontSize: 14,
    textAlign: 'center'
  },
  selectedStatusButtonText: {
    color: '#FFFFFF',
    fontWeight: '600'
  }
});
