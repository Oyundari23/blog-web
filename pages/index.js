import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    useEffect(() => {
      fetch("https://dev.to/api/articles?username=ben").then((response) => { return response.json() }).then((data) => console.log('data', data))
    }, [])
   
   
 
  );
}
