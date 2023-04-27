import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator , StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function App() {
  let [filmes, setFilmes] = useState([])

  const baseURL = "https://api.otaviolube.com/api/filmes?populate=*"
  const img_path = "https://api.otaviolube.com"

  useEffect(function(){
    fetch(baseURL)
      .then(data => data.json())
      .then(objeto => { 
        setFilmes(objeto.data) 
      })
  }, [])

  return (
    <View style={styles.background}>
      <Text style={styles.pageTitle}>Filmes</Text>
      <View style={styles.viewCards}>
      {filmes.length > 0 ? filmes.map(filme => {
        return (
          <View style={styles.card} key={filme.id}>
            <View style={styles.viewImage}> 
              <Image style={styles.poster} source={{
                uri: `${img_path}${filme.attributes.poster.data.attributes.formats.thumbnail.url}`
              }} />
            </View>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>{filme.attributes.titulo}</Text>
              <Text style={styles.synopsis}>{filme.attributes.sinopse}</Text>
              <View style={styles.viewButton}>  
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>ALUGAR</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}) :
          <ActivityIndicator size="large" color="#2c3440"/>}
        </View>
        <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#14181c',
    padding: 15,
  },
  pageTitle: {
    fontSize: 35,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'Left',
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#2c3440',
  },
  card: {
    width: '100%',
    height: 210,
    paddingTop: 15,
    paddingBottom: 18,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#2c3440',
  },
  viewImage: {
    flexGrow: 0,
    flexBasis: 0,
    minWidth: 77,
  },
  poster: {
    width: 77,
    height: 107,
    borderWidth: 1,
    borderColor: '#2c3440',
  },
  viewInfo: {
    flexGrow: 1,
    flexBasis: 0,
    flexDirection: 'column',
    paddingStart: 10,
  },
  title: {
    color: '#EFF',
    textAlign: 'Left',
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 6,
  },
  synopsis: {
    color: '#9ab',
    fontSize: 16,
    overflow: 'scroll',
  },
  viewButton: {
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: '#00c030',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});
