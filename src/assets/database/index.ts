const title = 'Loran';
const email = 'info@loranmaes.be';
const full_name = 'Loran Maes';
const hero_description = "Hallo! Ik ben een web developer en content creator uit Gent.\n- Let's work!";

interface HeaderLink {
    name: string;
    href: string;
}
const header_links: HeaderLink[] = [
    {
        name: 'About',
        href: '/about',
    },
    {
        name: 'Contact',
        href: '/contact',
    },
    {
        name: 'Web Developer',
        href: '/web-developer',
    },
    {
        name: 'Content Creation',
        href: '/content-creation',
    },
    {
        name: 'Blog',
        href: '/blog',
    },
];

export { email, full_name, header_links, hero_description, title };
