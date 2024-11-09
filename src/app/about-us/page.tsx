'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import PaginationComponent from '@/core/components/Pagination';
import { ArrowCircleRightOutlined } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { Fade } from 'react-awesome-reveal';

const About = () => {
  const [offset, setOffset] = useState(0);

  const data = [
    {
      imgSrc: '/assets/images/img-1.png',
      title:
        'លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម អញ្ជើញចូលរួមពិធីសម្ពោធស្តង់ពិព័រណ៍ពាណិជ្ជកម្មរបស់កម្ពុជា នាឱកាសព្រឹត្តិការណ៍ពិព័រណ៍ចិន-កម្ពុជា',
      desc: '(ណាននីង សាធារណរដ្ឋប្រជាមានិតចិន)៖ នាព្រឹកថ្ងៃអង្គារ ទី២៤ ខែកញ្ញា ឆ្នាំ២០២៤ នៅមជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍អន្តរជាតិណាននីង ខេត្តក្វាងស៊ី សាធារណរដ្ឋប្រជាមានិតចិន លោកជំទាវ ចម និម្មល បានអញ្ជើញចូលរួមសម្ពោធស្តង់នៃពិព័រណ៍ពាណិជ្ជកម្មរបស់កម្ពុជាដើម្បីបង្ហាញនូវផលិតផលខ្មែរទៅកាន់ទីផ្សារអន្តរជាតិ។',
    },
    {
      imgSrc: '/assets/images/img-2.png',
      title:
        'លោកជំទាវ សុមេធ សុមនា អនុរដ្ឋលេខាធិការ តំណាងដ៏ខ្ពង់ខ្ពស់ លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម បានអញ្ជើញចូលរួមកម្មវិធី',
      desc: '(ណាននីង, ចិន)៖ នាព្រឹកថ្ងៃចន្ទ ទី២៣ ខែកញ្ញា ឆ្នាំ២០២៤ នៅទីក្រុងណាននីង សាធារណរដ្ឋប្រជាមានិតចិន លោកជំទាវ សុមេធ សុមនា អនុរដ្ឋលេខាធិការ តំណាងដ៏ខ្ពង់ខ្ពស់ លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម បានអញ្ជើញចូលរួមក្នុងកម្មវិធីពិព័រណ៍ដែលមានគោលបំណងលើកស្ទួយផលិតផលកម្ពុជាឱ្យបានស្គាល់នូវទីផ្សារជួរពិភពលោក។',
    },
    {
      imgSrc: '/assets/images/img-3.png',
      title:
        'លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម និងជាប្រធានគណៈកម្មការរៀបចំ និងចូលរួមពិព័រណ៍ពិភពលោក និងពិព័រណ៍ពាណិជ្ជកម្ម',
      desc: '(ណាននីង សាធារណរដ្ឋប្រជាមានិតចិន)៖ នាព្រឹកថ្ងៃអង្គារ ទី២៤ ខែកញ្ញា ឆ្នាំ២០២៤ នៅមជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍អន្តរជាតិណាននីង ខេត្តក្វាងស៊ី សាធារណរដ្ឋប្រជាមានិតចិន លោកជំទាវ ចម និម្មល បានអញ្ជើញចូលរួមពិព័រណ៍ពាណិជ្ជកម្មកម្ពុជាបានបង្ហាញផលិតផលថ្មីៗដើម្បីលើកស្ទួយកសិកម្ម និងឧស្សាហកម្មនៅកម្ពុជា។',
    },
    {
      imgSrc: '/assets/images/img-2.png',
      title:
        'លោកជំទាវ សុមេធ សុមនា អនុរដ្ឋលេខាធិការ តំណាងដ៏ខ្ពង់ខ្ពស់ លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម បានអញ្ជើញចូលរួមកម្មវិធី',
      desc: '(ណាននីង, ចិន)៖ នាព្រឹកថ្ងៃចន្ទ ទី២៣ ខែកញ្ញា ឆ្នាំ២០២៤ នៅទីក្រុងណាននីង សាធារណរដ្ឋប្រជាមានិតចិន លោកជំទាវ សុមេធ សុមនា អនុរដ្ឋលេខាធិការ តំណាងដ៏ខ្ពង់ខ្ពស់ លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម បានអញ្ជើញចូលរួមក្នុងកម្មវិធីពិព័រណ៍ដែលមានគោលបំណងលើកស្ទួយផលិតផលកម្ពុជាឱ្យបានស្គាល់នូវទីផ្សារជួរពិភពលោក។',
    },
    {
      imgSrc: '/assets/images/img-1.png',
      title:
        'លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម អញ្ជើញចូលរួមពិធីសម្ពោធស្តង់ពិព័រណ៍ពាណិជ្ជកម្មរបស់កម្ពុជា នាឱកាសព្រឹត្តិការណ៍ពិព័រណ៍ចិន-កម្ពុជា',
      desc: '(ណាននីង សាធារណរដ្ឋប្រជាមានិតចិន)៖ នាព្រឹកថ្ងៃអង្គារ ទី២៤ ខែកញ្ញា ឆ្នាំ២០២៤ នៅមជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍អន្តរជាតិណាននីង ខេត្តក្វាងស៊ី សាធារណរដ្ឋប្រជាមានិតចិន លោកជំទាវ ចម និម្មល បានអញ្ជើញចូលរួមសម្ពោធស្តង់នៃពិព័រណ៍ពាណិជ្ជកម្មរបស់កម្ពុជាដើម្បីបង្ហាញនូវផលិតផលខ្មែរទៅកាន់ទីផ្សារអន្តរជាតិ។',
    },
    {
      imgSrc: '/assets/images/img-3.png',
      title:
        'លោកជំទាវ ចម និម្មល រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម និងជាប្រធានគណៈកម្មការរៀបចំ និងចូលរួមពិព័រណ៍ពិភពលោក និងពិព័រណ៍ពាណិជ្ជកម្ម',
      desc: '(ណាននីង សាធារណរដ្ឋប្រជាមានិតចិន)៖ នាព្រឹកថ្ងៃអង្គារ ទី២៤ ខែកញ្ញា ឆ្នាំ២០២៤ នៅមជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍អន្តរជាតិណាននីង ខេត្តក្វាងស៊ី សាធារណរដ្ឋប្រជាមានិតចិន លោកជំទាវ ចម និម្មល បានអញ្ជើញចូលរួមពិព័រណ៍ពាណិជ្ជកម្មកម្ពុជាបានបង្ហាញផលិតផលថ្មីៗដើម្បីលើកស្ទួយកសិកម្ម និងឧស្សាហកម្មនៅកម្ពុជា។',
    },
  ];

  const paginatedData = data.slice(offset, offset + 3);

  return (
    <main className="font-battambang flex flex-col justify-between h-100% gap-4 mt-[40px]">
      <Fade>
        <section className="container xl:max-w-[70%] mx-auto max-xl:px-10 py-4">
          <h2 className="font-moul text-2xl text-header text-center mb-4">អំពីការពិព័រណ៍</h2>
          <div className="grid grid-cols-6 gap-4  justify-between">
            <div className="max-xl:col-span-6 col-span-3">
              <Image
                height={401}
                width={459}
                className="max-xl:w-full object-cover max-xl:h-full"
                src="/assets/images/exhibition.png"
                alt="/assets/images/exhibition.png"
              />
            </div>
            <div className="flex flex-col max-xl:col-span-6 col-span-3 gap-4">
              <div className="text-[#E9282B] font-medium text-[16px] font-montserrat">
                December 10, 2024
              </div>
              <div className="grid gap-4">
                <h2 className="text-[22px] text-ellipsis line-clamp-2 text-header font-bold">
                  សេចក្តីជូនដំណឹងស្ដីពី៖ ការរៀបចំពិព័រណ៍នាំចូល និងនាំចេញប្រទេសចិន
                </h2>
                <p className="line-clamp-3 max-xl:line-clamp-2 text-ellipsis leading-loose text-xl max-sm:text-base">
                  ពិព័រណ៍ពាណិជ្ជកម្មនេះ មានការចូលរួមគាំទ្រពីបណ្ដាប្រទេសនៅក្នុងតំបន់ដូចជា៖ ប្រទេសចិន
                  ជប៉ុន ថៃឡង់ដ៍ វៀតណាម ឥណ្ឌូនេស៊ី ម៉ាឡេស៊ី ឡាវ មីយ៉ាន់ម៉ា មន្ទីរពាណិជ្ជកម្មទាំង២៥
                  រាជធានី-ខេត្ត អង្គការ សមាគម ពិព័រណ៍ពាណិជ្ជកម្មនេះ
                  មានការចូលរួមគាំទ្រពីបណ្ដាប្រទេសនៅក្នុងតំបន់ដូចជា៖ ប្រទេសចិន ជប៉ុន ថៃឡង់ដ៍ វៀតណាម
                  ឥណ្ឌូនេស៊ី ម៉ាឡេស៊ី ឡាវ មីយ៉ាន់ម៉ា មន្ទីរពាណិជ្ជកម្មទាំង២៥ រាជធានី-ខេត្ត អង្គការ
                  សមាគម ព្រមទាំងក្រុមហ៊ុនក្នុងស្រុក និងក្រៅប្រទេស ដែលមានស្ដង់សរុបជិត ៤០០ស្ដង់
                  ដើម្បីតាំងបង្ហាញផលិតផលសក្តានុពលកម្ពុជា និងទំនិញនាំចូលដូចជា សម្ភារៈការិយាល័យ
                  ក្រណាត់ និងសម្លៀកបំពាក់ សម្ភារៈប្រើប្រាស់ទូទៅ ផលិតផលសម្រាប់តុបតែងក្នុងគេហដ្ឋាន
                  គ្រឿងអលង្ការ និងត្បូងថ្មមាន
                </p>
              </div>
              <Image
                height={40}
                width={100}
                className="w-4/5 max-xl:w-full object-cover max-xl:h-full h-4/5"
                src="/assets/images/exhibition-2.png"
                alt="/assets/images/exhibition-2.png"
              />
            </div>
          </div>
        </section>

        <section className="container xl:max-w-[80%] mx-auto max-xl:px-10 py-4">
          <div className="grid grid-cols-5">
            <div className="max-xl:col-span-5 col-span-2">
              <h2 className="font-moul text-2xl text-header text-start mb-4">ការពិព័រណ៍បន្ទាប់</h2>
            </div>
            <div className="flex flex-col max-xl:col-span-5 col-span-3 gap-4">
              <div className="flex max-sm:flex-col justify-between items-start gap-3">
                <p className="line-clamp-2 text-ellipsis leading-loose text-xl max-sm:w-full w-[70%] max-sm:text-base">
                  ពិព័រណ៍ពាណិជ្ជកម្មនេះ មានការចូលរួមគាំទ្រពីបណ្ដាប្រទេសនៅក្នុងតំបន់ដូចជា៖ ប្រទេសចិន
                  ជប៉ុន ថៃឡង់ដ៍ វៀតណាម ឥណ្ឌូនេស៊ី ម៉ាឡេស៊ី ឡាវ មីយ៉ាន់ម៉ា មន្ទីរពាណិជ្ជកម្មទាំង២៥
                  រាជធានី-ខេត្ត អង្គការ សមាគម ពិព័រណ៍ពាណិជ្ជកម្មនេះ
                  មានការចូលរួមគាំទ្រពីបណ្ដាប្រទេសនៅក្នុងតំបន់ដូចជា៖ ប្រទេសចិន ជប៉ុន ថៃឡង់ដ៍ វៀតណាម
                  ឥណ្ឌូនេស៊ី ម៉ាឡេស៊ី ឡាវ មីយ៉ាន់ម៉ា មន្ទីរពាណិជ្ជកម្មទាំង២៥ រាជធានី-ខេត្ត អង្គការ
                  សមាគម ព្រមទាំងក្រុមហ៊ុនក្នុងស្រុក និងក្រៅប្រទេស ដែលមានស្ដង់សរុបជិត ៤០០ស្ដង់
                  ដើម្បីតាំងបង្ហាញផលិតផលសក្តានុពលកម្ពុជា និងទំនិញនាំចូលដូចជា សម្ភារៈការិយាល័យ
                  ក្រណាត់ និងសម្លៀកបំពាក់ សម្ភារៈប្រើប្រាស់ទូទៅ ផលិតផលសម្រាប់តុបតែងក្នុងគេហដ្ឋាន
                  គ្រឿងអលង្ការ និងត្បូងថ្មមាន
                </p>
                <div className="flex items-center font-bold gap-4 max-sm:self-end">
                  <h2 className="">មើលបន្ថែម</h2>
                  <ArrowCircleRightOutlined className="w-7 h-7" />
                </div>
              </div>
              {Array(3)
                .fill({
                  dateNumber: '13',
                  dateText: 'Dec, 2024',
                  imageUrl: '/assets/images/exhibition-2.png',
                  eventTitle: 'បើកកកាយសក្តានុពលពិព័រណ៍កម្ពុជា',
                  location: 'ភ្នំពេញ',
                  eventDate: 'Dec 13, 2024 8:00 am',
                  price: 'Free',
                })
                .map((index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 justify-between max-sm:border-b max-sm:py-2"
                  >
                    <div className="flex sm:items-center items-start gap-4">
                      <div>
                        <h2 className="flex flex-col font-montserrat">
                          <span className="font-bold text-5xl">13</span>
                          <span>Dec, 2024</span>
                        </h2>
                      </div>
                      <div className="flex max-sm:gap-4 gap-10 max-sm:flex-col">
                        <Image
                          height={150}
                          width={150}
                          className="object-cover max-sm:w-full max-sm:h-full"
                          src="/assets/images/exhibition-2.png"
                          alt="/assets/images/exhibition-2.png"
                        />
                        <div className="flex max-2xl:flex-col w-full max-sm:gap-2 max-2xl:gap-4 gap-36 items-center max-2xl:items-start max-2xl:justify-center justify-between">
                          <div className="flex flex-col justify-center">
                            <h2 className="font-semibold text-xl max-sm:text-lg ">
                              បើកកកាយសក្តានុពលពិព័រណ៍កម្ពុជា
                            </h2>
                            <p className="flex gap-10">
                              <span className="font-semibold ">ភ្នំពេញ</span>
                              <span className="font-montserrat text-gray-500">
                                Dec 13, 2024 8:00 am
                              </span>
                            </p>
                          </div>
                          <h2 className="font-semibold text-xl max-sm:text-base text-main font-montserrat">
                            Free
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="container py-4 max-xl:px-10 xl:max-w-[80%] mx-auto grid grid-cols-2 gap-10 justify-between items-center">
          <div className="col-span-1 max-xl:col-span-2">
            <Image
              className="w-full"
              src="/assets/images/exhibition-3.png"
              height={594}
              width={594}
              alt="/assets/images/exhibition-3.png"
            />
          </div>
          <div className="col-span-1 max-xl:col-span-2">
            <h2 className="text-header text-2xl font-moul mb-4 ">
              អំពីស្តង់ពិព័រណ៍ពាណិជ្ជកម្មរបស់កម្ពុជា
            </h2>
            <p className="line-clamp-3 text-ellipsis leading-loose text-xl max-sm:text-base">
              រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម និងជាប្រធានគណៈកម្មការរៀបចំ និងចូលរួមពិព័រណ៍ពិភពលោក
              និងពិព័រណ៍ពាណិជ្ជកម្មអន្តរជាតិ
              បានអញ្ជើញចូលរួមក្នុងពិធីសម្ពោធស្តង់ពិព័រណ៍ពាណិជ្ជកម្មរបស់កម្ពុជា
              នាឱកាសព្រឹត្តិការណ៍ពិព័រណ៍ចិន-អាស៊ានលើកទី២១ ក្រោមអធិបតីភាព ឯកឧត្តម វង្សី វិស្សុត
              ឧបនាយករដ្ឋមន្រ្តីប្រចាំការ រដ្ឋមន្រ្តីទទួលបន្ទុកទីស្តីការគណៈរដ្ឋមន្រ្តី
              តំណាងដ៏ខ្ពង់ខ្ពស់ សម្តេចមហាបវរធិបតី ហ៊ុន ម៉ាណែត
              នាយករដ្ឋមន្រ្តីនៃព្រះរាជាណាចក្រកម្ពុជា។
            </p>
            <button
              type="button"
              className="bg-main font-montserrat text-white py-2 my-4 px-8 max-xl:hidden transform active:scale-95 transition-transform duration-150"
            >
              What we offer
            </button>
          </div>
        </section>
        <section className="container py-4 max-xl:px-10 xl:max-w-[80%] mx-auto gap-10 justify-between items-center">
          <div className="grid grid-cols-3 gap-4 xl:gap-10">
            <h2 className="text-header font-moul max-xl:col-span-3 xl:leading-loose text-2xl xl:w-[50%] ">
              ដៃគូសហការ និង អ្នកឧបត្ថម្ភកម្មវិធី
            </h2>
            <p className="line-clamp-3 text-ellipsis leading-loose max-xl:col-span-3 col-span-2 text-xl max-sm:text-base">
              រដ្ឋមន្ត្រីក្រសួងពាណិជ្ជកម្ម និងជាប្រធានគណៈកម្មការរៀបចំ និងចូលរួមពិព័រណ៍ពិភពលោក
              និងពិព័រណ៍ពាណិជ្ជកម្មអន្តរជាតិ
              បានអញ្ជើញចូលរួមក្នុងពិធីសម្ពោធស្តង់ពិព័រណ៍ពាណិជ្ជកម្មរបស់កម្ពុជា
              នាឱកាសព្រឹត្តិការណ៍ពិព័រណ៍ចិន-អាស៊ានលើកទី២១ ក្រោមអធិបតីភាព ឯកឧត្តម វង្សី វិស្សុត
              ឧបនាយករដ្ឋមន្រ្តីប្រចាំការ រដ្ឋមន្រ្តីទទួលបន្ទុកទីស្តីការគណៈរដ្ឋមន្រ្តី
              តំណាងដ៏ខ្ពង់ខ្ពស់ សម្តេចមហាបវរធិបតី ហ៊ុន ម៉ាណែត
              នាយករដ្ឋមន្រ្តីនៃព្រះរាជាណាចក្រកម្ពុជា។
            </p>
          </div>
        </section>
        <section className="container max-w-[80%] py-4 w-full mx-auto grid grid-cols-6 max-xl:grid-cols-3 gap-6">
          {Array(6)
            .fill(6)
            .map((_, index) => ({
              id: index + 1,
              src: `/assets/sponsors/image-${index + 1}.png`,
              alt: `sponsor-${index + 1}`,
            }))
            .map((img) => (
              <Image
                className="object-contain"
                key={img.id + 1}
                src={img.src}
                width={250}
                height={100}
                alt={img.src as string}
              />
            ))}
        </section>
        <section className="container max-w-[80%] mx-auto py-4">
          <h2 className="text-center text-2xl font-moul text-header mb-4">
            សកម្មភាពនានា នៃពិព័រណ៍ពាណិជ្ជកម្ម
          </h2>
          <Divider className="h-1 bg-orange-500 mb-4" />

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
            {paginatedData.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Image className="w-full" src={item.imgSrc} height={594} width={594} alt="image" />
                <h2 className="font-battambang text-xl font-bold line-clamp-2 leading-relaxed text-ellipsis text-header">
                  {item.title}
                </h2>
                <p className="text-lg leading-relaxed line-clamp-3 text-ellipsis">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-10 font-montserrat">
            <PaginationComponent
              total={data.length}
              pageSize={3}
              onChange={(newOffset: number) => setOffset(newOffset)}
              showPrevNext={true}
            />
          </div>
        </section>
      </Fade>
    </main>
  );
};

export default About;
