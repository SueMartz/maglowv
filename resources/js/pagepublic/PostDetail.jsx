import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Config from "../Config";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    Config.getPostBySlug(slug).then(res => setPost(res.data));
  }, [slug]);

  if (!post) return <div className="container py-5">Cargando...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-3">{post.title}</h2>
      <img
        src={`/img/post/${post.image}`}
        alt={post.title}
        className="img-fluid mb-4"
        style={{
          maxHeight: "300px",
          width: "auto",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <div dangerouslySetInnerHTML={{ __html: post.descripcion }} />
    </div>
  );
};

export default PostDetail;
