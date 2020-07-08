import React from 'react'
import Link from 'next/link'

import '../styles/banner.scss'
import { DESCRIPTION } from '../utils/Constants'

function Banner() {
    return (
        <>
            <section className='banner'>
                <div className='row justify-content-around align-items-center m-0'>
                    <div className='col-12 col-sm-6'>
                        <div className='row justify-content-start align-items-center ml-5'>
                            <h2 className='mb-3'>{DESCRIPTION}</h2>
                            <Link href='/home'>
                                <a className='btn btn-primary'>
                                    Start Chatting Now
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6'>
                        <div className='row justify-content-center align-items-center'>
                            <img src='/images/chat.png' alt='img' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner
