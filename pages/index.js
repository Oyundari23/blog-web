import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    fetch("https://dev.to/api/articles?username=zacharylee")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticles(data);
      });

  }, []);


  return (
    <div className="container mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => (
          <div key={item.id} className="shadow-lg card bg-base-100 ">
            <div className="card-body">
              <Image src={item.social_image} width={500} height={500}></Image>
              <Link href={item.url} target="_blank">
                {item.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        jgjgjgj
      </div>
      <div>
        hghjgj
      </div>
      <div>
        hghjgj
      </div>
      <div>
        hghjgj
      </div>
    </div>
  );
}
