import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function ChangeLang({className}:any) {
    const { i18n } = useTranslation();
    const router = useRouter()

    const handleChangeLang = async (local: 'en' | 'ar') => {
        router.push({
            pathname: router.pathname,
            query: router.query
        }, undefined, { locale: local })
        await i18n.changeLanguage(local);
        document.dir = i18n.language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = i18n.language;
        localStorage.language = i18n.language;
    }

    return (
        <div className={`flex  bg-white rounded-2xl text-black  items-center py-[0.3rem] relative z-[2] ${className}`}>
            <button className={classNames({ 'text-white': i18n.language === 'ar', 'text-black': i18n.language !== 'ar' }, 'w-1/2 px-8 text-center')} onClick={() => handleChangeLang('ar')}>عربي</button>
            <button className={classNames({ 'text-white': i18n.language === 'en', 'text-black': i18n.language !== 'en' }, 'w-1/2 px-8 text-center')} onClick={() => handleChangeLang('en')}>En</button>
            <span className={classNames({'right-0': i18n.language === 'ar' , 'right-1/2': i18n.language === 'en'},'bg-primary rounded-2xl block absolute top-0  w-1/2 h-full -z-[1] pointer-events-none transition-all')}></span>
        </div >
    )
}
