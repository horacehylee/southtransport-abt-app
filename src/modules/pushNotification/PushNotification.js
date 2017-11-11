import { AsyncStorage } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import isEmpty from "lodash/isEmpty"
import isEqual from "lodash/isEqual"

import axios from 'axios';
import Params from './../../params';

const storeName = Params.storeName;
const fcmTokenKey = Params.fcmTokenKey;
const fcmServerStoredTokenKey = Params.fcmServerStoredTokenKey;
const fcmTokenStoragePath = `${storeName}:${fcmTokenKey}`;
const fcmServerStoredTokenPath = `${storeName}:${fcmServerStoredTokenKey}`;
const apiPath = Params.apiPath;

const updatePushTokenApi = (installId, token) => {
    return axios.post(`${apiPath}/app/updateToken`, {
        installId: installId,
        token: token
    }).then((response) => {
        console.log(response.data);
        if (response.status != 200) {
            return Promise.reject(`status code(${response.status}) is not 200`);
        }
        return Promise.resolve(response.data);
    })
}

class PushNotification {
    static getAndCheckToken(installId) {
        return Promise.all([
            FCM.getFCMToken(),
            AsyncStorage.getItem(fcmTokenStoragePath),
            AsyncStorage.getItem(fcmServerStoredTokenPath),
        ]).then(([token, storedToken, serverStoredToken]) => {
            console.log('fcm token', token);
            console.log("stored token", storedToken);
            console.log('server stored token', serverStoredToken);
            if (!isEmpty(storedToken)) {
                if (!isEqual(storedToken, token)) {
                    return this._updateToken(installId, token);
                }
                if (!isEqual(storedToken, serverStoredToken)) {
                    return this._sendTokenToServer(installId, storedToken);
                }
            } else {
                return this._updateToken(installId, token);
            }
        })
    };

    static _updateToken(installId, token) {
        return Promise.all([
            AsyncStorage.setItem(fcmTokenStoragePath, token),
            this._sendTokenToServer(installId, token),
        ]);
    }

    static _sendTokenToServer(installId, token) {
        console.log('send token to server')
        return updatePushTokenApi(installId, token).then((response) => {
            const pushTokenObj = response.data.pushToken;
            if (!pushTokenObj) {
                return Promise.reject('pushToken data is null from server api');
            }
            const token = pushTokenObj.token;
            return AsyncStorage.setItem(fcmServerStoredTokenPath, token);
        })
    }
}

export default PushNotification;