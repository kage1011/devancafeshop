import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Product } from '../../types/order.types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard = ({
  product,
  onAdd,
}: ProductCardProps) => {
  return (
    <View
      style={[
        styles.container,
        product.isSoldOut && styles.soldOutContainer,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
        />

        {/* HOT */}
        {product.isHot && !product.isSoldOut && (
          <View style={styles.hotBadge}>
            <Text style={styles.hotText}>🔥 HOT</Text>
          </View>
        )}

        {/* SOLD OUT */}
        {product.isSoldOut && (
          <View style={styles.soldOutOverlay}>
            <View style={styles.soldOutBadge}>
              <Text style={styles.soldOutText}>
                SOLD OUT
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        {product.description && (
          <Text
            style={styles.description}
            numberOfLines={2}
          >
            {product.description}
          </Text>
        )}

        <View style={styles.bottom}>
          <Text style={styles.price}>
            {product.price.toLocaleString('vi-VN')}đ
          </Text>

          {!product.isSoldOut && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAdd(product)}
            >
              <Text style={styles.addButtonText}>
                +
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    width: '100%'
  },

  soldOutContainer: {
    opacity: 0.7,
  },

  imageContainer: {
    position: 'relative',
    height: 180,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  hotBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF5722',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  hotText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  soldOutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  soldOutBadge: {
    backgroundColor: '#333333',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 6,
  },

  soldOutText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  content: {
    padding: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },

  description: {
    marginTop: 5,
    fontSize: 13,
    color: '#777777',
    lineHeight: 18,
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513',
  },

  addButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '400',
    lineHeight: 28,
  },
});