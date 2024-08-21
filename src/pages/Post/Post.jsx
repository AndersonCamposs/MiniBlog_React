// CSS
import styles from './Post.module.css';

import { useParams } from 'react-router-dom';
// hooks
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
  const { id: docId } = useParams();
  const { document: post, loading, error } = useFetchDocument('posts', docId);

  return (
    <div className={styles.post_container}>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
