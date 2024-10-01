import React, { useEffect, useState } from 'react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import { useGetHomeDetailsQuery } from '../../redux/api/HomeApi';
import Loader from '../../components/Loader';
import FetchLoader from '../../components/FetchLoader';
import Testimonial from './Testimonial';

const LandingSections = () => {
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState([]);
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [brands, setBrands] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);

  const {
    data: HomeData,
    isLoading,
    isFetching,
  } = useGetHomeDetailsQuery({
    phoneNumber: '',
  });
  useEffect(() => {
    if (HomeData && HomeData.data) {
      setReviews(HomeData?.data?.reviews);
      setServices(HomeData?.data?.mostBookedServices);
      setCategory(HomeData?.data?.category);
      setBanners(HomeData?.data?.banner);
      setBrands(HomeData?.data?.laptopBrands);
      setCoupons(HomeData?.data?.coupons);
      setVideoUrl(HomeData?.data?.video);
      setBannerUrl(HomeData?.data?.mostBookedServiceBanner);
    }
  }, [HomeData]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isLoading ? (
            <FetchLoader />
          ) : (
            <>
              {' '}
              <SectionOne
                category={category}
                banners={banners}
                videoUrl={videoUrl}
              />
              <SectionTwo
                services={
                  category.some((item) => item.category === 'Repair & Service')
                    ? services
                    : []
                }
                banner ={bannerUrl}
              />
              <SectionThree coupons={coupons} />
              <SectionFour
                reviews={reviews}
                brands={brands}
                repair_service={category.some(
                  (item) => item.category === 'Repair & Service'
                )}
              />
              
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LandingSections;
