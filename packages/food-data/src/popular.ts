import { findDish } from './countries';

// Hand-picked until we track what people actually open.
const popularSlugs = [
	'ramen',
	'tacos-al-pastor',
	'carbonara',
	'butter-chicken',
	'pad-thai',
	'jollof-rice'
];

export function popularDishes() {
	return popularSlugs.map((slug) => findDish(slug)!);
}
