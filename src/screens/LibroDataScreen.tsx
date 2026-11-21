import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl, Pressable } from 'react-native';
import { useLibroResponse } from '../hooks/useLibroResponse';
import { BarChart } from 'react-native-gifted-charts';
import { appTheme } from '../theme/appTheme';
const C = {
  fondo: '#0f172a',
  tarjeta: '#1e293b',
  borde: '#334155',
  texto: '#f1f5f9',
  suave: '#8969bd',
  frio: '#38bdf8',
  calor: '#f87171',
  top: '#fb923c',
  verde: '#34d399', 
  morado: '#a78bfa',
};

type Punto = { value: number; label: string };

const estiloEjes = {
  xAxisLabelTextStyle: { color: C.suave, fontSize: 10 },
  yAxisTextStyle: { color: C.suave, fontSize: 10 },
  xAxisColor: C.borde,
  yAxisColor: C.borde,
  rulesColor: C.borde,
  noOfSections: 4,
  isAnimated: true,
};

function Tarjeta({ titulo, subtitulo, children }: {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}) {
  return (
    <View style={style.tarjeta}>
      <Text style={style.titulo}>{titulo}</Text>
      <Text style={style.sub}>{subtitulo}</Text>
      <View style={{ marginTop: 16 }}>{children}</View>
    </View>
  );
}

function Stat({ label, valor, color, decimales = 1 }: {
  label: string;
  valor: number;
  color: string;
  decimales?: number;
}) {
  return (
    <View style={{ ...style.stat, borderTopColor: color }}>
      <Text style={style.sub}>{label}</Text>
      <Text style={{ ...style.statValor, backgroundColor: color }}>
        {Number(valor).toFixed(decimales)}
      </Text>
    </View>
  );
}

function GraficoBarras({ datos, color }: { datos: Punto[]; color: string }) {
  const { width } = useWindowDimensions();

  return (
    <BarChart
      {...estiloEjes}
      data={datos}
      frontColor={color}
      width={width - 122}
      barWidth={26}
      spacing={22}
      initialSpacing={10}
      roundedTop
    />
  );
}

export const LibroDataScreen = () => {
  const { isLoading, data, errorMessage, loadData } = useLibroResponse();

  if(!data){
    return( 
      <View
        style={ appTheme.container }
      >
        <Text
          style={ appTheme.text }
        >
          {errorMessage ?? (isLoading ? 'Cargando...' : 'No hay datos disponibles.')}
        </Text>
        {errorMessage ? (
          <Pressable onPress={() => void loadData()}>
            <Text style={appTheme.text}>Reintentar</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  const { total } = data;

  const porDecada = [...data.librosPorDecada]
    .map(({ decada, total }) => ({
      value: Number(total),
      label: String(decada)
    }))
    .sort((a, b) => Number(b.value) - Number(a.value))
    .slice(0, 8);
  const porGenero = [...data.librosPorGenero]
    .sort((a, b) => Number(b.total) - Number(a.total))
    .slice(0, 8)
    .map(c => ({
      value: Number(c.total),
      label: c.genero,
    }));

  const { libroReciente, libroAntiguo } = data.libroRecienteYAntiguo;

  return(
    <ScrollView
      scrollEnabled={ true }
      style={ style.pantalla }
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor={C.frio}
          colors={[C.frio]}
          progressBackgroundColor={C.tarjeta}
        />
      }
    >
      <View>
        <Text style={style.header}>Monitor de libros</Text>
        <Text style={style.sub}>{total} libros registrados</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Géneros" valor={data.librosPorGenero.length} color={C.verde} decimales={0} />
        <Stat label="Autores con +1 libro" valor={data.autoresConMasDeUnLibro.length} color={C.morado} decimales={0} />
      </View>

      <Tarjeta titulo="Libros por género" subtitulo="Cantidad de libros por género con más libros">
        <GraficoBarras datos={porGenero} color={C.frio} />
      </Tarjeta>

      <Tarjeta titulo="Libros por década" subtitulo="Las décadas con más libros">
        {porDecada.length > 0
          ? <GraficoBarras datos={porDecada} color={C.top} />
          : <Text style={style.itemSub}>No hay datos por década.</Text>}
      </Tarjeta>

      <Tarjeta titulo="Libros antes de 1960" subtitulo="Año y titulo de los libros publicados antes de 1960">
        {data.librosAntes1960.length > 0 ? data.librosAntes1960.map(libro => (
          <View key={libro.id_libro} style={style.item}>
            <Text style={style.itemTexto}>{libro.titulo}</Text>
            <Text style={style.itemSub}>{libro.anio_publicacion}</Text>
          </View>
        )) : <Text style={style.itemSub}>No hay libros anteriores a 1960.</Text>}
      </Tarjeta>

      <Tarjeta titulo="Autores mexicanos por año" subtitulo="Libros agrupados por año">
        {data.librosMexicanosPorAnio.length > 0 ? data.librosMexicanosPorAnio.map(item => (
          <View key={String(item.anio_publicacion)} style={style.item}>
            <Text style={style.itemTexto}>{item.anio_publicacion}</Text>
            <Text style={style.itemSub}>{item.total} libros</Text>
          </View>
        )) : <Text style={style.itemSub}>No hay libros de autores mexicanos.</Text>}
      </Tarjeta>

      <Tarjeta titulo="Autores con más de un libro" subtitulo="Nombre y cantidad de libros">
        {data.autoresConMasDeUnLibro.length > 0 ? data.autoresConMasDeUnLibro.map(item => (
          <View key={item.autor} style={style.item}>
            <Text style={style.itemTexto}>{item.autor}</Text>
            <Text style={style.itemSub}>{item.total} libros</Text>
          </View>
        )) : <Text style={style.itemSub}>No hay autores con más de un libro.</Text>}
      </Tarjeta>

      <Tarjeta titulo="Más reciente y más antiguo" subtitulo="Libros">
        {libroReciente && (
          <View style={style.item}>
            <Text style={style.itemTexto}>Más reciente: {libroReciente.titulo} {libroReciente.autor}</Text>
            <Text style={style.itemSub}>{libroReciente.anio_publicacion}</Text>
          </View>
        )}
        {libroAntiguo && (
          <View style={style.item}>
            <Text style={style.itemTexto}>Más antiguo: {libroAntiguo.titulo} · {libroAntiguo.autor}</Text>
            <Text style={style.itemSub}>{libroAntiguo.anio_publicacion}</Text>
          </View>
        )}
        {!libroReciente && !libroAntiguo && (
          <Text style={style.itemSub}>No hay libros registrados.</Text>
        )}
      </Tarjeta>
    </ScrollView>
    );
}

const style = StyleSheet.create({
  pantalla: { flex:1, backgroundColor: C.fondo },
  centro: { justifyContent: 'center', alignItems: 'center' },
  header: { color: C.texto, fontSize: 13 },
  sub: { color: C.texto, fontSize: 26, fontWeight: "bold" },
  fila: { flexDirection: 'row', gap: 10, padding: 5 },
  stat: { flex: 1, backgroundColor: C.tarjeta, borderRadius: 12, borderTopWidth: 3, padding: 12 },
  statValor: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  tarjeta: {
    backgroundColor: C.tarjeta,
    borderColor: C.borde,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 15
  },
  titulo: { color: C.texto, fontSize: 17, fontWeight: 'bold' },
  leyenda: { flexDirection: 'row', textAlign: 'center', gap: 6 },
  punto: { width: 10, height: 10, borderRadius: 5 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: C.borde
  },
  itemTexto: { color: C.texto, fontSize: 14 },
  itemSub: { color: C.suave, fontSize: 12, fontWeight: 'bold' }
});