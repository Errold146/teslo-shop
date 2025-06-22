"use client";

import React, { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
import Image from "next/image";

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <div
            className={`flex flex-col items-center justify-center w-full gap-4 ${className ?? ""}`}
        >
            {/* Imagen principal */}
            <div
                className="
                    w-full
                    max-w-[1200px]
                    aspect-[4/3]
                    flex items-center justify-center
                    rounded-xl
                    shadow-lg
                    overflow-hidden
                    my-4
                    transition-all

                "
            >
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    autoplay={{
                        delay: 2500
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="w-full h-full"
                >
                    {images.map((image) => (
                        <SwiperSlide
                            key={image}
                            className="flex items-center justify-center w-full h-full"
                        >
                            <Image
                                src={`/products/${image}`}
                                alt={title}
                                fill
                                sizes="(max-width: 1000px) 120vw, 1000px"
                                className="object-contain w-full h-full"
                                draggable={false}
                                priority
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Miniaturas */}
            <div
                className="
                    w-full
                    max-w-[700px]
                    flex items-center justify-center
                "
            >
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={12}
                    slidesPerView={Math.min(images.length, 5)}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="swiper-miniaturas"
                    breakpoints={{
                        320: { slidesPerView: 3 },
                        640: { slidesPerView: Math.min(images.length, 4) },
                        1024: { slidesPerView: Math.min(images.length, 5) },
                    }}
                >
                    {images.map((image) => (
                        <SwiperSlide key={image} className="swiper-slide-miniatura">
                            <div
                                className="
                                    rounded-lg
                                    overflow-hidden
                                    border-2 border-transparent
                                    hover:border-blue-400
                                    transition-all
                                    aspect-[4/3]
                                    shadow
                                "
                            >
                                <Image
                                    src={`/products/${image}`}
                                    alt={title}
                                    width={120}
                                    height={100}
                                    className="object-contain w-full h-full"
                                    draggable={false}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};