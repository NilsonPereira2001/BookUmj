import { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../theme';

const suggestions = ['Harry Potter', 'Machado de Assis', 'Programação', 'Tolkien'];

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { favorites } = useFavorites();

  function handleSearch(text) {
    const value = (text ?? query).trim();
    if (!value) {
      setError('Digite algo para pesquisar.');
      return;
    }
    setError('');
    navigation.navigate('Results', { query: value });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity style={styles.favButton} onPress={() => navigation.navigate('Favorites')}>
          <Ionicons name="heart" size={20} color="#fff" />
          <Text style={styles.favText}>{favorites.length}</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>
            Book<Text style={styles.titleAccent}>UMJ</Text>
          </Text>
          <Text style={styles.subtitle}>Encontre seu próximo livro favorito</Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            style={styles.input}
            placeholder="Título, autor ou assunto..."
            placeholderTextColor={colors.muted}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={() => handleSearch()}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>

        <Text style={styles.suggestTitle}>Sugestões</Text>
        <View style={styles.chips}>
          {suggestions.map((item) => (
            <TouchableOpacity key={item} style={styles.chip} onPress={() => handleSearch(item)}>
              <Text style={styles.chipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.card,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  favButton: {
    position: 'absolute',
    top: 16,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  favText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 6,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 200,
    height: 153,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
  },
  titleAccent: {
    color: colors.accent,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    height: 52,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  error: {
    color: colors.heart,
    marginTop: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  suggestTitle: {
    marginTop: 28,
    marginBottom: 10,
    fontWeight: '700',
    color: colors.text,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
