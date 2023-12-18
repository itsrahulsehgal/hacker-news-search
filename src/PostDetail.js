import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { objectId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/items/${objectId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    if (objectId) {
      fetchPost();
    }
  }, [objectId]);

  const createMarkup = (html) => ({ __html: html });

  return (
    <div className="post-details">
      {post && (
        <>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-metadata">
            Points: {post.points} | Author: {post.author} | Comments: {post.num_comments}
          </p>
          <div className="post-content" dangerouslySetInnerHTML={createMarkup(post.text)} />
          <ul className="comment-list">
            {post.children &&
              post.children.map((comment) => (
                <li key={comment.id} className="comment">
                  <p className="comment-author">{comment.author}</p>
                  <div className="comment-content" dangerouslySetInnerHTML={createMarkup(comment.text)} />
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PostDetail;
