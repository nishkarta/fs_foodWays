import React from 'react'
import HeadingEl from '../components/HeadingEl';
import PartnersEl from '../components/PartnersEl';
import RestosEl from '../components/RestosEl';





function Home() {
    return (
        <div className='container-grey'>
            <HeadingEl />
            <PartnersEl />
            <RestosEl />
        </div>
    )
}

export default Home