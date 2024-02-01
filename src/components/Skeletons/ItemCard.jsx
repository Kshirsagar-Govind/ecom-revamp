import React from 'react';
import ItemImage from '../../Assets/test.jpg';
const ItemCardSkeleton = () => {
    return (
        <div className='animate-pulse p-[5px] rounded-sm text-center bg-white h-[320px] relative hover:shadow-lg hover:-translate-y-[2px] transition-transform cursor-pointer'>
            <div className="img">
                <img 
                src='' 
                className='h-[270px]'
                alt="" />
                <div className="text-primary absolute bottom-0 left-0 w-full h-fit bg-white flex flex-col px-3 py-1s">
                <div className="h-2.5 bg-gray-200 rounded-xl dark:bg-gray-300 w-48 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-xl dark:bg-gray-300 w-14 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-xl dark:bg-gray-300 w-24 mb-4"></div>
                </div>
            </div>
        </div>
    );
}

export default ItemCardSkeleton;
