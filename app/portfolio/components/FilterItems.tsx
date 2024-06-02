import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PortfolioItemProps } from '@/app/common.types';
import { portfolioPageItems } from '@/constants/portfolioItems';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/Dropdown';

type FilterItemsProps = {
  setFilteredItems: Dispatch<SetStateAction<PortfolioItemProps[]>>;
};

const FilterItems = ({ setFilteredItems }: FilterItemsProps) => {
  const { register, watch } = useForm();
  const { t } = useTranslation('portfolio');
  const [sortedItems, setSortedItems] = useState<PortfolioItemProps[]>([]);
  const searchParam = watch('search', '');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  //const [sortOption, setSortOption] = useState('');
  useEffect(() => {
    const filteredItems = portfolioPageItems.filter(
      (item: PortfolioItemProps) => {
        const title = t(item.title).toLowerCase();
        const type = item.projectType ? t(item.projectType).toLowerCase() : '';
        return (
          title.includes(searchParam) ||
          type.includes(searchParam) ||
          item._id.toLowerCase().includes(searchParam)
        );
      },
    );
    setSortedItems(filteredItems);
  }, [searchParam]);

  useEffect(() => {
    setFilteredItems(sortedItems);
  }, [sortedItems]);

  const handleSortChange = (sortOption: string) => {
    if (sortOption.includes('new')) {
      const dateSorted = [...sortedItems].sort((a, b) => {
        if (!a.date || !b.date) {
          return 0;
        }
        return b.date.getTime() - a.date.getTime();
      });
      if (sortOption === 'new_to_old') {
        setSortedItems(dateSorted);
      } else if (sortOption === 'old_to_new') {
        const rev = dateSorted.reverse();
        setSortedItems(rev);
      }
    } else if (sortOption.includes('alphabetically')) {
      const alphaSort = [...sortedItems].sort((a, b) => {
        const aTitle = t(a.title);
        const bTitle = t(b.title);
        return aTitle.replace('_', '').localeCompare(bTitle);
      });
      if (sortOption === 'alphabetically_a-z') {
        setSortedItems(alphaSort);
      } else {
        const aplhRev = alphaSort.reverse();
        setSortedItems(aplhRev);
      }
    }
  };
  type option = {
    label: string;
    value: string | React.ReactNode;
  };

  const optionsObj = t('sort.options', { returnObjects: true }) as {
    [key: string]: string;
  };
  const options = Object.entries(optionsObj).map(([key, value]) => ({
    label: key,
    value: value,
  })) as option[];
  const classes = `${isDropdownOpen ? 'h-[150px] p-3 transition-all ease-in-out duration-500' : ' h-full p-0 '} -z-10 absolute top-0 left-0 p items-end transition-all ease-in-out duration-500 w-40`;
  return (
    <form>
      <div className="flex flex-row md:justify-end justify-between gap-6 w-full z-30">
        <div className="relative z-20">
          <Dropdown
            classes={classes}
            defaultValue={t('sort.def')}
            options={options}
            optionClickHandler={handleSortChange}
            isDropdownOpen={isDropdownOpen}
            setDropdownOpen={setDropdownOpen}
            width={135}
            ulClasses="pt-8 transition-all ease-in-out duration-500"
            flagMode={false}
          />
        </div>
        <input
          id="search"
          type="text"
          {...register('search')}
          placeholder={t('search')}
          className="p-2 contactBox md:max-w-[16rem] max-w-[10rem] focus:border-log-col focus:shadow-inner"
        />
      </div>
    </form>
  );
};

export default FilterItems;
