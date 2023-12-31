'use client'
import { ThreeDots } from 'react-loader-spinner'

const loading = () => {
    return (
        <div className='lg:pl-80 h-full'>
            <div className='flex justify-center items-center w-full h-full'>
                <ThreeDots
                    height="70"
                    width="70"
                    radius="8"
                    color="#0ea5e9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </div>
    )
}

export default loading
