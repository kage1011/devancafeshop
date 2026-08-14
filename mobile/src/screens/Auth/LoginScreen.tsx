import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";

import { colors } from "../../theme/theme";

interface Props {
  navigation: any;
}

export default function LoginScreen({
  navigation
}: Props) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (!username || !password) {

      Alert.alert(
        "Thông báo",
        "Vui lòng nhập đầy đủ thông tin"
      );

      return;
    }

    // Tạm thời chuyển Home
    navigation.replace("Home");
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <View style={styles.content}>

        <Text style={styles.logo}>
          ☕
        </Text>

        <Text style={styles.title}>
          Chào mừng trở lại
        </Text>

        <Text style={styles.subtitle}>
          Đăng nhập để quản lý quán café
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            ĐĂNG NHẬP
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>

          <Text style={styles.registerText}>
            Chưa có tài khoản?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Register")
            }
          >
            <Text style={styles.registerLink}>
              Đăng ký
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: colors.primaryDark
  },

  subtitle: {
    textAlign: "center",
    color: colors.gray,
    marginTop: 8,
    marginBottom: 35
  },

  input: {
    height: 54,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: colors ? 12 : 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
    color: colors.black
  },

  button: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700"
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25
  },

  registerText: {
    color: colors.gray
  },

  registerLink: {
    color: colors.primary,
    fontWeight: "700",
    marginLeft: 5
  }

});