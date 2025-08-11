// import { getImageByIndex, getImageURL } from "$lib/api/imageServerAPI"
// import { getVideoByIndex, getVideoURL } from "$lib/api/videoServerAPI";
// import { isImageRecordNotFound } from "$lib/types/imageTypes";
// import { MediaType, type MediaResponse } from "$lib/types/mediaTypes";
// import { isVideoRecordNotFound } from "$lib/types/videoTypes";

// export const getMediaAtNextIndex = async (currentIndex: number): Promise<MediaResponse> => {
//     const imageResponse = await getImageByIndex(currentIndex);
//     if (!isImageRecordNotFound(imageResponse)){
//         return {
//             url: getImageURL(imageResponse),
//             index: imageResponse.index,
//             duration: imageResponse.duration,
//             type: MediaType.IMAGE
//         } satisfies MediaResponse
//     }

//     const videoResponse = await getVideoByIndex(currentIndex);
//     if (!isVideoRecordNotFound(videoResponse)){
//         return {
//             url: getVideoURL(videoResponse),
//             index: videoResponse.index,
//             duration: 0,
//             type: MediaType.VIDEO
//         } satisfies MediaResponse
//     }

//     throw new Error("Media response not found");
// }
