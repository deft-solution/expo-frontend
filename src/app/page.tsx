'use client';
import * as React from 'react';
import { ArrowLeftRounded, ArrowRightRounded } from '@mui/icons-material';
import { Divider } from '@mui/material';
import Image from 'next/image';
import PaginationComponent from '@/core/components/Pagination';

export default function Home() {
  const [offset, setOffset] = React.useState(0);
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
    <div className="flex flex-col justify-between h-100% font-battambang">
      <Image
        height={594}
        width={594}
        className="w-full"
        src="/assets/images/ph-hall.png"
        alt="/assets/images/ph-hall.png"
      />

      <div className="container xl:max-w-[80%] max-xl:px-10 py-4  mx-auto">
        <div className="grid grid-cols-2 gap-[40px] mt-[40px]">
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
            <div className=" grid gap-3">
              <h1 className="text-[22px] text-ellipsis line-clamp-2 text-[#0C2F8D] font-bold">
                សេចក្តីជូនដំណឹងស្ដីពី៖ ការរៀបចំពិព័រណ៍នាំចូល និងនាំចេញប្រទេសចិន
              </h1>
              <p className="line-clamp-3 max-xl:line-clamp-2 text-ellipsis leading-loose text-xl max-sm:text-base">
                ពិព័រណ៍ពាណិជ្ជកម្មនេះ មានការចូលរួមគាំទ្រពីបណ្ដាប្រទេសនៅក្នុងតំបន់ដូចជា៖ ប្រទេសចិន
                ជប៉ុន ថៃឡង់ដ៍ វៀតណាម ឥណ្ឌូនេស៊ី ម៉ាឡេស៊ី ឡាវ មីយ៉ាន់ម៉ា មន្ទីរពាណិជ្ជកម្មទាំង២៥
                រាជធានី-ខេត្ត អង្គការ សមាគម ពិព័រណ៍ពាណិជ្ជកម្មនេះ
                មានការចូលរួមគាំទ្រពីបណ្ដាប្រទេសនៅក្នុងតំបន់ដូចជា៖ ប្រទេសចិន ជប៉ុន ថៃឡង់ដ៍ វៀតណាម
                ឥណ្ឌូនេស៊ី ម៉ាឡេស៊ី ឡាវ មីយ៉ាន់ម៉ា មន្ទីរពាណិជ្ជកម្មទាំង២៥ រាជធានី-ខេត្ត អង្គការ
                សមាគម ព្រមទាំងក្រុមហ៊ុនក្នុងស្រុក និងក្រៅប្រទេស ដែលមានស្ដង់សរុបជិត ៤០០ស្ដង់
                ដើម្បីតាំងបង្ហាញផលិតផលសក្តានុពលកម្ពុជា និងទំនិញនាំចូលដូចជា សម្ភារៈការិយាល័យ ក្រណាត់
                និងសម្លៀកបំពាក់ សម្ភារៈប្រើប្រាស់ទូទៅ ផលិតផលសម្រាប់តុបតែងក្នុងគេហដ្ឋាន គ្រឿងអលង្ការ
                និងត្បូងថ្មមាន
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
      </div>

      <div className="container xl:max-w-[80%] max-xl:px-10 p-10 mx-auto grid grid-cols-3 gap-10">
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
            <h2 className="font-moul text-2xl max-sm:text-xl text-[#0C2F8D] ">{section.title}</h2>

            <p className="line-clamp-3 max-xl:line-clamp-2 text-ellipsis leading-loose text-xl max-sm:text-base">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="relative">
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
      </div>

      <div className=" w-full h-full pt-10">
        <div className="container xl:max-w-[80%] max-xl:px-10 mx-auto gap-10">
          <h2 className="font-moul text-2xl max-sm:text-xl text-[#0C2F8D] pb-4">កាលវិភាគ</h2>
          <table className="w-full font-battambang text-xl max-xl:text-base ">
            <thead className="max-xl:flex items-center justify-start">
              <tr className="max-xl:flex justify-between items-center w-full">
                <th className="xl:hidden">
                  <ArrowLeftRounded className="w-10 h-10 max-xl:block " />
                </th>
                <th className="w-full grid grid-cols-5 justify-start py-4">
                  <span className="col-span-1 max-xl:col-span-5 max-xl:text-center text-start text-lg text-[#0C2F8D]">
                    ថ្ងៃទី១៣ ខែធ្នូ ឆ្នាំ២០២៤
                  </span>
                  <span className="col-span-1 max-xl:hidden">ថ្ងៃទី១៤ ខែធ្នូ ឆ្នាំ២០២៤</span>
                  <span className="col-span-1 max-xl:hidden">ថ្ងៃទី១៥ ខែធ្នូ ឆ្នាំ២០២៤</span>
                  <span className="col-span-1 max-xl:hidden">ថ្ងៃទី១៦ ខែធ្នូ ឆ្នាំ២០២៤</span>
                </th>
                <th className="xl:hidden">
                  <ArrowRightRounded className="w-10 h-10 max-xl:block " />
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
                  className="w-full grid grid-cols-3 py-5 border-t border-black max-xl:flex max-xl:flex-col"
                >
                  <td className="flex col-span-1 items-center justify-between">
                    <span className="col-span-1">{item.time}</span>
                    <span className="col-span-1 max-xl:block xl:hidden">{item.location}</span>
                  </td>
                  <td className="col-span-1 max-xl:font-semibold max-xl:text-lg  font-semibold text-[#0C2F8D]">
                    {item.event}
                  </td>
                  <td className="col-span-1 xl:blocks max-xl:hidden">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-full py-4">
        <div className="container max-w-[80%] sm:my-4 max-xl:px-10 w-full py-4 mx-auto grid grid-cols-6 max-xl:grid-cols-2 gap-10">
          {Array(6)
            .fill(6)
            .map((_, index) => ({
              id: index + 1,
              src: `/assets/sponsors/image-${index + 1}.png`,
              alt: `sponsor-${index + 1}`,
            }))
            .map((img) => (
              <Image
                key={img.id + 1}
                src={img.src}
                width={250}
                height={100}
                alt={img.src as string}
              />
            ))}
        </div>
      </div>
      <div className="bg-main w-full h-full py-4">
        <div className="container max-xl:max-w-[100%] max-w-[80%] xl:my-4 max-xl:px-10 w-full py-4 mx-auto grid grid-cols-5 xl:grid-rows-2 relative">
          {Array(8)
            .fill(8)
            .map((_, index) => ({
              id: index + 1,
              src: `/assets/profiles/image-${index + 1}.png`,
              alt: `profile-${index + 1}`,
            }))
            .map((img) => (
              <Image
                key={img.id}
                src={img.src}
                width={224}
                height={224}
                alt={img.src as string}
                className="w-full"
              />
            ))}
          <div></div>
          <div className="relative">
            <Image
              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-1/2 max-w-[60%]"
              src="/assets/profiles/frame.png"
              width={100}
              height={100}
              alt="/assets/profiles/frame.pn"
            />
            <Image
              className="p-2"
              src="/assets/profiles/elipse.png"
              width={300}
              height={300}
              alt="/assets/profiles/elipse.png"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-full py-4">
        <div className="container px-10 py-10 mx-auto grid grid-cols-2 gap-10 justify-between items-center">
          <div className="col-span-1 max-xl:col-span-2">
            <h2 className="text-[#0C2F8D] text-2xl font-semibold mb-4">
              អំពីការពិព័រណ៍ពាណិជ្ជកម្ម
            </h2>
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
        </div>
      </div>

      <div className="w-full h-full pb-4">
        <div className="container mx-auto px-10">
          <h2 className="text-center text-2xl font-semibold text-[#0C2F8D] pb-4">
            សកម្មភាពនានា នៃពិព័រណ៍ពាណិជ្ជកម្ម
          </h2>
          <Divider className="h-1 bg-orange-500 mb-4" />

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
            {paginatedData.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Image className="w-full" src={item.imgSrc} height={594} width={594} alt="image" />
                <h2 className="font-battambang text-xl font-bold line-clamp-2 leading-relaxed text-ellipsis text-[#0C2F8D]">
                  {item.title}
                </h2>
                <p className="text-lg leading-relaxed line-clamp-3 text-ellipsis">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-10">
            <div className="flex justify-center py-10 font-montserrat">
              <PaginationComponent
                total={data.length}
                pageSize={3}
                onChange={(newOffset: number) => setOffset(newOffset)}
                showPrevNext={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
