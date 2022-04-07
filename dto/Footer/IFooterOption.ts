import { IconType } from "react-icons";

interface IFooterOption {
	id: number;
	icon?: IconType;
	name: string;
    route: string;
    hasIcons?: boolean;
}

export default IFooterOption;
