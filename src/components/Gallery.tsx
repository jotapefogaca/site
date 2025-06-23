'use clients'
import { SyntheticEvent, useEffect, useState } from "react"
import Image from "next/image"
import photo from '../../public/media/icons/photo.svg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

type Props = {
    photos: string[],
    videos: string[]
}

const Gallery = ({ photos, videos }: Props) => {
    //Variaveis
    const [screen, setScreen] = useState<'photos' | 'videos' | 'all'>('all')
    const [currentIndex, setCurrentIndex] = useState(2)
    const [float, setFloat] = useState(false)
    const [floatVideo, setFloatVideo] = useState(false)
    const [medias, setMedias] = useState<string[]>([])

    useEffect(() => {
        setMedias([...photos, ...videos])
    }, [])

    const handleCalculateAll = (): string => {
        let all = photos.length + videos.length

        return all.toString()
    }

    const handleNext = () => {
        if (screen === 'all') {
            if (float) {
                let next = currentIndex + 1
                if (next < photos.length) {
                    setCurrentIndex(next)
                    updateHistory(next)
                } else {
                    setFloat(false)
                    setFloatVideo(true)
                    setCurrentIndex(0)
                    updateHistory(0)
                }
            } else if (floatVideo) {
                let next = currentIndex + 1
                if (next < videos.length) {
                    setCurrentIndex(next)
                    updateHistory(next)
                } else {
                    setFloatVideo(false)
                    setFloat(true)
                    setCurrentIndex(0)
                    updateHistory(0)
                }
            }
        } else {
            let next = currentIndex + 1
            if (next < photos.length) {
                setCurrentIndex(next)
                updateHistory(next)
            } else {
                setCurrentIndex(0)
                updateHistory(0)
            }
        }
    }

    const handlePrev = () => {
        if (screen === 'all') {
            if (float) {
                let prev = currentIndex - 1
                if (prev >= 0) {
                    setCurrentIndex(prev)
                    updateHistory(prev)
                } else {
                    setFloat(false)
                    setFloatVideo(true)
                    setCurrentIndex(videos.length - 1)
                    updateHistory(videos.length - 1)
                }
            } else if (floatVideo) {
                let prev = currentIndex - 1
                if (prev >= 0) {
                    setCurrentIndex(prev)
                    updateHistory(prev)
                } else {
                    setFloatVideo(false)
                    setFloat(true)
                    setCurrentIndex(photos.length - 1)
                    updateHistory(photos.length - 1)
                }
            }
        } else {
            let prev = currentIndex - 1
            if (prev >= 0) {
                setCurrentIndex(prev)
                updateHistory(prev)
            } else {
                setCurrentIndex(photos.length - 1)
                updateHistory(photos.length - 1)
            }
        }
    }

    const handleGetPoster = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const video = event.currentTarget;
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;

        if (!video || !canvas) {
            console.error('Elemento de vídeo ou canvas não encontrado.');
            return;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            console.error('Não foi possível obter o contexto do canvas.');
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        video.currentTime = 1;
        video.pause();

        const onSeeked = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/jpeg');
            canvas.toBlob((blob) => {
                if (blob) {
                    video.setAttribute('poster', URL.createObjectURL(blob));
                }
            }, "image/jpeg");

            video.removeEventListener('seeked', onSeeked); // Remove o listener após captura
        };

        video.addEventListener('seeked', onSeeked);
    };

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.index !== undefined) {
                setCurrentIndex(event.state.index);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const updateHistory = (index: number) => {
        history.pushState({ index }, '', '');
    };

    return (
        <div className="flex flex-col h-fit w-full bg-[rgb(32,35,42)] rounded-2xl mb-10 p-12 gap-12">
            <canvas id="canvas" style={{ display: 'none' }}></canvas>
            {float && currentIndex >= 0 &&
                <div
                    className="fixed top-0 left-0 w-full h-[100dvh] flex flex-col justify-between items-center bg-[#20232ab2] z-50"
                    onClick={() => setFloat(false)}
                >
                    <div
                        className="flex items-center justify-center w-full h-[90%] p-8"
                    >
                        <span className="h-full p-1 border border-secondary rounded-sm relative flex items-center justify-center">
                            <img
                                className='h-full w-full object-cover rounded-sm'
                                src={photos[currentIndex]}
                                alt={'Foto em destaque'}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </span>
                    </div>
                    <div
                        className="bg-[#20232a] w-full flex items-center justify-center py-5 gap-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span
                            className='w-8 h-8 flex items-center justify-center border border-white cursor-pointer rounded-full'
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                        >
                            <ArrowBackIosNewIcon sx={{ fontSize: '14px', color: 'white' }} />
                        </span>
                        <span
                            className='w-8 h-8 flex items-center justify-center border border-white cursor-pointer rounded-full'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                        >
                            <ArrowForwardIosIcon sx={{ fontSize: '14px', color: 'white' }} />
                        </span>
                        <span
                            className='w-fit px-4 h-8 flex items-center justify-center border cursor-pointer border-white rounded-full text-white'
                            onClick={(e) => {
                                e.stopPropagation();
                                setFloat(false)
                            }}
                        >
                            Fechar
                        </span>
                    </div>
                </div>
            }
            {floatVideo && currentIndex >= 0 &&
                <div className="fixed top-0 left-0 w-full h-[100dvh] flex flex-col justify-between items-center bg-[#20232ab2] z-50" onClick={(e) => {
                    setFloatVideo(false)
                }}>
                    <div className="flex items-center justify-center w-full h-[90%] p-8">
                        <span className="h-full p-1 border border-secondary rounded-sm relative flex items-center justify-center">
                            <video className="h-full w-full object-cover rounded-sm" src={videos[currentIndex]} controls onClick={e => e.stopPropagation()}>
                                Seu navegador não suporta a tag de vídeo.
                            </video>
                        </span>
                    </div>
                    <div className="bg-[#20232a] w-full flex items-center justify-center py-5 gap-5">
                        <span className='w-8 h-8 flex items-center justify-center border border-white cursor-pointer rounded-full' onClick={handlePrev}>
                            <ArrowBackIosNewIcon sx={{ fontSize: '14px', color: 'white' }} />
                        </span>
                        <span className='w-8 h-8 flex items-center justify-center border border-white cursor-pointer rounded-full' onClick={handleNext}>
                            <ArrowForwardIosIcon sx={{ fontSize: '14px', color: 'white' }} />
                        </span>
                        <span className='w-fit px-4 h-8 flex items-center justify-center border cursor-pointer  border-white rounded-full text-white' onClick={() => setFloatVideo(false)}>
                            Fechar
                        </span>
                    </div>
                </div>
            }

            <span className="w-full flex items-center gap-10">
                <Image src={photo} alt="" />
                <h3 className="text-3xl text-white font-bold leading-none">Fotos e vídeos</h3>
            </span>
            <div className="w-full flex justify-center my-5 gap-5">
                <span className="text-white px-5 py-1 text-center border rounded-full cursor-pointer" onClick={() => setScreen('all')} style={{ borderColor: screen == 'all' ? '#D8A963' : '#fff' }}>Todas &#40;{handleCalculateAll()}&#41;</span>
                <span className="text-white px-5 py-1 text-center border rounded-full cursor-pointer" onClick={() => setScreen('photos')} style={{ borderColor: screen == 'photos' ? '#D8A963' : '#fff' }}>Fotos &#40;{photos.length.toString()}&#41;</span>
                <span className="text-white px-5 py-1 text-center border rounded-full cursor-pointer" onClick={() => setScreen('videos')} style={{ borderColor: screen == 'videos' ? '#D8A963' : '#fff' }}>Vídeos &#40;{videos.length.toString()}&#41;</span>
            </div>
            <div className='grid md:grid-cols-4 gap-4 w-full'>
                {screen == 'all' &&
                    <>
                        {photos &&
                            photos.map((item, index) => {
                                return (
                                    <span key={index} className="h-52 p-1 border border-secondary rounded-sm relative flex items-center justify-center cursor-pointer" onClick={() => {
                                        setCurrentIndex(index)
                                        setFloat(true)
                                    }}>
                                        <img className='h-full w-full object-contain rounded-sm' src={item} alt={item} />
                                        <span className='absolute flex items-center justify-center h-full w-full object-cover rounded-sm bg-transparent opacity-0 hover:opacity-100 hover:bg-[#272b372c] z-20 transition-all ease-out duration-300'>
                                            <p className='text-white'>Ver foto</p>
                                        </span>
                                    </span>
                                )
                            })
                        }
                        {videos &&
                            videos.map((item, index) => {
                                return (
                                    <span key={index} className="h-52 p-1 border border-secondary rounded-sm relative flex items-center justify-center cursor-pointer" onClick={() => {
                                        setCurrentIndex(index)
                                        setFloat(false)
                                        setFloatVideo(true)

                                    }}>
                                        <video
                                            className="h-full w-full object-contain rounded-sm"
                                            src={item}
                                            onLoadedData={handleGetPoster}
                                            crossOrigin="anonymous"
                                            muted
                                            autoPlay
                                        >
                                            Seu navegador não suporta a tag de vídeo.
                                        </video>
                                        <span className='absolute flex items-center justify-center h-full w-full object-cover rounded-sm bg-transparent z-20 animate-pulse'>
                                            <span className="flex items-center justify-center w-[50px] h-[50px] bg-[#1d1d1f9c] rounded-full">
                                                <PlayArrowRoundedIcon sx={{ color: '#d8a963', fontSize: '45px' }} />
                                            </span>
                                        </span>
                                        <span className='absolute flex items-center justify-center h-full w-full object-cover rounded-sm bg-transparent opacity-0 hover:opacity-100 hover:bg-[#272b372c] z-30 transition-all ease-out duration-300'>
                                            <p className='text-white'>Ver vídeo</p>
                                        </span>

                                    </span>
                                )
                            })
                        }
                    </>
                }
                {screen == 'photos' &&
                    <>
                        {photos &&
                            photos.map((item, index) => {
                                return (
                                    <span key={index} className="h-52 p-1 border border-secondary rounded-sm relative flex items-center justify-center cursor-pointer" onClick={() => {
                                        setCurrentIndex(index)
                                        setFloat(true)
                                        updateHistory(index);
                                    }}>
                                        <img className='h-full w-full object-contain rounded-sm' src={item} alt={item} />
                                        <span className='absolute flex items-center justify-center h-full w-full object-cover rounded-sm bg-transparent opacity-0 hover:opacity-100 hover:bg-[#272b372c] z-20 transition-all ease-out duration-300'>
                                            <p className='text-white'>Ver foto</p>
                                        </span>
                                    </span>
                                )
                            })
                        }
                    </>
                }
                {screen == 'videos' &&
                    <>
                        {videos &&
                            videos.map((item, index) => {
                                return (
                                    <span key={index} className="h-52 p-1 border border-secondary rounded-sm relative flex items-center justify-center cursor-pointer" onClick={() => {
                                        setCurrentIndex(index)
                                        setFloat(false)
                                        setFloatVideo(true)
                                        updateHistory(index);
                                    }}>
                                        <video
                                            className="h-full w-full object-cover rounded-sm"
                                            src={item}
                                            onLoadedData={handleGetPoster}
                                            crossOrigin="anonymous"
                                            autoPlay
                                        >
                                            Seu navegador não suporta a tag de vídeo.
                                        </video>
                                        <span className='absolute flex items-center justify-center h-full w-full object-cover rounded-sm bg-transparent z-20 animate-pulse'>
                                            <span className="flex items-center justify-center w-[50px] h-[50px] bg-[#1d1d1f9c] rounded-full">
                                                <PlayArrowRoundedIcon sx={{ color: '#d8a963', fontSize: '45px' }} />
                                            </span>
                                        </span>
                                        <span className='absolute flex items-center justify-center h-full w-full object-cover rounded-sm bg-transparent opacity-0 hover:opacity-100 hover:bg-[#272b372c] z-20 transition-all ease-out duration-300'>
                                            <p className='text-white'>Ver vídeo</p>
                                        </span>
                                    </span>
                                )
                            })
                        }
                    </>
                }

            </div>
        </div>
    )
}

export default Gallery