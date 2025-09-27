import { useParams } from 'next/navigation';
import React from 'react';

export default function BlogPostClient() {
	const { slug } = useParams();

	return (
		<div className="max-w-2xl prose dark:prose-invert">
			<h1>Sample Blog Post - {slug}</h1>
			<p>This is a sample blog post content. You can replace this with actual blog post data.</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum erat. Cras vulputate auctor
				lectus at consequat. Donec nec eros eget nisl fringilla commodo. Morbi sit amet nulla sed arcu pulvinar
				ultricies. Proin convallis, ligula a tincidunt cursus, mauris erat facilisis urna, at convallis erat libero
				nec nisi.
			</p>
			<p>
				Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus.
				Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing
				ultrices tellus, in suscipit massa vehicula eu.
			</p>
		</div>
	);
}
