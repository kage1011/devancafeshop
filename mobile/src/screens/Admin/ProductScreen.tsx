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

type Product = {
    _id: string;
    name: string;
    description?: string;
    price: number;
    category: string;
    image?: string;
    isHot: boolean;
    isSoldOut: boolean;
};

type ProductForm = {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    isHot: boolean;
    isSoldOut: boolean;
};

const initialForm: ProductForm = {
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    isHot: false,
    isSoldOut: false,
};

const AdminProductScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const [modalVisible, setModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [form, setForm] = useState<ProductForm>(initialForm);

    // ============================================================
    // API
    // ============================================================

    const API_URL = 'http://10.0.2.2:5000/api';

    /**
     * GET PRODUCTS
     */
    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/products`);

            if (!response.ok) {
                throw new Error('Không thể lấy danh sách sản phẩm');
            }

            const result = await response.json();

            const data = result.data ?? result;

            setProducts(data);
        } catch (error) {
            console.error('FETCH PRODUCTS ERROR:', error);

            Alert.alert(
                'Lỗi',
                'Không thể tải danh sách sản phẩm.'
            );
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
            await fetchProducts();
        } finally {
            setRefreshing(false);
        }
    };

    /**
     * CREATE PRODUCT
     */
    const createProduct = async () => {
        try {
            if (!form.name.trim()) {
                Alert.alert('Thông báo', 'Vui lòng nhập tên sản phẩm.');
                return;
            }

            if (!form.price.trim()) {
                Alert.alert('Thông báo', 'Vui lòng nhập giá sản phẩm.');
                return;
            }

            if (!form.category.trim()) {
                Alert.alert('Thông báo', 'Vui lòng nhập category.');
                return;
            }

            const payload = {
                name: form.name.trim(),
                description: form.description.trim(),
                price: Number(form.price),
                category: form.category.trim(),
                image: form.image.trim(),
                isHot: form.isHot,
                isSoldOut: form.isSoldOut,
            };

            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Create product failed');
            }

            Alert.alert('Thành công', 'Đã thêm sản phẩm.');

            closeModal();

            await fetchProducts();
        } catch (error) {
            console.error('CREATE PRODUCT ERROR:', error);

            Alert.alert(
                'Lỗi',
                'Không thể thêm sản phẩm.'
            );
        }
    };

    /**
     * UPDATE PRODUCT
     */
    const updateProduct = async () => {
        if (!editingProduct) {
            return;
        }

        try {
            if (!form.name.trim()) {
                Alert.alert('Thông báo', 'Vui lòng nhập tên sản phẩm.');
                return;
            }

            if (!form.price.trim()) {
                Alert.alert('Thông báo', 'Vui lòng nhập giá sản phẩm.');
                return;
            }

            const payload = {
                name: form.name.trim(),
                description: form.description.trim(),
                price: Number(form.price),
                category: form.category.trim(),
                image: form.image.trim(),
                isHot: form.isHot,
                isSoldOut: form.isSoldOut,
            };

            const response = await fetch(
                `${API_URL}/products/${editingProduct._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error('Update product failed');
            }

            Alert.alert('Thành công', 'Đã cập nhật sản phẩm.');

            closeModal();

            await fetchProducts();
        } catch (error) {
            console.error('UPDATE PRODUCT ERROR:', error);

            Alert.alert(
                'Lỗi',
                'Không thể cập nhật sản phẩm.'
            );
        }
    };

    /**
     * DELETE PRODUCT
     */
    const deleteProduct = (product: Product) => {
        Alert.alert(
            'Xóa sản phẩm',
            `Bạn có chắc muốn xóa "${product.name}"?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(
                                `${API_URL}/products/${product._id}`,
                                {
                                    method: 'DELETE',
                                }
                            );

                            if (!response.ok) {
                                throw new Error('Delete product failed');
                            }

                            Alert.alert(
                                'Thành công',
                                'Đã xóa sản phẩm.'
                            );

                            await fetchProducts();
                        } catch (error) {
                            console.error(
                                'DELETE PRODUCT ERROR:',
                                error
                            );

                            Alert.alert(
                                'Lỗi',
                                'Không thể xóa sản phẩm.'
                            );
                        }
                    },
                },
            ]
        );
    };

    // ============================================================
    // MODAL
    // ============================================================

    const openCreateModal = () => {
        setEditingProduct(null);
        setForm(initialForm);
        setModalVisible(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);

        setForm({
            name: product.name,
            description: product.description ?? '',
            price: String(product.price),
            category: product.category,
            image: product.image ?? '',
            isHot: product.isHot,
            isSoldOut: product.isSoldOut,
        });

        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingProduct(null);
        setForm(initialForm);
    };

    const handleSubmit = () => {
        if (editingProduct) {
            updateProduct();
        } else {
            createProduct();
        }
    };

    // ============================================================
    // FILTER
    // ============================================================

    const categories = [
        'ALL',
        ...Array.from(
            new Set(products.map(product => product.category))
        ),
    ];

    const filterProducts = useCallback(() => {
        let result = [...products];

        if (searchText.trim()) {
            const keyword = searchText
                .trim()
                .toLowerCase();

            result = result.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(keyword)
            );
        }

        if (selectedCategory !== 'ALL') {
            result = result.filter(
                product =>
                    product.category === selectedCategory
            );
        }

        setFilteredProducts(result);
    }, [
        products,
        searchText,
        selectedCategory,
    ]);

    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    useEffect(() => {
        fetchProducts();
    }, []);

    // ============================================================
    // FORMAT
    // ============================================================

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
    };

    // ============================================================
    // RENDER PRODUCT
    // ============================================================

    const renderProduct = ({
        item,
    }: {
        item: Product;
    }) => {
        return (
            <View style={styles.productCard}>
                {/* IMAGE */}

                <View style={styles.imageContainer}>
                    {item.image ? (
                        <Image
                            source={{
                                uri: item.image,
                            }}
                            style={styles.productImage}
                        />
                    ) : (
                        <View
                            style={
                                styles.imagePlaceholder
                            }
                        >
                            <Text style={styles.imagePlaceholderText}>
                                ☕
                            </Text>
                        </View>
                    )}
                </View>

                {/* INFO */}

                <View style={styles.productInfo}>
                    <View style={styles.productTitleRow}>
                        <Text
                            style={styles.productName}
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>

                        {item.isHot && (
                            <View style={styles.hotBadge}>
                                <Text style={styles.badgeText}>
                                    HOT
                                </Text>
                            </View>
                        )}

                        {item.isSoldOut && (
                            <View style={styles.soldOutBadge}>
                                <Text style={styles.badgeText}>
                                    SOLD OUT
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text
                        style={styles.description}
                        numberOfLines={2}
                    >
                        {item.description ||
                            'Chưa có mô tả'}
                    </Text>

                    <Text style={styles.category}>
                        {item.category}
                    </Text>

                    <Text style={styles.price}>
                        {formatPrice(item.price)}
                    </Text>

                    {/* ACTION */}

                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() =>
                                openEditModal(item)
                            }
                        >
                            <Text
                                style={
                                    styles.editButtonText
                                }
                            >
                                Sửa
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() =>
                                deleteProduct(item)
                            }
                        >
                            <Text
                                style={
                                    styles.deleteButtonText
                                }
                            >
                                Xóa
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    // ============================================================
    // MAIN
    // ============================================================

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>
                        Quản lý sản phẩm
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        {products.length} sản phẩm
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={openCreateModal}
                >
                    <Text style={styles.addButtonText}>
                        + Thêm
                    </Text>
                </TouchableOpacity>
            </View>

            {/* SEARCH */}

            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>
                    🔍
                </Text>

                <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Tìm kiếm sản phẩm..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                />
            </View>

            {/* CATEGORY */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.categoryContainer
                }
            >
                {categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        onPress={() =>
                            setSelectedCategory(category)
                        }
                        style={[
                            styles.categoryButton,
                            selectedCategory === category &&
                                styles.categoryButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory ===
                                    category &&
                                    styles.categoryButtonTextActive,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* LIST */}

            <FlatList
                data={filteredProducts}
                keyExtractor={item => item._id}
                renderItem={renderProduct}
                contentContainerStyle={
                    styles.listContainer
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                ListEmptyComponent={
                    !loading ? (
                        <View
                            style={
                                styles.emptyContainer
                            }
                        >
                            <Text style={styles.emptyIcon}>
                                ☕
                            </Text>

                            <Text style={styles.emptyTitle}>
                                Không có sản phẩm
                            </Text>

                            <Text
                                style={
                                    styles.emptyDescription
                                }
                            >
                                Hãy thêm sản phẩm mới
                            </Text>
                        </View>
                    ) : undefined
                }
            />

            {/* CREATE / EDIT MODAL */}

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* MODAL HEADER */}

                        <View style={styles.modalHeader}>
                            <Text
                                style={
                                    styles.modalTitle
                                }
                            >
                                {editingProduct
                                    ? 'Sửa sản phẩm'
                                    : 'Thêm sản phẩm'}
                            </Text>

                            <TouchableOpacity
                                onPress={closeModal}
                            >
                                <Text
                                    style={
                                        styles.closeButton
                                    }
                                >
                                    ✕
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={
                                false
                            }
                        >
                            {/* NAME */}

                            <Text style={styles.inputLabel}>
                                Tên sản phẩm *
                            </Text>

                            <TextInput
                                value={form.name}
                                onChangeText={value =>
                                    setForm(prev => ({
                                        ...prev,
                                        name: value,
                                    }))
                                }
                                placeholder="Ví dụ: Cappuccino"
                                placeholderTextColor="#999"
                                style={styles.input}
                            />

                            {/* DESCRIPTION */}

                            <Text style={styles.inputLabel}>
                                Mô tả
                            </Text>

                            <TextInput
                                value={form.description}
                                onChangeText={value =>
                                    setForm(prev => ({
                                        ...prev,
                                        description:
                                            value,
                                    }))
                                }
                                placeholder="Mô tả sản phẩm"
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={4}
                                style={[
                                    styles.input,
                                    styles.textArea,
                                ]}
                            />

                            {/* PRICE */}

                            <Text style={styles.inputLabel}>
                                Giá *
                            </Text>

                            <TextInput
                                value={form.price}
                                onChangeText={value =>
                                    setForm(prev => ({
                                        ...prev,
                                        price: value.replace(
                                            /[^0-9]/g,
                                            ''
                                        ),
                                    }))
                                }
                                placeholder="50000"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                style={styles.input}
                            />

                            {/* CATEGORY */}

                            <Text style={styles.inputLabel}>
                                Category *
                            </Text>

                            <TextInput
                                value={form.category}
                                onChangeText={value =>
                                    setForm(prev => ({
                                        ...prev,
                                        category: value,
                                    }))
                                }
                                placeholder="Coffee"
                                placeholderTextColor="#999"
                                style={styles.input}
                            />

                            {/* IMAGE */}

                            <Text style={styles.inputLabel}>
                                Image URL
                            </Text>

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

                            {/* HOT */}

                            <View style={styles.switchRow}>
                                <View>
                                    <Text
                                        style={
                                            styles.switchTitle
                                        }
                                    >
                                        Sản phẩm HOT
                                    </Text>

                                    <Text
                                        style={
                                            styles.switchDescription
                                        }
                                    >
                                        Hiển thị nhãn HOT
                                    </Text>
                                </View>

                                <Switch
                                    value={form.isHot}
                                    onValueChange={value =>
                                        setForm(prev => ({
                                            ...prev,
                                            isHot: value,
                                        }))
                                    }
                                />
                            </View>

                            {/* SOLD OUT */}

                            <View style={styles.switchRow}>
                                <View>
                                    <Text
                                        style={
                                            styles.switchTitle
                                        }
                                    >
                                        Sold Out
                                    </Text>

                                    <Text
                                        style={
                                            styles.switchDescription
                                        }
                                    >
                                        Sản phẩm đang hết hàng
                                    </Text>
                                </View>

                                <Switch
                                    value={form.isSoldOut}
                                    onValueChange={value =>
                                        setForm(prev => ({
                                            ...prev,
                                            isSoldOut:
                                                value,
                                        }))
                                    }
                                />
                            </View>

                            {/* SUBMIT */}

                            <TouchableOpacity
                                style={
                                    styles.submitButton
                                }
                                onPress={handleSubmit}
                            >
                                <Text
                                    style={
                                        styles.submitButtonText
                                    }
                                >
                                    {editingProduct
                                        ? 'Cập nhật sản phẩm'
                                        : 'Thêm sản phẩm'}
                                </Text>
                            </TouchableOpacity>

                            <View
                                style={
                                    styles.bottomSpace
                                }
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default AdminProductScreen;

// ============================================================
// STYLE
// ============================================================

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

    categoryContainer: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        gap: 8,
    },

    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5DED8',
    },

    categoryButtonActive: {
        backgroundColor: '#6F4E37',
        borderColor: '#6F4E37',
    },

    categoryButtonText: {
        color: '#6F625A',
        fontSize: 13,
        fontWeight: '600',
    },

    categoryButtonTextActive: {
        color: '#FFFFFF',
    },

    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    productCard: {
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

    productImage: {
        width: '100%',
        height: '100%',
    },

    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imagePlaceholderText: {
        fontSize: 36,
    },

    productInfo: {
        flex: 1,
        marginLeft: 12,
    },

    productTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    productName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#2D211B',
    },

    hotBadge: {
        backgroundColor: '#E85D04',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginLeft: 5,
    },

    soldOutBadge: {
        backgroundColor: '#777777',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginLeft: 5,
    },

    badgeText: {
        color: '#FFFFFF',
        fontSize: 8,
        fontWeight: '800',
    },

    description: {
        fontSize: 12,
        color: '#8A7A70',
        marginTop: 4,
    },

    category: {
        fontSize: 11,
        color: '#A08E82',
        marginTop: 5,
    },

    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#6F4E37',
        marginTop: 4,
    },

    actionRow: {
        flexDirection: 'row',
        marginTop: 7,
        gap: 7,
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
        justifyContent: 'center',
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

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },

    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '92%',
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
        marginTop: 22,
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