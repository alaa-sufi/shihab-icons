import iconsData from "@/data";
import { IconProps } from "@/data/TPops";
import { filterType } from "@/types";
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { useState } from 'react';
import IconsRender from "./IconsRender";
import Modal from "./Modal";
import classNames from "classnames";

export default function IconsSection({ filter }: { filter: filterType }) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<IconProps | null>(null);
  const searchIcons = iconsData.flatMap((section:any) => section.icons).filter(item => (item.name.startsWith(filter.search.toLowerCase()) || item.keywords?.split(',').some((keyword:any) => keyword.startsWith(filter.search.toLowerCase()))))
  return (
    <>
      <div className='my-5 min-h-[calc(100vh_-_10rem)]'>
        <div >
          {filter.search === '' ? iconsData.filter((item: any, index: number) => filter.section === 'all' ? item : index === filter.section).map((item, index) => (
            <div key={'section' + index} className={classNames({'pt-16':(index > 0 && filter.section === 'all') , 'pb-32':filter.section === 'all'},"-mb-12 ")} id={item.sectionName}>
              <h2 className="mb-4 [filter:drop-shadow(0px_1px_0.6px_#737373)] sticky top-16 z-[2] bg-black  text-[2rem]">
                <Link className='container px-4 mx-auto block capitalize py-4' href={`/#${item.sectionName}`} >
                  {t(`icons_sections.${item.sectionName}`)} <small className="text-primary px-2 ">{item.icons.length} {t('icons')}</small>
                </Link>
              </h2>
              <IconsRender icons={item.icons} filter={filter} setOpenModal={setOpenModal} setCurrentItem={setCurrentItem} />
            </div>
          )) : <div className="-mb-12 pt-16 pb-32">
            <h2 className="p-4 mb-4 [filter:drop-shadow(0px_1px_0.6px_#737373)] sticky top-16 z-[2] bg-black  text-[2rem]">
              {t(`search_result`)} <small className="text-primary px-2 ">{searchIcons.length} {t('icons')}</small>
            </h2>
            <IconsRender icons={searchIcons} filter={filter} setOpenModal={setOpenModal} setCurrentItem={setCurrentItem} />
          </div>
          }
        </div>
      </div>
      {currentItem && <Modal open={openModal} onClose={() => { setOpenModal(false); setCurrentItem(null) }} currentItem={currentItem} filter={filter} />}
    </>
  )
}
