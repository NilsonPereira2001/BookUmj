const BASE_URL = 'https://openlibrary.org';

function formatBook(doc) {
  return {
    id: doc.key.replace('/works/', ''),
    title: doc.title || 'Sem título',
    authors: doc.author_name ? doc.author_name.slice(0, 3).join(', ') : 'Autor desconhecido',
    cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
    publishedDate: doc.first_publish_year || '-',
    pageCount: doc.number_of_pages_median || '-',
    publisher: doc.publisher ? doc.publisher[0] : '-',
  };
}

export async function searchBooks(query) {
  const fields = 'key,title,author_name,cover_i,first_publish_year,number_of_pages_median,publisher';
  const response = await fetch(
    `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=30&fields=${fields}`
  );

  if (!response.ok) {
    throw new Error('Não foi possível buscar os livros.');
  }

  const data = await response.json();
  return (data.docs || []).map(formatBook);
}

export async function getBookDescription(id) {
  const response = await fetch(`${BASE_URL}/works/${id}.json`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar os detalhes do livro.');
  }

  const data = await response.json();
  const description = typeof data.description === 'string' ? data.description : data.description?.value;

  return description || 'Sem descrição disponível.';
}
