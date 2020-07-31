import React from "react";
import { View, StyleSheet } from "react-native";
import { CardAnimationContext } from "react-navigation-stack";

export default function Card(props) {
  return (
    <View
      style={{
        ...styles.card,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
});
