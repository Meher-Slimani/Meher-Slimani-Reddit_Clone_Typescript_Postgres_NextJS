import "../styles/tailwind.css";
import "../styles/icons.css";
import { AppProps } from "next/app";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/auth";
import { SWRConfig } from "swr";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {!authRoute && <Navbar />}
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
