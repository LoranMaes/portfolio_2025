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
		name: 'Blog',
		href: '/blog',
	},
];

export { title, email, full_name, hero_description, header_links };
