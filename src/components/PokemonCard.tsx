import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { NewPokemon } from "../interfaces/pokemonResponse";
import { useTypeColorPokemon } from "../hooks/useTypeColorPokemon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PokemonParams } from "../navigator/PokemonNavigator";

interface Props{
  pokemon: NewPokemon;
}

const withWindows = Dimensions.get('window').width;

export const PokemonCard = ( { pokemon }: Props ) => {

  const { color, isLoading } = useTypeColorPokemon(`${pokemon.id}`);
  const navigation = useNavigation<StackNavigationProp<PokemonParams>>();

  return (
    <TouchableOpacity
      onPress={ () => navigation.navigate('PokemonDetail', { NewPokemon: pokemon }) }
    >
      <View
        style={{
          ...style.containerCard,
          width: withWindows * 0.42,
          borderLeftColor: (isLoading) ? 'gray' :
            (color.length > 1) ? color[1] : color[0]
        }}
      >
        <View
          style={{
            ...style.backgroundTop,
            backgroundColor: (isLoading) ? 'gray' :
            (color.length > 1) ? color[1]: color[0]
          }}
        />
        <View
          style={{
            ...style.backgroundButtom,
            backgroundColor: (isLoading) ? 'gray' :
            color[0]
          }}
        />
        <Text
          style={ style.name }
        >
          {pokemon.name}
          { `\n#${pokemon.id}` }
        </Text>
        <Image
          style={ style.pokeball }
          source={ require('./../../assets/pokeball-light.png') }
        />
        <Image
          style={style.pokemon}
          source={{ uri: pokemon.image }}
        />
      </View>
    </TouchableOpacity>
  );

}

const style = StyleSheet.create({
  containerCard: {
    marginHorizontal: 8,
    padding: 16,
    minHeight: 100,
    borderRadius: 20,
    borderLeftWidth: 6,
    borderStyle: 'solid',
    backgroundColor: "white",
    alignSelf: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  backgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    backgroundColor: 'purple',
    opacity: 0.12,
    transform: [
      { rotateX: "20deg" },
      { rotateY: "-45deg" },
      { scale: 2 }
    ]
  },
  backgroundButtom: {
    position: 'absolute', 
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'violet',
    opacity: 0.12,
    transform: [
      { rotateX: "20deg" },
      { rotateY: "-45deg" },
      { scale: 2 }
    ]
  },
  pokeball: {
    height: 125,
    width: 125,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.7
  },
  pokemon: {
    height: 100,
    width: 100,
    position: 'absolute',
    right: -8,
    bottom: -15,
    opacity: 0.9
  },
  name: {
    color: '#1f2430',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
    zIndex: 1
  }
});