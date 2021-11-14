import axios from "axios";

export const getAddressBalance = (infuraProjectId, payload) =>
    axios.post(`https://mainnet.infura.io/v3/${infuraProjectId}`, payload);
