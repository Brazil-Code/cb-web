import axios from 'axios';
import url from '../../api/config_qa.json';

export default axios.create({
    baseURL: url.ADM_URL,
    responseType: "application/json",
});