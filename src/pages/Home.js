import React, { useContext } from 'react'
import HeadingEl from '../components/HeadingEl';
import PartnersEl from '../components/PartnersEl';
import RestosEl from '../components/RestosEl';
import { UserContext } from '../components/Contexts/userContext';

import IncomeEl from '../components/IncomeEl';

function Home() {
    const [state, dispatch] = useContext(UserContext)
    return (
        <div className='container-grey'>
            {state.user.role === "adm" ? <IncomeEl /> :
                <>
                    <HeadingEl />
                    <PartnersEl />
                    <RestosEl />
                </>}

        </div>
    )
}

export default Home