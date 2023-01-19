import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";

export default resolveConfig(tailwindConfig).theme;
