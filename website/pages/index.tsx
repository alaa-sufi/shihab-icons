import { FilterSection, IconsSection, MainHeader } from '@/components';
import { filterType } from '@/types';
import classNames from 'classnames';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from 'react';

export default function Home() {
  const [filter, setFilter] = useState<filterType>({
    search: '',
    color: '#ba68c8',
    size: '44',
    variant: 'Line',
    section: 'all'
  });
  return (
    <>
      <div className={classNames({ 'pb-16': filter.search === '', '-mb-16 ': filter.search !== '' })}>
        <MainHeader />
        <FilterSection filter={filter} setFilter={setFilter} />
        <IconsSection filter={filter} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<{}> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};