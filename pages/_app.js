import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Layout />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
