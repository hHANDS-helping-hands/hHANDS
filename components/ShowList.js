import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import dataGenerator from "../utilities/DataGenerator";
import Color from "../constants/colors";
import debugMode from "../constants/debug";

export default function ShowList() {
  DATA = dataGenerator(200);
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <View style={{ ...styles.doneeDetail, ...debugMode.debug }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.time}</Text>
          <Text>{item.problem}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  doneeDetail: {
    margin: 4,
    elevation: 0.4,
    padding: 8
  },
  name: {
    fontSize: 18,
    color: Color.Black
  }
});
