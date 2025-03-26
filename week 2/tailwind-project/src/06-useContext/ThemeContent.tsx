import React, { ReactElement } from 'react'
import { THEME, useTheme } from './context/ThemeProvider'
import clsx from 'clsx'; 

export default function ThemeContent(): ReactElement {
  const {theme, toggleTheme} = useTheme(); 

  const isLightMode = theme === THEME.LIGHT; 
  return (
    <div className={clsx('p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')} >
      <h1 className={clsx('text-wxl font-bold', isLightMode ? 'text-black': 'text-white')}>Theme Content</h1>
      <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident neque nobis reprehenderit aliquam aliquid omnis facere quidem velit beatae non, saepe ratione dignissimos magnam, rerum magni odit! Praesentium, quidem laudantium!
      </p>
    </div>
  );

}

