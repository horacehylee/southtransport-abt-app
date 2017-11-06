import { AsyncStorage } from 'react-native';
import isEmpty from "lodash/isEmpty"

import axios from 'axios';
import Params from './../../params';

const storeName = Params.storeName;
const appInstallKey = Params.appInstallKey;
const appInstallStoragePath = `${storeName}:${appInstallKey}`;
const apiPath = Params.apiPath;

const callAppInstallApi = () => {
    return axios.post(`${apiPath}/app/install`, {
        platform: "android"
    }).then((response) => {
        console.log(response.data);
        if (response.status != 200) {
            return Promise.reject(`status code(${response.status}) is not 200`);
        }
        return Promise.resolve(response.data);
    })
}

const getInstallIdFromInstallObj = (installObj) => {
    return installObj.id;
}

class AppInstall {
    static _installId;

    static getInstallId() {
        if (isEmpty(this._installId)) {
            throw new Error('install id not defined yet');
        }
        return this._installId;
    }

    static initialize() {
        return AsyncStorage.getItem(appInstallStoragePath).then((appInstallJson) => {
            if (isEmpty(appInstallJson)) {
                return callAppInstallApi().then((response) => {
                    const installObj = response.data.install;
                    console.log('installObj', installObj);
                    if (!installObj) {
                        return Promise.reject('install data is null from server api');
                    }
                    this._installId = getInstallIdFromInstallObj(installObj);
                    const responseJson = JSON.stringify(installObj);
                    return AsyncStorage.setItem(appInstallStoragePath, responseJson);
                }).then(() => {
                    return Promise.resolve(this._installId);
                });
            } else {
                console.log(appInstallJson);
                const installObj = JSON.parse(appInstallJson);
                const installId = getInstallIdFromInstallObj(installObj);
                this._installId = installId;
                return Promise.resolve(installId);
            }
        })
    }
}

export default AppInstall;