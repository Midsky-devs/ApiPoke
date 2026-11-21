import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PokemonDetailResponse } from '../interfaces/pokemonResponse';

interface Props {
  pokemon: PokemonDetailResponse;
  types: string[];
}

export const PokemonFull = ({ pokemon, types }: Props) => {
  return (
    <View style={style.generalContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={style.box}>
          <Text style={style.boxTitle}>Tipos:</Text>
          <Text>
            {pokemon.types?.map(({ type }) => (
              <Text
                style={style.text}
                key={`${type.name}-${type.url}`}
              >
                {`${type.name} `}
              </Text>
            ))}
          </Text>
        </View>

        <View style={style.row}>
          <View style={[style.box, style.halfBox]}>
            <Text style={style.boxTitle}>Peso</Text>
            <Text style={style.text}>Peso: {pokemon.weight}</Text>
          </View>
          
          <View style={[style.box, style.halfBox]}>
            <Text style={style.boxTitle}>Exp. Base</Text>
            <Text style={style.text}>ExpBase: {pokemon.base_experience}</Text>
          </View>
        </View>

        <View style={style.box}>
          <Text style={style.boxTitle}>
            Default: {pokemon.is_default ? 'True' : 'False'}
          </Text>
          
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {pokemon.sprites?.front_shiny && (
              <Image style={style.picture} source={{ uri: pokemon.sprites.front_shiny }} />
            )}
            {pokemon.sprites?.back_shiny && (
              <Image style={style.picture} source={{ uri: pokemon.sprites.back_shiny }} />
            )}
            {pokemon.sprites?.front_female && (
              <Image style={style.picture} source={{ uri: pokemon.sprites.front_female }} />
            )}
            {pokemon.sprites?.back_female && (
              <Image style={style.picture} source={{ uri: pokemon.sprites.back_female }} />
            )}
            {pokemon.sprites?.front_shiny_female && (
              <Image style={style.picture} source={{ uri: pokemon.sprites.front_shiny_female }} />
            )}
            {pokemon.sprites?.back_shiny_female && (
              <Image style={style.picture} source={{ uri: pokemon.sprites.back_shiny_female }} />
            )}
          </ScrollView>
        <View style={style.box}>
          <Text style={style.boxTitle}>Habilidades</Text>
          <Text style={style.text}>
            {pokemon.abilities?.map((item, index) => (
              <Text key={`ability-${index}`}>
                {item.ability?.name}{' '}
              </Text>
            ))}
          </Text>
        </View>
        
        <View style={style.box}>
          <Text style={style.boxTitle}>Forma</Text>
          <Text style={style.text}>
            {pokemon.forms?.map((item, index) => (
              <Text key={`form-${index}`}>
                {item.name}{' '}
              </Text>
            ))}
          </Text>
        </View>
        </View>

      </ScrollView>
    </View>
  );
};
  const style = StyleSheet.create({
    containerDetail: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 25,
      textAlign: 'center'
    },
    picture: {
      width: 150,
      height: 150
    },
    generalContainer: { 
      padding: 20,
      backgroundColor: '#ae2d4b',
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    box: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 15,
      marginBottom: 15,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3, 
    },
    halfBox: {
      width: '48%',
    },
    boxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#666',
      marginBottom: 8,
    }
  });