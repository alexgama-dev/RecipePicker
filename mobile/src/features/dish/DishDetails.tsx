import { Link } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
	countryLabel,
	Difficulty,
	recipeSearchUrl,
	type Country,
	type Dish,
	type Recipe
} from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

const difficultyLabels: Record<Difficulty, string> = {
	[Difficulty.Easy]: 'Easy',
	[Difficulty.Medium]: 'Medium',
	[Difficulty.Hard]: 'Hard'
};

type Props = { dish: Dish; country: Country; recipe: Recipe | undefined };

export function DishDetails({ dish, country, recipe }: Props) {
	const c = useColors();

	return (
		<ScrollView contentContainerStyle={styles.page}>
			<Text style={[styles.name, { color: c.text }]} role="heading">
				{dish.name}
			</Text>
			<Link
				href={`/country/${country.code.toLowerCase()}`}
				style={[styles.country, { color: c.teal }]}
			>
				{countryLabel(country)}
			</Link>
			<Text style={{ color: c.text }}>{dish.description}</Text>
			{recipe ? (
				<RecipeSections recipe={recipe} />
			) : (
				<Text style={[styles.comingSoon, { color: c.muted }]}>Recipe coming soon</Text>
			)}
			<Pressable
				role="link"
				onPress={() => Linking.openURL(recipeSearchUrl(dish))}
				style={[styles.searchButton, { borderColor: c.teal }]}
			>
				<Text style={{ color: c.teal }}>Find recipes online</Text>
			</Pressable>
		</ScrollView>
	);
}

function RecipeSections({ recipe }: { recipe: Recipe }) {
	const c = useColors();

	return (
		<>
			<Text style={[styles.meta, { color: c.muted }]}>
				{recipe.minutes} min · {difficultyLabels[recipe.difficulty]} · Serves {recipe.servings}
			</Text>
			<View style={styles.badges}>
				{recipe.aiDrafted && <Badge label="AI-drafted" />}
				{!recipe.tested && <Badge label="Untested" />}
			</View>
			<Text style={[styles.heading, { color: c.text }]} role="heading">
				Ingredients
			</Text>
			{recipe.ingredients.map((ingredient) => (
				<Text key={ingredient} style={[styles.line, { color: c.text }]}>
					• {ingredient}
				</Text>
			))}
			<Text style={[styles.heading, { color: c.text }]} role="heading">
				Steps
			</Text>
			{recipe.steps.map((step, i) => (
				<View key={step} style={styles.step}>
					<Text style={[styles.stepNumber, { color: c.teal }]}>{i + 1}.</Text>
					<Text style={[styles.stepText, { color: c.text }]}>{step}</Text>
				</View>
			))}
		</>
	);
}

function Badge({ label }: { label: string }) {
	const c = useColors();
	return <Text style={[styles.badge, { color: c.muted, borderColor: c.border }]}>{label}</Text>;
}

const styles = StyleSheet.create({
	page: { padding: 16 },
	name: { fontSize: 26, fontWeight: '700' },
	country: { marginBottom: 8, fontSize: 16 },
	comingSoon: { marginTop: 24, fontStyle: 'italic' },
	meta: { marginTop: 12 },
	badges: { flexDirection: 'row', gap: 8, marginTop: 8 },
	badge: {
		borderWidth: 1,
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 2,
		fontSize: 12
	},
	heading: { marginTop: 24, marginBottom: 8, fontSize: 20, fontWeight: '700' },
	line: { marginBottom: 4 },
	step: { flexDirection: 'row', gap: 8, marginBottom: 8 },
	stepNumber: { fontWeight: '700' },
	stepText: { flex: 1 },
	searchButton: {
		marginTop: 24,
		borderWidth: 1,
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: 'center'
	}
});
