import { useState } from 'react'

const banners = [
    '/banners/Gemini_Generated_Image_y91scuy91scuy91s.jpg',
    '/banners/Gemini_Generated_Image_m7zwjgm7zwjgm7zw.jpg',
]

const BannerSlider = () => {
    const [current, setCurrent] = useState(0)

    return (
        <div className="banner-slider">
            <div
                className="banner-track"
                onScroll={(e) => setCurrent(Math.round(e.target.scrollLeft / e.target.clientWidth))}
            >
                {banners.map((banner, index) => (
                    <img key={banner} src={banner} alt={`โปรโมชัน ${index + 1}`} />
                ))}
            </div>

            <div className="banner-dots">
                {banners.map((banner, index) => (
                    <span
                        key={banner}
                        className={current === index ? 'dot active' : 'dot'}
                    ></span>
                ))}
            </div>
        </div>
    )
}

export default BannerSlider
