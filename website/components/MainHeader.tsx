import { BackgroundIcons, FigmaIcon, GitHubIcon, HeartIcon, LogoIcon, ReactIcon } from '@/assets/svg';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import { ArrowDownIcon } from 'react-shihab-icons';
import { ChangeLang } from '.';

export default function MainHeader() {
  const { t, i18n } = useTranslation();

  return (
    <div className='bg-gradient-radial from-primary from-20%  to-black to-80% min-h-96 h-screen relative '>
      <div className='absolute top-0 right-0 h-full overflow-hidden left-0' >
        {/* TODO move background ? */}
        <BackgroundIcons />
      </div>
      <div className='z-[2] relative h-full'>
        <div className=' h-full'>
          <div className='container px-4 mx-auto'>
            <div className='flex justify-between sm:py-8 py-4 dir-rtl  '>
              <div className='flex gap-4 items-center lg:justify-start justify-between w-full lg:w-max'>
                <Link href={'/'} className='max-w-[50%] sm:max-w-[initial]  '>
                  <LogoIcon className='max-w-[6rem] sm:max-w-[initial]' />
                </Link>
                <ChangeLang className='max-w-[50%] sm:max-w-[initial] ' />
              </div>
              <OurNames className='hidden lg:block' />
            </div>
          </div>
          <div className='lg:h-[calc(100%_-_10rem)] h-[calc(100%_-_15rem)] flex flex-col justify-center' >
            {i18n.language === 'ar' ? <div className='sm:text-6xl   text-4xl  text-center mb-8'><h1 className=' font-bold relative before:absolute before:bg-white  sm:before:top-[48%] before:top-[46%] before:right-0 before:transform before:translate-y-[250%] sm:before:h-[0.40rem] before:h-[0.25rem] sm:before:w-[40%] before:w-[30%] after:absolute after:bg-white  sm:after:top-[48%] after:top-[46%] after:left-0 after:transform after:translate-y-[250%]  sm:after:h-[0.40rem] after:h-[0.25rem] sm:after:w-[40%] after:w-[30%] '>ـــــــتشف  اكــــــــ</h1><span>عالم مليء بالايقونات</span></div> :
              <h1 className='lg:text-6xl  sm:text-5xl text-4xl text-center mb-8 font-bold px-4'>{t('explore_a_world_full_of_icons')}</h1>
            }
            <div className='flex sm:gap-8 gap-4 justify-center my-4 flex-wrap px-4'>
              <a className='bg-white rounded-full sm:py-4 py-2 sm:px-6 px-4 flex gap-1  text-black  border-blue-400 border-4 hover:bg-black hover:text-white cursor-pointer transition-colors' href='https://www.npmjs.com/package/react-shihab-icons' target='_blank'><ReactIcon />{t("react_version")}</a>
              <div className='bg-gradient-to-r  from-[#F24E1E] via-red-[#FF7262] via-[#A259FF] to-[#0ACF83] p-1 rounded-full  w-max h-max'><a className="bg-white rounded-full sm:py-4 py-2 sm:px-6 px-4 flex gap-1  text-black   hover:bg-black hover:text-white cursor-pointer transition-colors" href='https://www.figma.com/file/TyPk9JVjIXtFp9AOpfZrbZ/Shihab-icons---v1-(Community)?type=design&node-id=1-1874&mode=design&t=BqRPy9oONIrIbZHD-0' target='_blank'><FigmaIcon />{t("figma_version")}</a></div>
              <Link href='/#main' className='flex justify-center m-auto animate-bounce w-full'><ArrowDownIcon size={'3rem'} /></Link>
            </div>
          </div>
          <OurNames className='lg:hidden px-4' />
        </div>
      </div>
    </div>
  )
}

const OurNames = ({ className }: any) => {
  const { t } = useTranslation();
  return (
    <div className={`text-xl ${className}`}>
      <div className='lg:rtl:text-center lg:ltr:text-end text-center'>
        <div className='flex ltr:[direction:ltr] sm:justify-center lg:justify-start'>
          <Trans
            i18nKey="work_on_it_with_love_by" // optional -> fallbacks to defaults if not provided
            components={[<HeartIcon key={1} />]}
          />
        </div>
      </div>
      <bdi className='flex gap-2 sm:items-center sm:rtl:justify-center flex-col sm:flex-row'>
        <div className='ltr:order-2 d-flex items-center gap-1' >
          <a href='https://www.linkedin.com/in/alaasufi00' target='_blank'>
            {t('programming')}: <span className='before:right-0 before:bg-yellow before:w-full before:bottom-0 before:absolute  before:h-[2px] relative  '>Alaa Sufi </span>
          </a>
          <a href="https://github.com/alaa-sufi/shihab-icons" target='_blank'><GitHubIcon /></a>
        </div>
        <span className='w-2 h-2 bg-yellow rounded-full  ltr:order-1 hidden sm:block'></span>
        <a className='ltr:order-0' href='https://www.linkedin.com/in/3be1d' target='_blank'>
          {t('design')}: <span className='before:right-0 before:bg-yellow before:w-full before:bottom-0 before:absolute  before:h-[2px] relative  '>Obeida amin</span>
        </a>
      </bdi>
    </div>
  )
}