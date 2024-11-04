'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col justify-between h-100%">
      <Image
        height={594}
        width={594}
        className="w-full"
        src="/assets/images/ph-hall.png"
        alt="/assets/images/ph-hall.png"
      />
      <div className="container max-w-[80%] px-4 py-4 mx-auto">
        <div className="grid grid-cols-2 gap-[40px] mt-[40px]">
          <div>
            <Image
              height={40}
              width={600}
              className="w-full object-contain"
              src="/assets/images/image-1.png"
              alt="/assets/images/image-1.png"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-[#E9282B] font-medium text-[16px]">December 10, 2024</div>
            <div className="mt-3 grid gap-3">
              <h1 className="text-[22px] text-[#0C2F8D] font-bold">
                សេចក្តីជូនដំណឹងស្ដីពី៖ ការរៀបចំពិព័រណ៍នាំចូល និងនាំចេញប្រទេសចិន
              </h1>
              <p className="line-clamp-3 text-base text-xl text-[#0C2F8D]">
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
              className="w-full object-contain h-full"
              src="/assets/images/image-2.png"
              alt="/assets/images/image-2.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
