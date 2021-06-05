import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter();
	const pathname = router?.pathname;

	return (
		<nav className="flex py-3 px-5 justify-between items-center bg-[#008cba] text-white sticky top-0 mb-4">
			<Link href="/">
				<a
					className={`text-2xl ${
						pathname === "/"
							? "opacity-100"
							: "opacity-70 hover:opacity-100"
					}`}>
					Note
				</a>
			</Link>
			<Link href="/new">
				<a
					className={`text-lg ${
						pathname === "/new"
							? "opacity-100"
							: "opacity-70 hover:opacity-100"
					}`}>
					Create Note
				</a>
			</Link>
		</nav>
	);
};

export default Navbar;
