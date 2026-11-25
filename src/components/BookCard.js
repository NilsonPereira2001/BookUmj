import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../theme';

export default function BookCard({ book, onPress }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(book.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {book.cover ? (
        <Image source={{ uri: book.cover }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.noCover]}>
          <Ionicons name="book" size={28} color={colors.primary} />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.authors}</Text>
        <Text style={styles.date}>{book.publishedDate}</Text>
      </View>

      <TouchableOpacity onPress={() => toggleFavorite(book)} style={styles.heart}>
        <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={24} color={colors.heart} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cover: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  noCover: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  author: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
    marginTop: 6,
  },
  heart: {
    padding: 6,
  },
});
