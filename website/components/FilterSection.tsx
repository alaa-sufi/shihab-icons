import { SearchIcon } from '@/assets/svg';
import iconsData from "@/data";
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { filterType } from '@/types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import { FrisMenuIcon } from 'react-shihab-icons';
import Select from './Select';
import SelectColor from './SelectColor';

export default function FilterSection({ filter, setFilter }: { filter: filterType, setFilter: any }) {
  const { t } = useTranslation();
  const sizeOptions = [12, 16, 24, 32, 44, 60, 80].map(item => ({ name: `${item} px`, value: item }))
  const [openMenu, setToggle] = useState(false);
  const sectionsOptions = [{ name: t('icons_sections.all'), value: 'all' }, ...iconsData.map((item, index) => ({ name: t(`icons_sections.${item.sectionName}`), value: index }))]
  const colorsOptions = ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#DCE775', '#FF8A65', '#BA68C8'].map(item => ({ name: item, value: item }))
  const ref = useRef(null)

  useOnClickOutside(ref, () => setToggle(false))

  return (
    <div className={classNames({ '-mb-20': (filter.search !== '') }, 'sticky top-0 z-[3] shadow ')} id='main'>
      <div className='bg-black py-4 '>
        <div className='container px-4 mx-auto'>
          <div className='flex justify-between text-primary gap-4'>
            <div className='flex gap-1 items-center grow'>
              <SearchIcon />
              <input type="search" className='w-full bg-transparent focus:border-none px-4 py-2 rounded-2xl focus:outline-none' value={filter.search} onChange={e => setFilter((prev: filterType) => ({ ...prev, search: e.target.value }))} placeholder={t('enter_the_name_icon_you_are_looking_for')} />
            </div>
            <div ref={ref}>
              <div className={classNames({ 'hidden': !openMenu, 'absolute sm:static ltr:right-0 rtl:left-0 top-16 bg-black p-4 gap-4 flex  sm:flex-row flex-col rounded-2xl': openMenu }, 'lg:flex  gap-4')}>
                <div className='flex  bg-gray rounded-2xl text-white  items-center py-[0.3rem] relative z-[2] w-48  '>
                  <button className='w-1/3  text-center uppercase text-xs' onClick={() => setFilter((prev: filterType) => ({ ...prev, variant: 'Line' }))}>Line</button>
                  <button className='w-3/4  text-center uppercase text-xs' onClick={() => setFilter((prev: filterType) => ({ ...prev, variant: 'TwoTone' }))}>two tone</button>
                  <span className={classNames({ 'rtl:left-0 ltr:right-0 w-[70%]': filter.variant === 'TwoTone', 'ltr:right-[70%] rtl:left-[70%] w-[30%]': filter.variant === 'Line' }, 'bg-primary rounded-2xl block absolute top-0   h-full -z-[1] pointer-events-none transition-all')}></span>
                </div >
                {filter.search === '' && <Select value={{ name: sectionsOptions.find((item: any) => item.value === filter.section)?.name, value: filter.section }} onChange={(val: any) => setFilter((prev: filterType) => ({ ...prev, section: val.value }))} options={sectionsOptions} label={t('sections')} className='min-w-[11rem]' />}
                <Select value={{ name: `${filter.size} px`, value: filter.size }} onChange={(val: any) => setFilter((prev: filterType) => ({ ...prev, size: val.value }))} options={sizeOptions} label={t('size')} />
                <SelectColor value={{ name: filter.color, value: filter.color }} onChange={(val: any) => setFilter((prev: filterType) => ({ ...prev, color: val.value }))} options={colorsOptions} />
              </div>
              <button className='bg-primary rounded-md py-1 px-2   w-max text-white lg:hidden ' onClick={() => setToggle(!openMenu)}><FrisMenuIcon size={'25'} /></button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}