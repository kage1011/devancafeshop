import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { colors } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  navigation: any;
}

export default function AdminHomeScreen({ navigation }: Props) {
  const handleOrderPress = () => {
    navigation.navigate('AdminOrder' as never);
  };
  const handleProductPress = () => {
    navigation.navigate('AdminProduct' as never);
  };
  const handleUserPress = () => {
    navigation.navigate('AdminUser' as never);
  };
  const handleTablePress = () => {
    navigation.navigate('AdminTable' as never);
  };
  const handleGroupProductPress = () => {
    navigation.navigate('AdminCategories' as never);
  };
  const handleReportPress = () => {
    navigation.navigate('AdminReport' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Xin chào 👋</Text>
          <Text style={styles.title}>Café Management</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={handleUserPress}>
          <Text style={styles.icon}>USER</Text>
          <Text style={styles.cardTitle}>Quản lý người dùng</Text>
          <Text style={styles.cardDescription}>
            Theo dõi thông tin người dùng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleProductPress}>
          <Text style={styles.icon}>Sản phẩm</Text>
          <Text style={styles.cardTitle}>Quản lý sản phẩm</Text>
          <Text style={styles.cardDescription}>
            Theo dõi thông tin sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleGroupProductPress}>
          <Text style={styles.icon}>Nhóm sản phẩm</Text>
          <Text style={styles.cardTitle}>Quản lý nhóm sản phẩm</Text>
          <Text style={styles.cardDescription}>
            Theo dõi thông tin nhóm sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleTablePress}>
          <Text style={styles.icon}>🪑</Text>
          <Text style={styles.cardTitle}>Quản lý bàn</Text>
          <Text style={styles.cardDescription}>Theo dõi trạng thái bàn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleOrderPress}>
          <Text style={styles.icon}>🧾</Text>
          <Text style={styles.cardTitle}>Quản lý đơn hàng</Text>
          <Text style={styles.cardDescription}>Theo dõi tiến độ đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleReportPress}>
          <Text style={styles.icon}>📊</Text>
          <Text style={styles.cardTitle}>Báo cáo</Text>
          <Text style={styles.cardDescription}>Doanh thu & thống kê</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    backgroundColor: colors.primary,
  },

  welcome: {
    color: '#EADFD5',
    fontSize: 14,
  },

  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },

  card: {
    width: '46%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    margin: '2%',
    minHeight: 150,
    justifyContent: 'center',
  },

  icon: {
    fontSize: 38,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primaryDark,
  },

  cardDescription: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },
});
