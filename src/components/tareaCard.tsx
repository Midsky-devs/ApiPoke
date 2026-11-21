import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TareaResponse } from '../interfaces/pandoraApiResponse';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackTareaParams } from '../navigator/TareaStackNavigator';

interface Props {
  tarea: TareaResponse;
}

export const TareaCard = ( { tarea}: Props ) => {
  const navigation = useNavigation<StackNavigationProp<StackTareaParams>>();
  return (
    <TouchableOpacity
      onPress={  () => navigation.navigate('FormTarea',{...tarea})  }
    >

      <View style={style.cardContainer}>
        <Text style={style.title} numberOfLines={2}>
          {tarea.titulo}
        </Text>
        <Text style={style.status} numberOfLines={1}>
          {tarea.estado}
        </Text>
        <Text style={style.description} numberOfLines={4}>
          {tarea.descripcion}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#d5d9de',
    borderRadius: 10,
    borderWidth: 2,
    height: 170,
    justifyContent: 'flex-start',
    marginHorizontal: 5,
    marginBottom: 12,
    overflow: 'hidden',
    padding: 12,
    width: 150
  },
  title: {
    color: '#263445',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  status: {
    color: '#3f2079',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8
  },
  description: {
    color: '#536273',
    fontSize: 12
  }
});