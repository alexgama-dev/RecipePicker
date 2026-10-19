export const Difficulty = { Easy: 'easy', Medium: 'medium', Hard: 'hard' } as const;
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export type Recipe = {
	servings: number;
	minutes: number;
	difficulty: Difficulty;
	ingredients: string[];
	steps: string[];
};

// Keyed by dish slug. Dishes without an entry show "Recipe coming soon".
export const recipes: Record<string, Recipe> = {
	ramen: {
		servings: 2,
		minutes: 45,
		difficulty: Difficulty.Medium,
		ingredients: [
			'200 g (7 oz) fresh ramen noodles',
			'1 l (4 cups) chicken stock',
			'250 g (9 oz) pork belly, in one piece',
			'2 eggs',
			'3 tbsp soy sauce',
			'1 tbsp mirin',
			'1 tbsp white miso paste',
			'2 garlic cloves, grated',
			'2 cm (¾ in) piece of ginger, grated',
			'2 spring onions, thinly sliced',
			'1 tbsp vegetable oil'
		],
		steps: [
			'Soft-boil the eggs for 6½ minutes, then cool them in iced water and peel.',
			'Mix 2 tbsp of the soy sauce with the mirin and leave the peeled eggs in it while you cook.',
			'Season the pork with salt. Brown it in the oil in a small pan, then add enough water to half cover it, put on a lid and simmer for 25 minutes, turning once.',
			'Meanwhile, warm the stock with the garlic and ginger. Stir in the miso and the remaining soy sauce. Keep it hot but not boiling.',
			'Cook the noodles as the packet says, drain and divide between two bowls.',
			'Slice the pork. Pour the broth over the noodles, then top with pork, the halved eggs and spring onions.'
		]
	},
	'tacos-al-pastor': {
		servings: 4,
		minutes: 50,
		difficulty: Difficulty.Medium,
		ingredients: [
			'600 g (1⅓ lb) pork shoulder, thinly sliced',
			'3 dried guajillo chiles, seeds removed',
			'2 tbsp achiote paste',
			'60 ml (¼ cup) pineapple juice',
			'2 tbsp white vinegar',
			'2 garlic cloves',
			'1 tsp ground cumin',
			'1 tsp dried oregano',
			'1 tsp salt',
			'4 pineapple rings',
			'12 small corn tortillas',
			'1 white onion, finely chopped',
			'A handful of coriander (cilantro), chopped',
			'2 limes, in wedges'
		],
		steps: [
			'Soak the chiles in hot water for 10 minutes, then drain.',
			'Blend the chiles with the achiote, pineapple juice, vinegar, garlic, cumin, oregano and salt until smooth.',
			'Coat the pork in the marinade and leave it for at least 20 minutes (or overnight in the fridge).',
			'Heat a large frying pan or griddle until very hot. Cook the pork in batches for 3–4 minutes a side until charred at the edges, then chop it.',
			'Char the pineapple rings in the same pan and chop them.',
			'Warm the tortillas and fill them with pork and pineapple. Top with onion and coriander and serve with lime.'
		]
	},
	carbonara: {
		servings: 2,
		minutes: 20,
		difficulty: Difficulty.Easy,
		ingredients: [
			'200 g (7 oz) spaghetti',
			'100 g (3½ oz) guanciale or pancetta, cut into strips',
			'2 eggs plus 1 egg yolk',
			'50 g (1¾ oz) pecorino romano, finely grated, plus extra to serve',
			'Plenty of black pepper',
			'Salt for the pasta water'
		],
		steps: [
			'Cook the spaghetti in well-salted boiling water.',
			'Meanwhile, fry the guanciale in a dry pan over medium heat until crisp. Take the pan off the heat.',
			'Whisk the eggs, yolk, pecorino and lots of black pepper in a bowl.',
			'Drain the pasta, keeping a cup of the cooking water. Add the pasta to the guanciale pan and toss.',
			'Wait a minute so the pan is not too hot, then pour in the egg mix and a splash of the pasta water. Toss quickly until creamy; add more water if it looks thick.',
			'Serve straight away with more pecorino and pepper.'
		]
	},
	'butter-chicken': {
		servings: 4,
		minutes: 60,
		difficulty: Difficulty.Medium,
		ingredients: [
			'700 g (1½ lb) boneless chicken thighs, in bite-size pieces',
			'150 g (⅔ cup) plain yoghurt',
			'2 tsp garam masala',
			'1 tsp chilli powder',
			'1 tsp salt',
			'50 g (3½ tbsp) butter',
			'1 onion, finely chopped',
			'3 garlic cloves, grated',
			'3 cm (1¼ in) piece of ginger, grated',
			'400 g (14 oz) tin of chopped tomatoes',
			'150 ml (⅔ cup) double (heavy) cream',
			'1 tsp sugar',
			'Rice or naan, to serve'
		],
		steps: [
			'Mix the chicken with the yoghurt, 1 tsp garam masala, the chilli powder and salt. Leave for 20 minutes.',
			'Heat a large frying pan until very hot and brown the chicken in batches, letting it char a little. Set aside.',
			'Melt the butter in the same pan. Soften the onion for 8 minutes, then add the garlic and ginger for 1 minute.',
			'Add the tomatoes and simmer for 10 minutes, then blend the sauce until smooth.',
			'Stir in the cream, sugar and the remaining garam masala. Add the chicken and simmer for 10 minutes until cooked through.',
			'Taste for salt and serve with rice or naan.'
		]
	},
	'pad-thai': {
		servings: 2,
		minutes: 30,
		difficulty: Difficulty.Medium,
		ingredients: [
			'150 g (5 oz) flat rice noodles',
			'200 g (7 oz) raw prawns (shrimp), peeled',
			'2 eggs',
			'2 tbsp tamarind paste',
			'2 tbsp fish sauce',
			'1½ tbsp brown sugar',
			'2 garlic cloves, chopped',
			'2 tbsp vegetable oil',
			'100 g (1 cup) bean sprouts',
			'3 spring onions, cut into short lengths',
			'30 g (¼ cup) roasted peanuts, chopped',
			'1 lime, in wedges'
		],
		steps: [
			'Soak the noodles in warm water for 20 minutes until bendy but still firm, then drain.',
			'Stir the tamarind, fish sauce and sugar together until the sugar dissolves.',
			'Heat the oil in a wok over high heat. Fry the garlic and prawns for 2 minutes until the prawns turn pink.',
			'Push everything to one side, crack in the eggs and scramble them.',
			'Add the noodles and sauce and toss for 2–3 minutes until the noodles are soft and coated.',
			'Toss in the bean sprouts and spring onions for 30 seconds. Serve topped with peanuts and lime.'
		]
	},
	bibimbap: {
		servings: 2,
		minutes: 40,
		difficulty: Difficulty.Medium,
		ingredients: [
			'300 g (1½ cups) cooked short-grain rice',
			'150 g (5 oz) beef mince (ground beef)',
			'1 tbsp soy sauce',
			'1 tsp sugar',
			'1 carrot, cut into matchsticks',
			'1 courgette (zucchini), cut into matchsticks',
			'100 g (3½ oz) spinach',
			'100 g (1 cup) bean sprouts',
			'2 eggs',
			'2 tbsp gochujang',
			'2 tsp sesame oil, plus extra for frying',
			'1 tsp toasted sesame seeds'
		],
		steps: [
			'Fry the beef with the soy sauce and sugar until browned. Set aside.',
			'Blanch the spinach and bean sprouts separately in boiling water for 1 minute, drain and squeeze dry. Toss each with a little sesame oil and salt.',
			'Stir-fry the carrot and courgette separately in a little oil for 2 minutes each, seasoning with salt.',
			'Fry the eggs sunny side up.',
			'Mix the gochujang with 2 tsp sesame oil and 1 tbsp water.',
			'Divide the warm rice between bowls, arrange the vegetables and beef on top, add an egg and sprinkle with sesame seeds. Mix it all with the sauce at the table.'
		]
	},
	'jollof-rice': {
		servings: 4,
		minutes: 75,
		difficulty: Difficulty.Medium,
		ingredients: [
			'400 g (2 cups) long-grain parboiled rice, rinsed',
			'2 red bell peppers, roughly chopped',
			'400 g (14 oz) tin of plum tomatoes',
			'1 scotch bonnet pepper (less if you prefer it mild)',
			'2 onions, one roughly chopped and one sliced',
			'3 tbsp tomato paste',
			'80 ml (⅓ cup) vegetable oil',
			'500 ml (2 cups) chicken stock',
			'2 tsp curry powder',
			'1 tsp dried thyme',
			'2 bay leaves',
			'1 tsp salt'
		],
		steps: [
			'Blend the bell peppers, tomatoes, scotch bonnet and the chopped onion until smooth.',
			'Heat the oil in a heavy pot and fry the sliced onion for 5 minutes. Add the tomato paste and fry for 3 minutes, stirring.',
			'Pour in the blended sauce and simmer for 20 minutes until thick and darker in colour.',
			'Stir in the stock, curry powder, thyme, bay leaves and salt, then add the rice.',
			'Cover tightly with foil and a lid and cook on low heat for 30 minutes, without stirring, until the rice is tender. Add a splash of water if it dries out before the rice is done.',
			'Let a little rice catch on the bottom for a smoky flavour, then fluff with a fork and serve.'
		]
	},
	'pao-de-queijo': {
		servings: 6,
		minutes: 40,
		difficulty: Difficulty.Easy,
		ingredients: [
			'250 g (2 cups) tapioca flour',
			'125 ml (½ cup) milk',
			'60 ml (¼ cup) vegetable oil',
			'60 ml (¼ cup) water',
			'1 tsp salt',
			'1 egg',
			'100 g (1 cup) Parmesan, finely grated'
		],
		steps: [
			'Heat the oven to 200 °C (400 °F) and line a baking tray.',
			'Bring the milk, oil, water and salt to the boil, then pour it over the tapioca flour and stir until it forms a sticky dough.',
			'Let it cool for 10 minutes, then beat in the egg and the cheese.',
			'With oiled hands, roll the dough into balls the size of a walnut and space them out on the tray.',
			'Bake for 20–25 minutes until puffed and golden. Eat them warm.'
		]
	}
};

export function findRecipe(slug: string): Recipe | undefined {
	return recipes[slug];
}
