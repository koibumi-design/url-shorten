import {tryGetOriginalUrl} from "$lib/server/controller";
import { error, redirect } from '@sveltejs/kit';

interface Params {
    shortId: string;
}

export async function load({params}) {
    const {shortId} = params as Params;
    const tryResult = await tryGetOriginalUrl(shortId);
    if (tryResult === null) {
        error(404, "Not found");
    } else {
        redirect(307, tryResult);
    }
}