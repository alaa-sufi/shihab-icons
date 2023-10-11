import { useTranslation } from 'next-i18next';

export default function IconsRender({ icons, filter, setOpenModal, setCurrentItem }: any) {
    const { t } = useTranslation();

    return (
        <div className="grid xl:grid-cols-10 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4 container px-4 mx-auto">
            {icons.length > 0 ? icons.map((itemIcon: any, indexIcon: number) => {
                const Icon = itemIcon.icon;
                return (
                    <button key={'icon' + indexIcon} className="bg-darkGray rounded-3xl  border border-transparent transform hover:-translate-y-1 transition-all hover:border-primary " onClick={() => { setOpenModal(true); setCurrentItem(itemIcon) }}>
                        <Icon color={filter.color} size={filter.size} variant={filter.variant} className='mx-auto my-4' />
                        <div title={itemIcon.name} className="bg-gray text-center rounded-3xl py-4 px-1 text-sm   ltr:capitalize     overflow-ellipsis w-full [text-wrap:nowrap] overflow-hidden">
                            {itemIcon.name}
                        </div>
                    </button>
                )
            }) : <div className='py-10 text-center col-span-10'>{t('no_data')}</div>}
        </div>
    )
}
