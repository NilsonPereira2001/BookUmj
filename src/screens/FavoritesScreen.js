import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookCard from '../components/BookCard';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../theme';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="heart-outline" size={64} color={colors.muted} />
        <Text style={styles.title}>Nenhum favorito ainda</Text>
        <Text style={styles.message}>Toque no coração de um livro para salvá-lo aqui.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  message: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 6,
    textAlign: 'center',
  },
});
