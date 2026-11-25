import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBookDescription } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../theme';

export default function DetailsScreen({ route }) {
  const { book } = route.params;
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();

  async function loadBook() {
    setLoading(true);
    setError('');
    try {
      const result = await getBookDescription(book.id);
      setDescription(result);
    } catch (e) {
      setError('Erro ao carregar os detalhes do livro.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBook();
  }, [book.id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={56} color={colors.muted} />
        <Text style={styles.message}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={loadBook}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const favorite = isFavorite(book.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.top}>
        {book.cover ? (
          <Image source={{ uri: book.cover }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.noCover]}>
            <Ionicons name="book" size={48} color={colors.primary} />
          </View>
        )}
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.authors}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Ano</Text>
          <Text style={styles.infoValue}>{book.publishedDate}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Páginas</Text>
          <Text style={styles.infoValue}>{book.pageCount}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Editora</Text>
          <Text style={styles.infoValue} numberOfLines={1}>{book.publisher}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, favorite && styles.buttonRemove]}
        onPress={() => toggleFavorite(book)}
      >
        <Ionicons name={favorite ? 'heart-dislike' : 'heart'} size={20} color="#fff" />
        <Text style={styles.buttonText}>
          {favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.section}>Descrição</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    marginTop: 12,
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  top: {
    alignItems: 'center',
  },
  cover: {
    width: 150,
    height: 225,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
  },
  noCover: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
  author: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 6,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    borderTopWidth: 3,
    borderTopColor: colors.accent,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonRemove: {
    backgroundColor: colors.heart,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    paddingLeft: 10,
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
  },
});
