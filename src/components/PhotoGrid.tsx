"use client";

import {useEffect, useState, useRef, useCallback} from "react";
import axios from "axios";

interface Photo {
    id: number;
    url: string;
    caption: string;
}

export default function PhotoGrid() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const loadPhotos = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`/api/photos?page=${page}&limit=9`);
            setPhotos((prev) => [...prev, ...response.data]);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Error loading photos", error);
        }
        setLoading(false);
    }, [page, loading]);

    const lastPhotoRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadPhotos();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, loadPhotos]
    );

    useEffect(() => {
        loadPhotos();
    }, []);

    useEffect(() => {
        if (photos.length === 0) return; // 避免初始加载时触发

        const preloadNextPage = async () => {
            try {
                const nextPage = page + 1;
                const response = await axios.get(`/api/photos?page=${nextPage}&limit=9`);
                setPhotos((prev) => [...prev, ...response.data]);
            } catch (error) {
                console.error("Error preloading next page", error);
            }
        };

        preloadNextPage();
    }, [page]);

    return (

        <div className="grid grid-cols-3 gap-0">
            {photos.map((photo, index) => (
                <div key={photo.id} ref={index === photos.length - 1 ? lastPhotoRef : null}
                     className="w-[200px] h-[200px] rounded-md overflow-hidden border border-white bg-white">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover rounded-md"/>
                    <p className="p-2 text-xs">{photo.caption}</p>
                </div>
            ))}
            {loading && <p className="text-center col-span-3">Loading...</p>}
        </div>
    );
}
