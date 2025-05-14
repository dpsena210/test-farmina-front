import React from 'react';
import farminhalogo from '../assets/farminalogo.png'
type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
        return (
            <header className='App-header'>
                <div className='div-header'>
                    <div>
                    <img className='logo-farminha' src={farminhalogo}></img>
                    </div>
                    <div className='botoes-entrar'>
                        <a className='header-text'>Comunidade</a>       <a className='header-text' >Entrar</a>
                    </div>
                </div>
            {children}
            </header>
        );
        };

export default Header;