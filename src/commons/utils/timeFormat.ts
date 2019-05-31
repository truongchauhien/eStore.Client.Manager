export const jsonDateReviver = function (key: string, value: any) {
    const datetimeRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    if (typeof value === 'string') {
        let results = datetimeRegex.exec(value);
        if (results) {
            return new Date(value);
        }
    }

    return value;
}
