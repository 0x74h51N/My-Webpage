import useClickableHandlers from '@/hooks/useClickableHandlers';
import { RootState } from '@/store';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

type option = {
  label: string;
  value?: string | React.ReactNode;
};

type dropdownProps = {
  classes: string;
  defaultValue: string | React.ReactNode;
  options: option[];
  optionClickHandler: (optionLabel: string) => void;
  isDropdownOpen: boolean;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  hoverMode?: boolean;
  width: number | string;
  background?: string;
  ulClasses?: string;
  flagMode?: boolean;
};

const Dropdown = ({
  classes,
  defaultValue,
  options,
  optionClickHandler,
  setDropdownOpen,
  isDropdownOpen,
  hoverMode = true,
  width,
  background,
  ulClasses,
  flagMode = true,
}: dropdownProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);

  const handleToggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const mouseEnterHandler = () => {
    if (!isTouch && hoverMode) {
      setDropdownOpen(true);
    }
    handleMouseEnter();
  };
  const mouseLeaveHandler = () => {
    if (!isTouch && hoverMode) {
      setDropdownOpen(false);
    }
    handleMouseLeave();
  };
  useEffect(() => {
    setIsRotated(isDropdownOpen);
  }, [isDropdownOpen]);
  useEffect(() => {
    if (isDropdownOpen) {
      setDropdownOpen(false);
    }
  }, []);

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="flex flex-col justify-center items-center h-full"
    >
      <button
        onClick={(e) => handleToggleDropdown(e)}
        className="flex flex-row justify-center items-center gap-1 z-20 bg-transparent cursor-none w-full"
      >
        <div
          className="p text-start pl-3"
          style={{ width: width, background: background ?? 'transparent' }}
        >
          {defaultValue}
        </div>
        <div>
          <Image
            src="arrow.svg"
            alt="Arrow"
            width={8}
            height={8}
            className={`transition-transform duration-500 ease-in-out ${
              isRotated ? 'rotate' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`${classes} bg-cool-gray-800 rounded-lg shadow-sm shadow-black `}
      >
        {isDropdownOpen && (
          <ul className={`${ulClasses} ul font-medium leading-6 text-[15px]`}>
            {options.map((option) => (
              <li
                key={option.label.toLowerCase()}
                className={`hover:text-log-col transition-text duration-300 ease-in-out cursor-none  border-log-col`}
                onClick={() =>
                  optionClickHandler(
                    option.label.toLowerCase().trim().replaceAll(' ', '_'),
                  )
                }
              >
                <div className="flex items-center gap-1">
                  {option.value}
                  {flagMode && <span>{option.label}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
