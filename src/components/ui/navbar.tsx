import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { styles } from "../../styles";
import { NAV_LINKS } from "../../constants";
import { menu, close, logo } from "../../assets";
import { slideIn } from "../../utils/motion";

const Navbar = ({ hide }: { hide: boolean }) => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            variants={slideIn("down", "tween", 0.1, 0.8)}
            initial="hidden"
            animate="show"
            className={`${styles.paddingX
                } w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary shadow-lg border-b border-white/5" : "bg-transparent"
                } transition-all duration-300 ${hide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
                <Link
                    to='/'
                    className='flex items-center gap-2'
                    onClick={() => {
                        setActive("");
                        window.scrollTo(0, 0);
                    }}
                >
                    <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
                    <p className='text-white text-[18px] font-bold cursor-pointer flex '>
                        Pranit &nbsp;
                        <span className='sm:block hidden'> | AI/ML Portfolio</span>
                    </p>
                </Link>

                <ul className='list-none hidden sm:flex flex-row gap-10'>
                    {NAV_LINKS.map((nav) => (
                        <li
                            key={nav.id}
                            className={`${active === nav.title ? "text-white" : "text-secondary"
                                } hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.title)}
                        >
                            {nav.link ? (
                                <a href={nav.link} target='_blank' rel='noopener noreferrer'>
                                    {nav.title}
                                </a>
                            ) : (
                                <a href={`#${nav.id}`}>{nav.title}</a>
                            )}
                        </li>
                    ))}
                </ul>

                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <img
                        src={toggle ? close : menu}
                        alt='menu'
                        className='w-[28px] h-[28px] object-contain'
                        onClick={() => setToggle(!toggle)}
                    />

                    <div
                        className={`${!toggle ? "hidden" : "flex"
                            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
                    >
                        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                            {NAV_LINKS.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-secondary"
                                        }`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
                                    {nav.link ? (
                                        <a href={nav.link} target='_blank' rel='noopener noreferrer'>
                                            {nav.title}
                                        </a>
                                    ) : (
                                        <a href={`#${nav.id}`}>{nav.title}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
