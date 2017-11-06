import axios from 'axios';
import Params from './../../../params';

const apiPath = Params.apiPath;

class SettingsApi {
    static update(installId, settingsObj) {
        return axios.put(`${apiPath}/settings`, {
            installId: installId,
            ...settingsObj,
        }).then((response) => {
            console.log(response.data);
            if (response.status != 200) {
                return Promise.reject(`status code(${response.status}) is not 200`);
            }
            return Promise.resolve(response.data);
        })
    }
}
export default SettingsApi;