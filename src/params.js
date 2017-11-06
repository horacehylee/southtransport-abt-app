class Params {
    static storeName = "@SouthTransportABT";
    static fcmTokenKey = "fcmToken";
    static fcmServerStoredTokenKey = 'fcmServerStoredToken';
    static appInstallKey = "appInstall";
    static settingsKey = 'settings';

    static apiPath = 'https://us-central1-hksouthtransport-1a188.cloudfunctions.net/api';

    static defaultSettings = {
        notification: {
            on: true,
            sound: true,
        },
    }
}

export default Params;