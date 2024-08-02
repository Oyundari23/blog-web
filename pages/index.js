import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [ended, setEnded] = useState(false);


  useEffect(() => {
    loadMore();
  }, []);

  function loadMore() {
    fetch("https://dev.to/api/articles?username=zacharylee")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticles(data);
      });
  }

  return (
    <div className="container mx-auto">
      <Header/>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => (
          <div key={item.id} className="shadow-lg card bg-base-100 ">
            <div className="card-body flex flex-col gap-4">

              <Image src={item.social_image} width={500} height={500}></Image>
              <div className="badge badge-primary badge-outline">{item.tag_list[0]}</div>
              <Link href={item.url} target="_blank">
                {item.title}
              </Link>
              <div className="flex items-center gap-2">
                <Image className=" rounded-full" src={item.user.profile_image_90} width={50} height={50}/>
                <div> {item.published_at} </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4"> <button className="btn btn-primary">Load more</button></div>
      <Footer/>
    </div>
  );
}
