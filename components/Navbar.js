import Link from 'next/link'

import { APP_NAME, SOCAIL_LINKS } from '../utils/Constants'

const Navbar = () => (
    <nav className='navbar navbar-expand-sm'>
        <Link href='/'>
            <a className='navbar-brand'>
                <h1>{APP_NAME}</h1>
            </a>
        </Link>
        <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbar'
            aria-controls='navbar'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbar'>
            <div className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <a
                        className='nav-link'
                        target='_blank'
                        rel='noopener noreferrer'
                        href={SOCAIL_LINKS.github}>
                        Github
                    </a>
                </li>
                <li className='nav-item'>
                    <a
                        className='nav-link'
                        target='_blank'
                        rel='noopener noreferrer'
                        href={SOCAIL_LINKS.linkedin}>
                        Linkedin
                    </a>
                </li>
            </div>
        </div>
    </nav>
)

export default Navbar
