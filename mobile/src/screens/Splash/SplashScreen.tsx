import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import { colors } from "../../theme/theme";

interface Props {
  navigation: any;
}

export default function SplashScreen() {

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace("Auth");
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [navigation]);

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>☕</Text>
      </View>

      <Text style={styles.title}>
        Devan Cafe Shop
      </Text>

      <Text style={styles.subtitle}>
        Welcome to the Devan Cafe Shop 
      </Text>

      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.loading}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center"
  },

  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },

  logo: {
    fontSize: 55
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primaryDark
  },

  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 8
  },

  loading: {
    marginTop: 30
  }

});