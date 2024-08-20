// CSS
import styles from './Home.module.css';
// hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
//pages
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
// components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: posts, loading, error } = useFetchDocuments('posts');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // handleSubmit do formulário de busca
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
        {posts && posts.length === 0 && (
          <div>
            <div className={styles.no_posts}>
              <p>Não foram encontrados posts</p>
              <Link to="/posts/create" className="btn">
                Criar novo post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
