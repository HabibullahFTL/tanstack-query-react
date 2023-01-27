import { useRef, useState } from 'react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

const SlideShow = () => {
  const nextBtn = useRef<HTMLButtonElement | null>(null);
  const prevBtn = useRef<HTMLButtonElement | null>(null);
  const [btn, setBtn] = useState<any>();

  return (
    <>
      <div>
        <button
          ref={prevBtn}
          onClick={() => btn.slidePrev()}
          className="prev-btn"
          id="prev-btn"
        >
          Prev
        </button>
        <button
          ref={nextBtn}
          onClick={() => btn.slideNext()}
          className="next-btn"
          id="next-btn"
        >
          Next
        </button>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => {}}
        // onInit={({navigation}) => {
        //   navigation.prevEl = prevBtn.current;
        //   navigation.nextEl = nextBtn.current;
        //   navigation.init();
        //   navigation.update();
        // }}
        // navigation={{
        //   nextEl: '#next-btn',
        //   prevEl: '#prev-btn',
        // }}
        onBeforeInit={(swiper) => {
          setBtn(swiper);
        }}
        // navigation={true}
        modules={[Navigation]}
      >
        <SwiperSlide className="!h-20 w-20 border border-rose-400">
          <div className="h-full">Sanjoy</div>
        </SwiperSlide>
        <SwiperSlide className="!h-20 w-20 border border-rose-400">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="!h-20 w-20 border border-rose-400">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="!h-20 w-20 border border-rose-400">
          Slide 4
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SlideShow;
