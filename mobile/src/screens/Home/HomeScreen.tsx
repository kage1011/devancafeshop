import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { colors } from "../../theme/theme";

export default function HomeScreen() {

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View>
          <Text style={styles.welcome}>
            Xin chào 👋
          </Text>

          <Text style={styles.title}>
            Café Management
          </Text>
        </View>

      </View>

      <View style={styles.grid}>

        <TouchableOpacity
          style={styles.card}
        >
          <Text style={styles.icon}>
            🪑
          </Text>

          <Text style={styles.cardTitle}>
            Quản lý bàn
          </Text>

          <Text style={styles.cardDescription}>
            Theo dõi trạng thái bàn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
        >
          <Text style={styles.icon}>
            🧾
          </Text>

          <Text style={styles.cardTitle}>
            Order
          </Text>

          <Text style={styles.cardDescription}>
            Quản lý đơn hàng
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
        >
          <Text style={styles.icon}>
            ☕
          </Text>

          <Text style={styles.cardTitle}>
            Menu
          </Text>

          <Text style={styles.cardDescription}>
            Quản lý sản phẩm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
        >
          <Text style={styles.icon}>
            📊
          </Text>

          <Text style={styles.cardTitle}>
            Báo cáo
          </Text>

          <Text style={styles.cardDescription}>
            Doanh thu & thống kê
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    backgroundColor: colors.primary
  },

  welcome: {
    color: "#EADFD5",
    fontSize: 14
  },

  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12
  },

  card: {
    width: "46%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    margin: "2%",
    minHeight: 150,
    justifyContent: "center"
  },

  icon: {
    fontSize: 38,
    marginBottom: 10
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primaryDark
  },

  cardDescription: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5
  }

});