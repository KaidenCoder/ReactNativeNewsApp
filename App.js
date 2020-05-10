import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, Text, View, TextInput, Linking, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';

export default function App() {
  const baseUrl = "https://newsapi.org/v2/everything?q="
  const apiKey = "759a41ef0f944f91a5939ea831376dd8"

  const [state, setstate] = useState({
    s: "",
    results: [],
    selected: {}
  })

  const search = () => {
    axios(baseUrl + state.s + "&apiKey=" + apiKey).then(({ data }) => {
      let results = data.articles
      console.log(results)
      setstate(prevState => {
        return { ...prevState, results: results }
      })
    })
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}><FontAwesome5 name="newspaper" size={40} color="rgba(0,0,0,0.6)" />  NEWS ADDA</Text>
      {/* <View style={styles.searchSection}>
        <FontAwesome5 style={styles.searchIcon} name="search" size={30} color="rgba(0,0,0,0.6)" /> */}

      {/* Search bar */}
      <TextInput
        placeholder="Search News topic..."
        placeholderTextColor="black"
        style={styles.searchbox}
        onChangeText={text => setstate(prevState => {
          return { ...prevState, s: text }
        })}
        onSubmitEditing={search}
        value={state.s}
      />
      {/* </View> */}

      {/* Scroll News */}
      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight key={result.url} onPress={() => Linking.openURL(result.url)}>
            <View key={result.url} style={styles.result}>
              <Image
                source={{ uri: result.urlToImage }}
                style={{
                  width: '100%',
                  height: 200
                }}
                resizeMode="cover"
              />
              <Text style={styles.date}>Source: {result.source.name}</Text>
              <Text style={styles.heading}>
                {result.title}
              </Text>
              <Text style={styles.desc}>{result.description.slice(0, 130)}... Read more</Text>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateleft}>By {result.author}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateright}> {new Date(result.publishedAt).toDateString()}</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>

        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#223343',
    backgroundColor: 'rgba(34,51,67, 0.1)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 32,
    fontWeight: '700',
    textAlign: "center",
    marginBottom: 20
  },
  searchSection: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 40,
    padding: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,

    fontWeight: '300',
    fontSize: 20,
    width: '100%',
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 18,
    fontWeight: '700',

    paddingLeft: 10,
    paddingRight: 10,

    // backgroundColor: '#445565'
    backgroundColor: '#fff'
  },
  desc: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 16,
    padding: 10,
    // backgroundColor: 'rgba(68,85,101, 0.95)'
    backgroundColor: 'rgba(255,255,255, 0.95)'
  },
  date: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
    fontWeight: '600',
    padding: 10,
    backgroundColor: 'rgba(255,255,255, 0.95)'
  },
  dateleft: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
    fontWeight: '600',
    padding: 10,
    backgroundColor: 'rgba(255,255,255, 0.95)'
  },
  dateright: {
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
    padding: 10,
    backgroundColor: 'rgba(255,255,255, 0.95)'
  },
  popup: {
    padding: 20
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#2484C4'
  }
});
