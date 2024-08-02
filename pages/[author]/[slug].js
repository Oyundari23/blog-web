import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [article, setArticle] = useState ();
  const [loading, setLoading] = useState (false);


  useEffect(() => {
    getArticle();
  }, []);

  function getArticle() {
    setLoading(true);

    fetch(`https://dev.to/dumebii/beginner-ruby-on-rails-build-a-simple-online-store-with-ruby-on-rails-2egl`)
      .then((response) => {
        return response.json();
      })
      .then((detail) => {
        setArticle(detail);
        setLoading(false);
      });
  }
  console.log({ article });
  
  
  return (
    <div className="container mx-auto"> one blog    
          </div>
  );
}

