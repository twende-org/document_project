import { useTranslation } from "react-i18next";
import image from "../assets/image2.jpg";

const MyCv = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto relative w-full py-12">
        <img src={image} className="absolute h-96 w-full object-cover inset-0" alt="background"/>
        <div className="absolute inset-0 bg-black/5 ">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {t('cv.my_cv')}
          </h1>
          <p className="text-neutralText max-w-xl mx-auto text-lg">
            {t('cv.my_cv_desc')}
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button className="px-5 py-3 bg-red-500 text-white rounded-lg shadow transition hover:bg-red-600">
              {t('cv.edit_cv')}
            </button>
            <button className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg shadow transition hover:bg-gray-300">
              {t('cv.download_cv')}
            </button>
            <button className="px-5 py-3 bg-blue-500 text-white rounded-lg shadow transition hover:bg-blue-600">
              {t('cv.share_cv')}
            </button>   
        </div>
        </div>
        </div>
    </section>
  );
}

export default MyCv;