import { Container, Nav, Navbar, Button, Form, NavDropdown } from "react-bootstrap"
import { useState } from 'react';
import { useRouter } from "next/router";
import { useAtom}  from 'jotai';
import {searchHistoryAtom} from "@/store";
import Link from "next/link"
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
    const [searchValue, setSearchValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    let token = readToken();

    async function logout() {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    }
    async function formSubmit(e) {
        e.preventDefault();
        setIsExpanded(false);
        //let queryString = `title=true&q=${searchValue}`
        setSearchHistory(await addToHistory(`title=true&q=${searchValue}`)) 
        router.push(`/artwork?title=true&q=${searchValue}`);
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="bg-body-tertiary" expanded={isExpanded} >
                <Container>
                    <Navbar.Brand>Connor Squires</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                            </Link>
                            {!token &&
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                                </Link>
                            }
                            {!token &&
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                                </Link>
                            }
                            {token &&
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                                </Link>
                            }   
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                {token &&
                    <Form className="d-flex" onSubmit={formSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button type="submit">Search</Button>
                    </Form>
                }
                <Nav>
                    {token &&
                        <NavDropdown title={token.userName} id="nav-dropdown" align="end">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/favourites"} eventKey="1" onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"} eventKey="2" onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                            </Link>
                                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>
            </Navbar>
            <br />
            <br />
        </>
    );
}