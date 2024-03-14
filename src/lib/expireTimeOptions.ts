export enum ExpireTimeOptions {
    d1 = '1d',
    d3 = '3d',
    d7 = '7d',
    never = 'never'
}

export function toDate(option: ExpireTimeOptions): Date | undefined {
    const date = new Date();
    switch (option) {
        case ExpireTimeOptions.d1:
            date.setDate(date.getDate() + 1);
            break;
        case ExpireTimeOptions.d3:
            date.setDate(date.getDate() + 3);
            break;
        case ExpireTimeOptions.d7:
            date.setDate(date.getDate() + 7);
            break;
        case ExpireTimeOptions.never:
            return undefined;
    }
    return date;
}