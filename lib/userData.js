import { getToken } from "./authenticate";

export async function request(method, route) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}${route}`;
    const headers = {
        Authorization: `JWT ${token}`,
        'content-type': 'application/json'
    };

    const res = await fetch(url, {
        method,
        headers
    });

    const data = await res.json();
    if (res.status === 200) {
        return data;
    }
    else {
        return [];
    }
}

export async function addToFavourites(id) {
    return await request('PUT', `/user/favourites/${id}`);
}

export async function removeFromFavourites(id) {
    return await request('DELETE', `/user/favourites/${id}`);
}

export async function getFavourites() {
    return await request('GET', '/user/favourites');
}

export async function addToHistory(id) {
    return await request('PUT', `/user/history/${id}`);
}

export async function removeFromHistory(id) {
    return await request('DELETE', `/user/history/${id}`);
}

export async function getHistory() {
    return await request('GET', '/user/history');
}