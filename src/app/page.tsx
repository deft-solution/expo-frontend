'use client';
import * as React from 'react';
import Image from 'next/image';
import PaginationComponent from '@/core/components/Pagination';
import { ArrowCircleRightOutlined, CallMade } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import Marquee from 'react-fast-marquee';

export default function Home() {
  const [offset, setOffset] = React.useState(0);

  const profiles = [
    { name: 'អ្នកនាង មុនីតា', src: '/assets/profiles/image-1.png' },
    { name: 'អ្នកនាង មុនីនាថ', src: '/assets/profiles/image-2.png' },
    { name: ' អ្នកនាង នីតា', src: '/assets/profiles/image-3.png' },
    { name: 'លោកស្រី កញ្ញា', src: '/assets/profiles/image-4.png' },
    { name: 'សេង ហុក', src: '/assets/profiles/image-5.png' },
    { name: ' គង់ វិបុល', src: '/assets/profiles/image-6.png' },
    { name: ' លី គង់', src: '/assets/profiles/image-7.png' },
  ];

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
  const socialIcons = Array(4)
    .fill(null)
    .map((_, index) => ({
      src: `/assets/icons/social-${index + 1}.svg`,
      alt: `social-${index + 1}`,
    }));

  return (
    <main className="flex flex-col gap-4 justify-between h-100% font-battambang">
      <section className="relative">
        <Image
          height={500}
          width={500}
          className="object-cover w-1/2 absolute bottom-0 left-10"
          src="/assets/images/title-white.png"
          alt="/assets/images/title-white.png"
        />

        <Image
          height={594}
          width={594}
          className="w-full"
          src="/assets/images/ph-grandhall.png"
          alt="/assets/images/ph-grandhall.png"
        />
      </section>
      <Fade>
        <section className="container xl:max-w-[70%] max-xl:px-10 py-4 mx-auto mt-[40px]">
          <div className="grid grid-cols-2 gap-4 xl:gap-[40px]">
            <div className="max-xl:col-span-2">
              <Image
                height={40}
                width={600}
                className="w-full object-cover h-full"
                src="/assets/images/image-1.png"
                alt="/assets/images/image-1.png"
              />
            </div>
            <div className="flex flex-col max-xl:col-span-2 gap-4">
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
                className="w-full object-cover h-full"
                src="/assets/images/image-2.png"
                alt="/assets/images/image-2.png"
              />
            </div>
          </div>
        </section>

        <section className="container xl:max-w-[80%] max-xl:px-10 py-4 mx-auto grid grid-cols-3 gap-10">
          {[
            {
              title: 'ព័ត៌មានទូទៅ',
              content:
                'រដ្ឋលេខាធិការក្រសួងពាណិជ្ជកម្មនិងជាប្រធានក្រុមការងារជំរុញការនាំចេញ និង លោកជំទាវ សុមេធ ការរួមចំណែកយ៉ាងសកម្មជាមួយរាជរដ្ឋាភិបាលកម្ពុជា សំដៅចូលរួមកសាង និងអភិវឌ្ឍសង្គម សេដ្ឋកិច្ចកម្ពុជា ស្របតាមគោលនយោបាយ ជាយុទ្ធសាស្ដ្រផ្សេងៗ ទាំងក្នុងក្រប ខណ្ឌជាតិ និងអន្តរជាតិ ជាពិសេសសកម្មភាពសង្គមកិច្ច មនុស្សធម៌ និងសប្បុរសធម៌ សុមនា អនុរដ្ឋ សមាគមឧកញ៉ាកម្ពុជាក្នុងបញ្ជីសមាគមនិងអង្គការមិនមែនរដ្ឋាភិបាល។ សមាគមឧកញ៉ាកម្ពុជា គឺជាសមាគមអព្យាក្រឹត មិនស្វែងរកប្រាក់កម្រៃ និងធ្វើសកម្មភាពដោយមិនមានការរើសអើង ការប្រកាន់ពូជសាសន៍ ពណ៌សម្បុរ ភេទ ឬសាសនា ណាមួយឡើយ។ ស.ឧ.ក. មានគោលបំណងលើកកម្ពស់គុណតម្លៃ នៃគោរមងារឧកញ៉ា និងធានាបាននូវសេចក្តីថ្លៃថ្នូរ សីលធម៌ និងសាមគ្គីភាពរឹងមាំរបស់ឧកញ៉ា ដើម្បីជាមូលដ្ឋានក្នុង ដើម្បីធានាបាននូវភាពសុខសាន្ត សុខដុមនីយកម្ម និងការរីកចម្រើនរបស់ប្រជាជនកម្ពុជា។',
            },
            {
              title: 'សេចក្តីប្រកាសព័ត៌មាន',
              content:
                'អនុរដ្ឋលេខាធិការក្រសួងពាណិជ្ជកម្ម បានអញ្ជើញចូលរួមពិធីរាត្រីថ្លែងអំណរគុណធុរកិច្ច ឥណ្ឌូនេស៉ី-កម្ពុជា ឯកអគ្គរដ្ឋទូតឥណ្ឌូនេស៊ីប្រចាំកម្ពុជា ឯកឧត្តម លោកជំទាវតំណាងអង្គភាពពាក់ព័ន្ធ ព្រមទាំងធុរជនកម្ពុជា-ឥណ្ឌូនេស៉ី ជាច្រើនរូប។',
            },
            {
              title: 'កិច្ចប្រជុំ',
              content:
                'ឯកឧត្តម ឱក ប៊ុង រដ្ឋលេខាធិការក្រសួងពាណិជ្ជកម្ម ទទួលជួបពិភាក្សាជាមួយនឹងក្រុមការងារកម្មវិធីត្រួតពិនិត្យការនាំចេញ និងសន្តិសុខព្រំដែនពាក់ព័ន្ធណាងអង្គភាពពាក់ព័ន្ធ ព្រមទាំងធុរជនកម្ពុជា-ឥណ្ឌូនេស៉ី ជាច្រើនរូប។',
            },
          ].map((section, index) => (
            <div key={index} className="flex gap-4 col-span-1 flex-col max-xl:col-span-3">
              <div className="flex items-center justify-between border-b border-b-black pb-4">
                <h2 className="font-moul text-2xl text-header">{section.title}</h2>
                <CallMade className="w-7 h-7" />
              </div>
              <p className="line-clamp-3 max-xl:line-clamp-2 text-ellipsis leading-loose text-xl max-sm:text-base">
                {section.content}
              </p>
            </div>
          ))}
        </section>

        <section className="py-4 relative">
          <Image
            height={597}
            width={594}
            className="w-full"
            src="/assets/images/image-3.png"
            alt="/assets/images/image-3.png"
          />
          <Image
            height={100}
            width={100}
            className="absolute -translate-x-1/2 -translate-y-1/2 inset-1/2"
            src="/assets/images/youtube.png"
            alt="/assets/images/youtube.png"
          />
        </section>

        <section className="container xl:max-w-[80%] max-xl:px-10 py-4 mx-auto gap-10">
          <div className="flex items-center justify-between">
            <h2 className="font-moul text-2xl text-header">កាលវិភាគ</h2>
            <div className="flex items-center font-bold gap-4 max-sm:self-end">
              <h2 className="">មើលបន្ថែម</h2>
              <ArrowCircleRightOutlined className="w-7 h-7" />
            </div>
          </div>

          <table className="w-full font-battambang text-xl mt-4 max-xl:text-base ">
            <thead className="max-xl:flex items-center justify-start">
              <tr className="max-xl:flex justify-between items-center w-full">
                <th className="w-full font-normal flex gap-x-20 justify-start items-center max-xl:justify-center text-xl py-4">
                  <span className="bg-header text-white p-4 max-xl:w-full h-full">
                    ថ្ងៃទី១៣ ខែធ្នូ ឆ្នាំ២០២៤
                  </span>
                  <span className="max-xl:hidden">ថ្ងៃទី១៤ ខែធ្នូ ឆ្នាំ២០២៤</span>
                  <span className="max-xl:hidden">ថ្ងៃទី១៥ ខែធ្នូ ឆ្នាំ២០២៤</span>
                  <span className="max-xl:hidden">ថ្ងៃទី១៦ ខែធ្នូ ឆ្នាំ២០២៤</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  time: 'ម៉ោង ៩:០០ ព្រឹក',
                  event: 'បើកកកាយសក្តានុពលពិព័រណ៍កម្ពុជា',
                  location: 'ភ្នំពេញ',
                },
                {
                  time: 'ម៉ោង ១០:០០ ព្រឹក',
                  event: 'ពង្រីកការនាំចេញផលិតផលកសិកម្មកម្ពុជា',
                  location: 'ភ្នំពេញ',
                },
                {
                  time: 'ម៉ោង ១៣:០០ ថ្ងៃត្រង់',
                  event: 'ការកែលម្អហេដ្ឋារចនាសម្ព័ន្ធពាណិជ្ជកម្មកម្ពុជា',
                  location: 'ភ្នំពេញ',
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className="w-full grid justify-between grid-cols-4 py-5 border-t border-black max-xl:flex max-xl:flex-col"
                >
                  <td className="flex col-span-1 items-center justify-between">
                    <span className="col-span-1">{item.time}</span>
                    <span className="col-span-1 max-xl:block xl:hidden">{item.location}</span>
                  </td>
                  <td className="col-span-2 max-xl:font-semibold max-xl:text-lg font-semibold text-header xl:text-center">
                    {item.event}
                  </td>
                  <td className="col-span-1 xl:blocks max-xl:hidden text-end">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="py-4">
          <Marquee speed={60} gradient={false}>
            {Array(6)
              .fill(6)
              .map((_, index) => ({
                id: index + 1,
                src: `/assets/sponsors/image-${index + 1}.png`,
                alt: `sponsor-${index + 1}`,
              }))
              .map((img) => (
                <Image
                  className="object-cover mx-4 xl:mx-20"
                  key={img.id + 1}
                  src={img.src}
                  width={200}
                  height={150}
                  alt={img.src as string}
                />
              ))}
          </Marquee>
        </section>

        <section className="py-4 relative">
          <Image
            height={597}
            width={594}
            className="w-full"
            src="/assets/images/exhibition-booth.png"
            alt="/assets/images/exhibition-booth.png"
          />
        </section>

        <section className="container max-w-[80%] py-10 mx-auto grid grid-cols-2 gap-10 justify-between items-center">
          <div className="col-span-1 max-xl:col-span-2">
            <h2 className="text-header text-2xl font-moul mb-4">អំពីការពិព័រណ៍ពាណិជ្ជកម្ម</h2>
            <p className="line-clamp-6 max-xl:line-clamp-5 text-ellipsis leading-loose text-xl max-sm:text-base">
              សូមជម្រាបជូនផងដែរថា ពិព័រណ៍ចិន-អាស៊ាន លើកទី២១ ប្រព្រឹត្តទៅចាប់ពីថ្ងៃទី២៤-២៨ ខែកញ្ញា
              ឆ្នាំ២០២៤ ក្រោម មូលបទ “លើកកម្ពស់មិត្តភាពស្មោះត្រង់ រួមគ្នាអភិវឌ្ឍន៍
              និងចែករំលែកផលប្រយោជន៍ប្រកបដោយបរិយាប័ន្ន
              ក្នុងក្របខ័ណ្ឌសហប្រតិបត្តិការមកុដពេជ្រដើម្បីអនាគតថ្មី
              និងជំរុញការអភិវឌ្ឍតំបន់ពាណិជ្ជកម្មសេរី ៣.០ រវាងចិន និងអាស៊ាន ដើម្បីកំណើនក្នុងតំបន់”។
              ក្នុងនោះផងដែរ ក្រសួងពាណិជ្ជកម្ម ក្នុងនាមគណៈកម្មការរៀបចំ និងចូលរួមពិព័រណ៍ពិភពលោក
              និងពិព័រណ៍ពាណិជ្ជកម្មអន្តរជាតិ បានសម្របសម្រួល និងរៀបចំស្តង់ពិព័រណ៍ពាណិជ្ជកម្មចំនួន
              ៨៩ស្តង់ និងមាន ៥៨ក្រុមហ៊ុនបានចូលរួម ដោយបានដាក់តាំងបង្ហាញនូវផលិតផលសក្តានុពលរបស់កម្ពុជា
              ផលិតផលសម្គាល់ភូមិសាស្រ្ត ផលិតផលកសិកម្ម ឧស្សាហកម្ម វាយនភ័ណ្ឌ សូត្រ គ្រឿងអលង្ការ
              និងសេវាកម្មវិនិយោគនិងទេសចរណ៍ ជាដើម។ល។ បន្ថែមលើនេះ ក្រសួងពាណិជ្ជកម្ម បានរៀបចំផ្ទះរួម
              (Common House) ទំហំ ៥៤ម៉ែត្រការ៉េ ដើម្បីដាក់តាំងបង្ហាញ ផលិតផលសក្តានុពលកម្ពុជា
              និងមានការវេចខ្ទប់ប្រណិត ជូនភ្ញៀវទស្សនា និងជាទីតាំងផ្សព្វផ្សាយ CambodiaTrade.com ផងដែរ។
            </p>
          </div>

          <div className="col-span-1 max-xl:col-span-2">
            <Image
              className="w-full"
              src="/assets/images/image-product.png"
              height={594}
              width={594}
              alt="image"
            />
          </div>
        </section>

        <section className="container max-w-[80%] py-10 mx-auto">
          <h2 className="text-header text-2xl font-moul mb-10 text-center">ភ្ញៀវកិត្តិយស</h2>

          <Marquee speed={60} gradient={false} direction="right">
            {profiles.map((profile, index) => (
              <div key={index} className="flex flex-col gap-4 justify-center items-center">
                <Image
                  src={profile.src}
                  width={180}
                  height={300}
                  alt={`profile-${index + 1}`}
                  className="object-cover mx-20"
                />
                <h2 className="font-moul text-xl text-header">{profile.name}</h2>
                <div className="flex gap-x-10">
                  {socialIcons.map((icon, index) => (
                    <Image
                      key={index}
                      src={icon.src}
                      width={30}
                      height={30}
                      alt={icon.alt}
                      className="object-cover"
                    />
                  ))}
                </div>
              </div>
            ))}
          </Marquee>
        </section>
        <section className="container max-w-[80%] py-4 mx-auto">
          <h2 className="text-header text-2xl text-center font-moul mb-4">
            ទីតាំងនៃការពិព័រណ៍ពាណិជ្ជកម្ម
          </h2>
          <Image
            className="xl:w-[80%] mx-auto"
            src="/assets/images/exhibition-location.png"
            height={594}
            width={594}
            alt="image"
          />
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
}
