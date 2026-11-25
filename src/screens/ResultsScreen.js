import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/api';
import { colors } from '../theme';

export default function ResultsScreen({ route, navigation }) {
  const { query } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadBooks() {
    setLoading(true);
    setError('');
    try {
      const result = await searchBooks(query);
      setBooks(result);
    } catch (e) {
      setError('Erro ao buscar livros. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, [query]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>Buscando livros...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={56} color={colors.muted} />
        <Text style={styles.message}>{error}</Text>
        <TouchableOpacity style={styles.retry} onPress={loadBooks}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.header}>
          {books.length} resultado(s) para "{query}"
        </Text>
      }
      ListEmptyComponent={
        <View style={styles.center}>
          <Ionicons name="search-outline" size={56} color={colors.muted} />
          <Text style={styles.message}>Nenhum livro encontrado.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <BookCard book={item} onPress={() => navigation.navigate('Details', { book: item })} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  header: {
    color: colors.muted,
    marginBottom: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  message: {
    marginTop: 12,
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  retry: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
});
