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
        }).catch((err) => {
            console.log('settings update error', err.response.data.errors)
        })
    }

    static sendTestNotification(installId) {
        console.log('sendTestNotification')
        console.log('installId', installId)
        return axios.post(`${apiPath}/app/testPushNotification`, {
            installId: installId,
        }).then((response) => {
            if (response.status != 200) {
                return Promise.reject(`status code(${response.status}) is not 200`);
            }
            return Promise.resolve(response.data);
        }).catch((err) => {
            console.log('settings sendTestNotification error', err.response.data.errors)
        })
    }
}
export default SettingsApi;