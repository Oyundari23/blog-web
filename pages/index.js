import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import dayjs from "dayjs";
import { Dayjsmn } from "@/components/dayjs-mn";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMore();
  }, []);

  function loadMore() {
    setLoading(true);

    fetch(`https://dev.to/api/articles?username=dumebii&page=${page}&per_page=6`)
      .then((response) => {
        return response.json();
      })
      .then((newArticles) => {
        const updatedArticles = articles.concat(newArticles);
        setArticles(updatedArticles);
        setPage(page + 1);
        if (newArticles.lenght < 6) {
          setEnded(true);
        }
        setLoading(false);
      });
  }

  return (
    <div className="container mx-auto">
      <Header />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => (
          <div key={item.id} className="shadow-lg card bg-base-100 ">
            <div className="card-body flex flex-col gap-4">
              <Image src={item.social_image} width={500} height={500} className="aspect-video object-cover bg-slate-600" />
              <div className="badge badge-primary badge-outline">{item.tag_list[0]}</div>
              <Link href={item.path}>
                {item.title}
              </Link>
              <div className="flex items-center gap-2">
                <Image className=" rounded-full" src={item.user.profile_image_90} width={50} height={50} />
                <div> {item.user.username} </div>
                <div> {dayjs(item.published_at).locale("mn").fromNow()} </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!ended &&
        <div className=" py-16 text-center " >
          <button disabled={loading} className="btn btn-primary" onClick={loadMore}>
            {
              loading && <span className="loading loading-ring loading-sm"></span>
            }
            Load more
          </button></div>
      }
      <Footer />
    </div>
  );
}
