import React from 'react'

import '../styles/chathome.scss'

const ChatHome = () => (
    <section className='chat-home'>
        <div className='row justify-content-center m-0'>
            <h2 className='p-5'>Welcome again to Anomly!</h2>
        </div>
        <div className='row justify-content-center align-items center m-0'>
            <div className='chat-form col-12 col-sm-4'>
                <div className='row justify-content-center align-items-center m-0'>
                    <img src='/images/chat.png' alt='icon' />
                </div>
                <form className='form'>
                    <div className='form-group'>
                        <label>Display name</label>
                        <input
                            className='form-control'
                            type='text'
                            name='name'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Room name</label>
                        <input
                            className='form-control'
                            type='text'
                            name='room'
                        />
                    </div>

                    <input className='btn' type='submit' value='Join Chat' />
                </form>
            </div>
        </div>
    </section>
)

export default ChatHome
