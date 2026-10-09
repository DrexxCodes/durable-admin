import { useParams } from "@/lib/router";
import { ModalComponents } from "@/components/ui/Modal";

export { ModalComponents };

export const TabHeader = ({ title, subtitle }) => {
	let { page } = useParams();
	return (
		<>
			<h3 className="text-capitalize lexendFont">{title ? title : page}</h3>
			<p className="text-capitalize">
				{subtitle
					? subtitle
					: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
				impedit.`}
			</p>
		</>
	);
};
