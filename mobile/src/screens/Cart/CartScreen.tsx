import React, { useMemo, useState } from 'react';

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ProductCard from '../../components/order/ProductCard';

import { CartItem, Product } from '../../types/order.types';

import { categories, products } from '../../data/mockProducts';

const CartScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    categories[0].id,
  );

  const [cart, setCart] = useState<CartItem[]>([]);

  /**
   * Product theo category
   */
  const filteredProducts = useMemo(() => {
    return products.filter(
      product => product.categoryId === selectedCategoryId,
    );
  }, [selectedCategoryId]);

  /**
   * Thêm sản phẩm vào cart
   */
  const handleAddProduct = (product: Product) => {
    setCart(currentCart => {
      const existingProduct = currentCart.find(item => item.id === product.id);

      if (existingProduct) {
        return currentCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  /**
   * Tổng số sản phẩm
   */
  const totalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  /**
   * Tổng tiền
   */
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Order</Text>

            <Text style={styles.subtitle}>Chọn món bạn yêu thích</Text>
          </View>

          <View style={styles.cartIcon}>
            <Text style={styles.cartIconText}>🛒</Text>

            {totalQuantity > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalQuantity}</Text>
              </View>
            )}
          </View>
        </View>

        {/* CATEGORY */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map(category => {
              const isSelected = category.id === selectedCategoryId;

              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    isSelected && styles.categoryItemSelected,
                  ]}
                  onPress={() => setSelectedCategoryId(category.id)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* PRODUCT LIST */}
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard product={item} onAdd={handleAddProduct} />
          )}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
        {/* CART SUMMARY */}
        {cart.length > 0 && (
          <View style={styles.cartSummary}>
            <View>
              <Text style={styles.cartSummaryTitle}>{totalQuantity} món</Text>

              <Text style={styles.cartSummaryPrice}>
                {totalPrice.toLocaleString('vi-VN')}đ
              </Text>
            </View>

            <TouchableOpacity
              style={styles.viewCartButton}
              onPress={() => {
                // TODO:
                // navigate('Cart')
              }}
            >
              <Text style={styles.viewCartText}>Xem order</Text>

              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7F4',
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222222',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#888888',
  },

  cartIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  cartIconText: {
    fontSize: 23,
  },

  cartBadge: {
    position: 'absolute',
    right: -3,
    top: -3,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  categoryContainer: {
    marginBottom: 12,
  },

  categoryContent: {
    paddingHorizontal: 20,
  },

  categoryItem: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  categoryItemSelected: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },

  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },

  categoryTextSelected: {
    color: '#FFFFFF',
  },

  productList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    width: '50%',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between', // Đẩy 2 card ra 2 bên
    marginBottom: 16, // Khoảng cách giữa các dòng
  },
  cartSummary: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 15,

    backgroundColor: '#FFFFFF',
    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 14,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  cartSummaryTitle: {
    fontSize: 13,
    color: '#777777',
  },

  cartSummaryPrice: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '800',
    color: '#8B4513',
  },

  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#8B4513',

    paddingHorizontal: 18,
    paddingVertical: 11,

    borderRadius: 22,
  },

  viewCartText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 8,
  },
});
