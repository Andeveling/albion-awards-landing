import categoriesData from "../config/categories.json";
import type { Category } from "../types/category";
import { CategoryCard } from "./CategoryCard";

/**
 * Lista de categorías con grid responsivo y diseño gamer
 */
export function CategoriesList() {
	const categories = categoriesData as Category[];

	return (
		<section className="w-full px-4 py-16 md:py-24">
			<div className="mx-auto max-w-7xl">
				{/* Section Header */}
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
						Categorías{" "}
						<span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
							2025
						</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
						Vota por tus streamers y creadores favoritos en estas categorías
						épicas
					</p>

					{/* Decorative Line */}
					<div className="mt-6 flex justify-center gap-2">
						<div className="h-1 w-16 rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
						<div className="h-1 w-16 rounded-full bg-linear-to-r from-cyan-400 to-blue-500" />
						<div className="h-1 w-16 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
					</div>
				</div>

				{/* Categories Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((category, index) => (
						<CategoryCard key={category.id} category={category} index={index} />
					))}
				</div>
			</div>
		</section>
	);
}
