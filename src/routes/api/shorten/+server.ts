import {toDate} from "$lib/expireTimeOptions";
import {recordShortPath} from "$lib/server/controller";
import { json } from '@sveltejs/kit';

export async function POST({request}) {
    const {originalUrl, expireTime } = await request.json();
    const expireAt = toDate(expireTime);
    return json(
        await recordShortPath(originalUrl, expireAt)
    );
}