'use client'
import { useState, useEffect, FormEvent, SetStateAction, Dispatch } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { api } from "@/services/api";
import { getDownloadURL, getStorage, ref, deleteObject } from "firebase/storage";
import { Button } from "@mui/material";
import imageCompression from 'browser-image-compression';

type Props = {
    id: string,
    visible: boolean,
    fn: Dispatch<SetStateAction<"search" | "insert" | "edit" | "gallery">>
}

const ViewGallery = ({ id, visible, fn }: Props) => {
    //Variaveis
    const [started, setStarted] = useState(false)
    const [galleryScreen, setGalleryScreen] = useState<'photos' | 'videos'>('photos')
    const [photos, setPhotos] = useState<FileList | null>()
    const [photosLocation, setPhotosLocation] = useState<string[]>([])
    const [photosUrl, setPhotosUrl] = useState<string[]>([])
    const [videos, setVideos] = useState<FileList | null>()
    const [videosUrl, setVideosUrl] = useState<string[]>([])
    const [photosFirestore, setPhotosFirestore] = useState<string[]>([])
    const [videosFirestore, setVideosFirestore] = useState<string[]>([])

    useEffect(() => {
        if (id && started) {
            setTimeout(async () => {
                const getPhotos = await api.acompanhante.getPhotoFiles(id)

                if (getPhotos.error) {

                } else if (getPhotos.list.length > 0) {

                    getPhotos.list.forEach(async (itemRef) => {
                        let url = await getDownloadURL(itemRef);
                        setPhotosLocation(prev => [...prev, itemRef.fullPath])
                        setPhotosFirestore(prev => [...prev, url])
                    });
                }
            })
            setTimeout(async () => {
                const getVideos = await api.acompanhante.getVideoFiles(id)

                if (getVideos.error) {

                } else if (getVideos.list.length > 0) {

                    getVideos.list.forEach(async (itemRef) => {
                        let url = await getDownloadURL(itemRef);
                        setVideosFirestore(prev => [...prev, url])
                    });
                }
            })
        }
    }, [started])

    useEffect(() => {
        if (!started) {
            setStarted(true)
            setTimeout(async () => {
                const get = await api.acompanhante.getPhotoFiles(id)

                if (get.list) {
                    console.log(get.list)
                }
            })
        }
    }, [])

    const handleDelePhotos = async (index: number) => {
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, photosLocation[index]);

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });


        let currentPhotos = photosFirestore
        setPhotosFirestore([])
        let deletedPhoto = currentPhotos.splice(index, 1)
        setPhotosFirestore(currentPhotos)
    }

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setPhotos(files);
    };

    const handleClickPhoto = () => {
        const input = document.getElementById('hidden-input-photos');
        if (input) {
            input.click();
        }
    };

    useEffect(() => {
        if (photos) {
            if (photos.length > 0) {
                let files = Array.from(photos)

                files.forEach(async file => {
                    if (file) {
                        const register = await api.acompanhante.uploadPhotos(file, id)
                        if (register.url) {
                            setPhotosUrl(prev => [...prev, register.url!])
                        }

                    }
                })
            }
        }
    }, [photos])

    const handleChangeVideos = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setVideos(files);
    };

    const handleClickVideo = () => {
        const input = document.getElementById('hidden-input-videos');
        if (input) {
            input.click();
        }
    };

    useEffect(() => {
        if (videos) {
            if (videos.length > 0) {
                let files = Array.from(videos)

                files.forEach(async file => {
                    if (file) {
                        try {
                            const options = {
                                maxSizeMB: 0.02, // Tamanho máximo em MB (ajuste conforme necessário)
                                maxWidthOrHeight: 720, // Largura ou altura máxima
                                useWebWorker: true,
                            };

                            const compressedFile = await imageCompression(file, options);
                            // Faça o upload do `compressedFile` para o Firebase Storage

                            const register = await api.acompanhante.uploadVideos(compressedFile, id)
                            if (register.url) {
                                setVideosUrl(prev => [...prev, register.url!])
                            }

                        } catch (error) {
                            console.error("Erro ao comprimir a imagem:", error);
                        }


                    }
                })
            }
        }
    }, [videos])

    useEffect(() => {
        if (videos) {
            if (videos.length > 0) {
                let files = Array.from(videos)

                files.forEach(file => {
                    if (file) {
                        const url = URL.createObjectURL(file);
                        setVideosUrl(prev => [...prev, url])
                    }
                })
            }
        }
    }, [videos])

    return (
        <div className='flex flex-col items-center w-full flex-1 relative' style={{ display: visible ? 'flex' : 'none' }}>
            <h1 className='text-3xl font-semibold text-center my-12'>Galeria | Fotos e Vídes da Acompanhante</h1>
            <div className='flex flex-col w-full flex-1 border rounded-md p-3 mb-3'>
                <div className='flex w-full gap-3 mb-3'>
                    <input
                        id='hidden-input-photos'
                        className="hidden"
                        type="file"
                        accept="image/jpeg,image/png"
                        multiple
                        onChange={handleChangePhoto}
                    />
                    <span className="border rounded-lg cursor-pointer flex justify-center items-center font-semibold hover:bg-gray-50">
                        <p className="px-6 py-2" onClick={() => setGalleryScreen('photos')}>Fotos</p>
                        <button className="bg-sky-700 hover:bg-sky-800 = px-3 h-full rounded-r-lg" onClick={handleClickPhoto}>
                            <AddIcon sx={{ color: 'white' }} />
                        </button>
                    </span>
                    <input
                        id='hidden-input-videos'
                        className="hidden"
                        type="file"
                        accept="video/mp4"
                        multiple
                        onChange={handleChangeVideos}
                    />
                    <span className="border rounded-lg cursor-pointer flex justify-center items-center font-semibold hover:bg-gray-50" >
                        <p className="px-6 py-2" onClick={() => setGalleryScreen('videos')}>Vídeos</p>
                        <button className="bg-sky-700 hover:bg-sky-800 = px-3 h-full rounded-r-lg" onClick={handleClickVideo}>
                            <AddIcon sx={{ color: 'white' }} />
                        </button>
                    </span>
                </div>
                <hr className='mb-3' />
                <div className='grid-cols-6 gap-3' style={{ display: galleryScreen == 'photos' ? 'grid' : 'none' }}>
                    {photosFirestore.length > 0 &&
                        photosFirestore.map((item, index) => {
                            return (
                                <span key={index} className="flex items-end justify-center relative border w-full h-56 max-h-56 gap-1">
                                    <img className="w-full h-full object-contain" src={item} alt="" />
                                    <button type='button' className='w-10 h-10 rounded-full border absolute mb-2 bg-black/60' onClick={() => handleDelePhotos(index)}>
                                        <DeleteIcon color="error" />
                                    </button>
                                </span>
                            )
                        })
                    }
                    {photosUrl.length > 0 &&
                        photosUrl.map((item, index) => {
                            return (
                                <span key={index} className="flex items-end justify-center relative border border-green-500 shadow-md shadow-green-500 w-full h-56 max-h-56 gap-1">
                                    <img className="w-full h-full object-contain" src={item} alt="" />
                                    <button type='button' className='w-10 h-10 rounded-full border absolute mb-2 bg-black/60'>
                                        <DeleteIcon color="error" />
                                    </button>
                                </span>
                            )
                        })
                    }
                </div>
                <div className='grid grid-cols-6 gap-3' style={{ display: galleryScreen == 'videos' ? 'grid' : 'none' }}>
                    {videosFirestore.length > 0 &&
                        videosFirestore.map((item, index) => {
                            return (
                                <span key={index} className="flex items-end justify-center relative border w-full h-56 max-h-56 gap-1">
                                    <video src={item} controls width="125" height="125">
                                        Seu navegador não suporta a tag de vídeo.
                                    </video>
                                    <button type='button' className='w-10 h-10 rounded-full border absolute mb-2 bg-black/60'>
                                        <DeleteIcon color="error" />
                                    </button>
                                </span>
                            )
                        })
                    }
                    {videosUrl.length > 0 &&
                        videosUrl.map((item, index) => {
                            return (
                                <span key={index} className="border border-primary shadow-md shadow-primary w-full h-56 max-h-56 flex justify-between flex-col gap-1">
                                    <video src={item} controls width="200" height="200">
                                        Seu navegador não suporta a tag de vídeo.
                                    </video>
                                    <DeleteIcon />
                                </span>
                            )
                        })
                    }
                </div>
            </div>
            <Button variant='outlined' className='self-start mb-10' onClick={() => fn("search")}>Voltar</Button>
        </div>
    )
}

export default ViewGallery