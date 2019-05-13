export class SessionState {
    private _session: Storage = window.localStorage;
    AddSessionItem(key: string, value: any) {

        this._session.setItem(key, JSON.stringify(value));
    }
    GetSessionItem<T>(key: string):T {
        var value: string = this._session.getItem(key);
        return JSON.parse(value);
    }
    Abandon() {
        this._session.clear();
    }
}