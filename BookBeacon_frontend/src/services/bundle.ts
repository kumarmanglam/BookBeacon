import axios from "axios";
import { domain } from "./license";

export const searchBundles = (search: string) => axios.get(`${domain}/bundleSearch?bundleName=${search}`)