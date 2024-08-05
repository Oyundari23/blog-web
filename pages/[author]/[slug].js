import { useEffect } from "react";
import { useState } from "react";
import parse from 'html-react-parser';
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(false);
  const { author, slug } = router.query;

  useEffect(() => {
    getArticle();
  }, []);

  function getArticle() {
    setLoading(true);

    fetch(`https://dev.to/api/articles/${author}/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((detail) => {
        setArticle(detail);
        setLoading(false);
      });
  }

  if (!article) return <div> Loading ....</div>;

  return (
    <div className="container mx-auto">
      <div> {article.title}</div>
      <div className="prose"> {parse(article.body_html)}</div>
    </div>
  );
}

