import { AsyncStorage } from 'react-native';
import Params from './../../../params';

import isEmpty from "lodash/isEmpty"

const storeName = Params.storeName;
const settingsStorageKey = Params.settingsKey;
const settingsStoragePath = `${storeName}:${settingsStorageKey}`;
const apiPath = Params.apiPath;

const defaultSettings = Params.defaultSettings;

class SettingsStorage {
    static init() {
        return AsyncStorage.getItem(settingsStoragePath).then((settingsJson) => {
            if (isEmpty(settingsJson)) {
                const defaultSettingsJson = JSON.stringify(defaultSettings);
                return AsyncStorage.setItem(settingsStoragePath, defaultSettingsJson);
            }
        })
    }

    static load() {
        return AsyncStorage.getItem(settingsStoragePath).then((settingsJson) => {
            const settingsObj = JSON.parse(settingsJson);
            return Promise.resolve(settingsObj);
        })
    }

    static updateAndStore(groupKey, itemKey, value) {
        return AsyncStorage.getItem(settingsStoragePath)
            .then((settingsJson) => {
                const settingsObj = JSON.parse(settingsJson);
                return Promise.resolve(settingsObj);
            }).then((settingsObj) => {
                const settingsObjClone = { ...settingsObj };
                settingsObjClone[groupKey][itemKey] = value;
                return Promise.resolve(settingsObjClone);
            }).then((updatedSettingsObj) => {
                const updatedSettingsJson = JSON.stringify(updatedSettingsObj);
                return AsyncStorage.setItem(settingsStoragePath, updatedSettingsJson).then(() => {
                    return Promise.resolve(updatedSettingsObj);
                });
            }).then((updatedSettingsObj) => {
                return Promise.resolve(updatedSettingsObj);
            })
    }
}

export default SettingsStorage;