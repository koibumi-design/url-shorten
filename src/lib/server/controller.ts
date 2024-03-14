import {randomBytes} from 'crypto';
import ShortUrl from "$lib/server/mongo";

function generateBase64Url(length: number = 3): string {
    const randomBytesBuffer = randomBytes(length);
    const base64Encoded = randomBytesBuffer.toString('base64');
    return base64Encoded
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

export async function recordShortPath(originalUrl: String, expireAt: Date | undefined): Promise<string> {
    let shortPath = generateBase64Url();
    let thereIsDuplicate = await ShortUrl.exists({shortPath}) !== null;
    while (thereIsDuplicate) {
        shortPath = generateBase64Url(5);
        thereIsDuplicate = await ShortUrl.exists({shortPath}) !== null;
    }
    const newShortUrl = new ShortUrl({originalUrl, shortPath, expireAt});
    await newShortUrl.save();
    return shortPath;
}

export async function tryGetOriginalUrl(shortPath: string): Promise<string | null> {
    try {
        const shortUrl = await ShortUrl.findOne({shortPath});
        if (shortUrl === null || shortUrl.originalUrl === undefined) {
            return null;
        }
        return shortUrl.originalUrl;
    } catch (e) {
        console.error(e);
        return null;
    }
}