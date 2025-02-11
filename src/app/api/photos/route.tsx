import { NextResponse } from "next/server";

const fetchPhotos = async (page: number, limit: number) => {
    const photoPromises = Array.from({ length: limit }, async () => {
        const response = await fetch("https://picsum.photos/200");
        return { id: Date.now() + Math.random(), url: response.url }; // ✅ 保证唯一 ID
    });

    return Promise.all(photoPromises);
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);

    const photos = await fetchPhotos(page, limit);
    return NextResponse.json(photos);
}
