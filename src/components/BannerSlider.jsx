import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination'

// ทำสไลเดอร์สำหรับแบนเนอร์
const banners  = [
    '/images/banner-1.jpg',
    '/images/banner-2.jpg',
    '/images/banner-3.jpg',
]

const BannerSlider = () => {
  return (
    <Swiper
      className="banner-slider"
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 2000 }}
      pagination={{ clickable: true }}
      loop
    >
      {banners.map((src) => (
        <SwiperSlide key={src}>
          <img src={src} alt="โปรโมชันของร้าน" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BannerSlider