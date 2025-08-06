type Image = {
    sources: {
        avif: string
        wepb: string
        png: string
    }
    img: {
        src: string
        w: number
        h: number
    }
}

export const images = import.meta.glob("$lib/assets/images/*.{jpg,jpeg,png}", {
    query: { enhanced: true, as: "url" },
    import: "default",
    eager: true
});

export const GetImagePaths = () => {
    const imagePaths = [];
    for (const path in images){
        const p = new URL(path, import.meta.url).href;
        imagePaths.push(p);
    }
    return imagePaths;
}
