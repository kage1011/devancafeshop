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

export default function RegisterScreen({
  navigation
}: Props) {

  const [fullName, setFullName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleRegister = () => {

    if (
      !fullName ||
      !username ||
      !password ||
      !confirmPassword
    ) {

      Alert.alert(
        "Thông báo",
        "Vui lòng nhập đầy đủ thông tin"
      );

      return;
    }

    if (password !== confirmPassword) {

      Alert.alert(
        "Thông báo",
        "Mật khẩu xác nhận không khớp"
      );

      return;
    }

    Alert.alert(
      "Thành công",
      "Đăng ký tài khoản thành công",
      [
        {
          text: "Đăng nhập",
          onPress: () =>
            navigation.navigate("Login")
        }
      ]
    );
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
          Tạo tài khoản
        </Text>

        <Text style={styles.subtitle}>
          Đăng ký tài khoản quản lý café
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />

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

        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >

          <Text style={styles.buttonText}>
            ĐĂNG KÝ
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>
            navigation.navigate("Login")
          }
        >

          <Text style={styles.loginText}>
            Đã có tài khoản? Đăng nhập
          </Text>

        </TouchableOpacity>

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
    fontSize: 55,
    textAlign: "center",
    marginBottom: 15
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
    marginBottom: 30
  },

  input: {
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
    color: colors.black
  },

  button: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700"
  },

  loginButton: {
    alignItems: "center",
    marginTop: 20
  },

  loginText: {
    color: colors.primary,
    fontWeight: "600"
  }

});