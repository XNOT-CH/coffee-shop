// เราใช้ Swiper สำหรับทำสไลเดอร์ มันเป็น library ที่ทำให้เราสามารถสร้างสไลเดอร์ได้ง่าย ๆ

import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination'

// ทำสไลเดอร์สำหรับแบนเนอร์
// ส่วนที่ เรา เพิ่ม รูปภาพแบนเนอร์ จากลิ้งรูป อย่างในตัวอย่างมี 3 รูป 
const banners  = [
    '/images/banner-1.jpg',
    '/images/banner-2.jpg',
    '/images/banner-3.jpg',
]


// สร้าง component BannerSlider
// Swiper เป็น component ที่เราจะใช้สร้างสไลเดอร์
const BannerSlider = () => {
  
  // return คือที่ เราจะ ให้ มันออกไป แสดงผลหน้าเว็บ 
  return (
    <Swiper
      className="banner-slider"
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 2000 }}
      pagination={{ clickable: true }}
      loop
    >
      {/* // วนรูปที่ อยู่ใน array banners แล้วสร้าง SwiperSlide สำหรับแต่ละรูป
      // แล้วเอาไป <BannerSlider /> ใน Menupage.jsx */}
      {banners.map((src) => (
        <SwiperSlide key={src}>
          <img src={src} alt="โปรโมชันของร้าน" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

// ถ้าเราอยากใช้ ภาพ สไล ก็ พิม < BannerSlider /> ได้เลย  ตอนนี้เราใช้ ที่ี MenuPage.jsx 
export default BannerSlider   