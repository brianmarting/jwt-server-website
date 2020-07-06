import React from 'react';
import { Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { clearAccessToken } from '../auth/Auth';
import { userContext } from '../context/userContext';
import '../style/header.scss';

export const Header: React.FC<RouteComponentProps> = ({history}) => (
    <div className='header d-flex'>
        <userContext.Consumer>
            {(username) => (
                <>
                    <Navbar className='w-100' variant='dark'>
                        <Navbar.Brand href='/' className='my-'>Programming languages</Navbar.Brand>
                        <Nav className='ml-auto float-right'>
                            <DropdownButton id='menu-dropdown' title='Settings'>
                                <Dropdown.Header className='pb-0'>Signed in as:</Dropdown.Header>
                                <Dropdown.Header className='pt-0 font-weight-bold'>{username}</Dropdown.Header>
                                <Dropdown.Item eventKey="1">Dummy data</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={() => {
                                    clearAccessToken();
                                    history.push('/login');
                                }} eventKey="4">Logout</Dropdown.Item>
                            </DropdownButton>
                        </Nav>
                    </Navbar>
                </>
            )}
        </userContext.Consumer>
    </div>
);
