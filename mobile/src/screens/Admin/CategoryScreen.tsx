import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCategory } from '../../context/CategoryContext';

type Category = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  productCount?: number;
};

type CategoryForm = {
  name: string;
  description: string;
  image: string;
  isActive: boolean;
};

const initialForm: CategoryForm = {
  name: '',
  description: '',
  image: '',
  isActive: true,
};

const AdminCategoryScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryForm>(initialForm);
  const { category, isLoading, loadCategory, createCategory } = useCategory();

  const handleLoadCategory = async () => {
    try {
      setLoading(true);
      await loadCategory();
    } catch (error: any) {
      Alert.alert('Đăng nhập thất bại', 'Username hoặc password không đúng');
    } finally {
      setLoading(false);
    }
  };

  /**
   * REFRESH
   */
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await handleLoadCategory();
    } finally {
      setRefreshing(false);
    }
  };

  const handleCreateCategory = async () => {
    try {
      setLoading(true);
      if (!form.name.trim()) {
        Alert.alert('Thông báo', 'Vui lòng nhập tên nhóm sản phẩm.');
        return;
      }
      await createCategory(
        form.name.trim(),
        form.description.trim(),
        form.image.trim(),
        form.isActive
      );
    } catch (error: any) {
      Alert.alert('Tạo mới thất bại', 'Không thể tạo nhóm sản phẩm mới');
    } finally {
      setLoading(false);
    }
  };

  // /**
  //  * CREATE CATEGORY
  //  */
  // const createCategory = async () => {
  //     try {
  //         if (!form.name.trim()) {
  //             Alert.alert(
  //                 'Thông báo',
  //                 'Vui lòng nhập tên nhóm sản phẩm.'
  //             );
  //             return;
  //         }

  //         const payload = {
  //             name: form.name.trim(),
  //             description:
  //                 form.description.trim(),
  //             image: form.image.trim(),
  //             isActive: form.isActive,
  //         };

  //         const response = await fetch(
  //             `${API_URL}/categories`,
  //             {
  //                 method: 'POST',
  //                 headers: {
  //                     'Content-Type':
  //                         'application/json',
  //                 },
  //                 body: JSON.stringify(payload),
  //             }
  //         );

  //         if (!response.ok) {
  //             throw new Error(
  //                 'Create category failed'
  //             );
  //         }

  //         Alert.alert(
  //             'Thành công',
  //             'Đã thêm nhóm sản phẩm.'
  //         );

  //         closeModal();

  //         await fetchCategories();
  //     } catch (error) {
  //         console.error(
  //             'CREATE CATEGORY ERROR:',
  //             error
  //         );

  //         Alert.alert(
  //             'Lỗi',
  //             'Không thể thêm nhóm sản phẩm.'
  //         );
  //     }
  // };

  // /**
  //  * UPDATE CATEGORY
  //  */
  // const updateCategory = async () => {
  //     if (!editingCategory) {
  //         return;
  //     }

  //     try {
  //         if (!form.name.trim()) {
  //             Alert.alert(
  //                 'Thông báo',
  //                 'Vui lòng nhập tên nhóm sản phẩm.'
  //             );
  //             return;
  //         }

  //         const payload = {
  //             name: form.name.trim(),
  //             description:
  //                 form.description.trim(),
  //             image: form.image.trim(),
  //             isActive: form.isActive,
  //         };

  //         const response = await fetch(
  //             `${API_URL}/categories/${editingCategory._id}`,
  //             {
  //                 method: 'PUT',
  //                 headers: {
  //                     'Content-Type':
  //                         'application/json',
  //                 },
  //                 body: JSON.stringify(payload),
  //             }
  //         );

  //         if (!response.ok) {
  //             throw new Error(
  //                 'Update category failed'
  //             );
  //         }

  //         Alert.alert(
  //             'Thành công',
  //             'Đã cập nhật nhóm sản phẩm.'
  //         );

  //         closeModal();

  //         await fetchCategories();
  //     } catch (error) {
  //         console.error(
  //             'UPDATE CATEGORY ERROR:',
  //             error
  //         );

  //         Alert.alert(
  //             'Lỗi',
  //             'Không thể cập nhật nhóm sản phẩm.'
  //         );
  //     }
  // };

  // /**
  //  * DELETE CATEGORY
  //  */
  // const deleteCategory = (
  //     category: Category
  // ) => {
  //     Alert.alert(
  //         'Xóa nhóm sản phẩm',
  //         `Bạn có chắc muốn xóa "${category.name}"?`,
  //         [
  //             {
  //                 text: 'Hủy',
  //                 style: 'cancel',
  //             },
  //             {
  //                 text: 'Xóa',
  //                 style: 'destructive',
  //                 onPress: async () => {
  //                     try {
  //                         const response =
  //                             await fetch(
  //                                 `${API_URL}/categories/${category._id}`,
  //                                 {
  //                                     method: 'DELETE',
  //                                 }
  //                             );

  //                         if (!response.ok) {
  //                             throw new Error(
  //                                 'Delete category failed'
  //                             );
  //                         }

  //                         Alert.alert(
  //                             'Thành công',
  //                             'Đã xóa nhóm sản phẩm.'
  //                         );

  //                         await fetchCategories();
  //                     } catch (error) {
  //                         console.error(
  //                             'DELETE CATEGORY ERROR:',
  //                             error
  //                         );

  //                         Alert.alert(
  //                             'Lỗi',
  //                             'Không thể xóa nhóm sản phẩm.'
  //                         );
  //                     }
  //                 },
  //             },
  //         ]
  //     );
  // };

  // =========================================================
  // MODAL
  // =========================================================

  const openCreateModal = () => {
    setEditingCategory(null);
    setForm({
      ...initialForm,
    });
    setModalVisible(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);

    setForm({
      name: category.name,
      description: category.description ?? '',
      image: category.image ?? '',
      isActive: category.isActive,
    });

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);

    setEditingCategory(null);

    setForm({
      ...initialForm,
    });
  };

  const handleSubmit = () => {
    if (editingCategory) {
      // updateCategory();
    } else {
      handleCreateCategory();
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filterCategories = useCallback(() => {
    let result = [...categories];

    const keyword = searchText.trim().toLowerCase();

    if (keyword) {
      result = result.filter(
        category =>
          category.name.toLowerCase().includes(keyword) ||
          category.description?.toLowerCase().includes(keyword),
      );
    }

    setFilteredCategories(result);
  }, [categories, searchText]);

  useEffect(() => {
    filterCategories();
  }, [filterCategories]);

  useEffect(() => {
    handleLoadCategory();
  }, []);

  // =========================================================
  // RENDER CATEGORY
  // =========================================================

  const renderCategory = ({ item }: { item: Category }) => {
    return (
      <View style={styles.categoryCard}>
        {/* IMAGE */}

        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.categoryImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderIcon}>☕</Text>
            </View>
          )}
        </View>

        {/* CONTENT */}

        <View style={styles.categoryContent}>
          <View style={styles.categoryTitleRow}>
            <Text style={styles.categoryName} numberOfLines={1}>
              {item.name}
            </Text>

            <View
              style={[
                styles.statusBadge,
                item.isActive ? styles.activeBadge : styles.inactiveBadge,
              ]}
            >
              <Text style={styles.statusText}>
                {item.isActive ? 'ACTIVE' : 'INACTIVE'}
              </Text>
            </View>
          </View>

          <Text style={styles.categoryDescription} numberOfLines={2}>
            {item.description || 'Chưa có mô tả'}
          </Text>

          <Text style={styles.productCount}>
            {item.productCount ?? 0} sản phẩm
          </Text>

          {/* ACTION */}

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => openEditModal(item)}
            >
              <Text style={styles.editButtonText}>Sửa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => console.log('Delete category:', item._id)}
            >
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Nhóm sản phẩm</Text>

          <Text style={styles.headerSubtitle}>{categories.length} nhóm</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
          <Text style={styles.addButtonText}>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm nhóm sản phẩm..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* LIST */}

      <FlatList
        data={filteredCategories}
        keyExtractor={item => item._id}
        renderItem={renderCategory}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>☕</Text>

              <Text style={styles.emptyTitle}>Chưa có nhóm sản phẩm</Text>

              <Text style={styles.emptyDescription}>
                Hãy thêm nhóm sản phẩm đầu tiên
              </Text>

              <TouchableOpacity
                style={styles.emptyAddButton}
                onPress={openCreateModal}
              >
                <Text style={styles.emptyAddButtonText}>+ Thêm nhóm</Text>
              </TouchableOpacity>
            </View>
          ) : undefined
        }
      />

      {/* ================================================= */}
      {/* CREATE / EDIT MODAL */}
      {/* ================================================= */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* HEADER */}

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingCategory ? 'Sửa nhóm sản phẩm' : 'Thêm nhóm sản phẩm'}
              </Text>

              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* NAME */}

              <Text style={styles.inputLabel}>Tên nhóm *</Text>

              <TextInput
                value={form.name}
                onChangeText={value =>
                  setForm(prev => ({
                    ...prev,
                    name: value,
                  }))
                }
                placeholder="Coffee"
                placeholderTextColor="#999"
                style={styles.input}
              />

              {/* DESCRIPTION */}

              <Text style={styles.inputLabel}>Mô tả</Text>

              <TextInput
                value={form.description}
                onChangeText={value =>
                  setForm(prev => ({
                    ...prev,
                    description: value,
                  }))
                }
                placeholder="Mô tả nhóm sản phẩm..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                style={[styles.input, styles.textArea]}
              />

              {/* IMAGE */}

              <Text style={styles.inputLabel}>Image URL</Text>

              <TextInput
                value={form.image}
                onChangeText={value =>
                  setForm(prev => ({
                    ...prev,
                    image: value,
                  }))
                }
                placeholder="https://..."
                placeholderTextColor="#999"
                autoCapitalize="none"
                style={styles.input}
              />

              {/* PREVIEW */}

              {form.image ? (
                <Image
                  source={{
                    uri: form.image,
                  }}
                  style={styles.previewImage}
                />
              ) : null}

              {/* ACTIVE */}

              <View style={styles.switchRow}>
                <View>
                  <Text style={styles.switchTitle}>Hoạt động</Text>

                  <Text style={styles.switchDescription}>
                    Hiển thị nhóm sản phẩm cho khách hàng
                  </Text>
                </View>

                <Switch
                  value={form.isActive}
                  onValueChange={value =>
                    setForm(prev => ({
                      ...prev,
                      isActive: value,
                    }))
                  }
                />
              </View>

              {/* SUBMIT */}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>
                  {editingCategory ? 'Cập nhật' : 'Thêm nhóm sản phẩm'}
                </Text>
              </TouchableOpacity>

              <View style={styles.bottomSpace} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminCategoryScreen;

// =========================================================
// STYLE
// =========================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4F0',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D211B',
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A7A70',
  },

  addButton: {
    backgroundColor: '#6F4E37',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5DED8',
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D211B',
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },

  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1ECE8',
  },

  categoryImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderIcon: {
    fontSize: 38,
  },

  categoryContent: {
    flex: 1,
    marginLeft: 12,
  },

  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#2D211B',
  },

  statusBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 5,
  },

  activeBadge: {
    backgroundColor: '#DFF5E5',
  },

  inactiveBadge: {
    backgroundColor: '#ECECEC',
  },

  statusText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#555',
  },

  categoryDescription: {
    fontSize: 12,
    color: '#8A7A70',
    marginTop: 6,
  },

  productCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6F4E37',
    marginTop: 6,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 8,
  },

  editButton: {
    backgroundColor: '#F0E7DF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },

  editButtonText: {
    color: '#6F4E37',
    fontSize: 12,
    fontWeight: '700',
  },

  deleteButton: {
    backgroundColor: '#FCE8E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },

  deleteButtonText: {
    color: '#D93025',
    fontSize: 12,
    fontWeight: '700',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },

  emptyIcon: {
    fontSize: 50,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D211B',
    marginTop: 10,
  },

  emptyDescription: {
    fontSize: 14,
    color: '#8A7A70',
    marginTop: 5,
  },

  emptyAddButton: {
    backgroundColor: '#6F4E37',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },

  emptyAddButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#2D211B',
  },

  closeButton: {
    fontSize: 22,
    color: '#777',
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D4038',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E2D9D2',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2D211B',
    backgroundColor: '#FAF9F7',
  },

  textArea: {
    height: 90,
    textAlignVertical: 'top',
    paddingTop: 12,
  },

  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginTop: 12,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE8E3',
  },

  switchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D211B',
  },

  switchDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },

  submitButton: {
    backgroundColor: '#6F4E37',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  bottomSpace: {
    height: 30,
  },
});
