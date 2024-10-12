import React, { useState, useEffect } from 'react';
import './CategoryFilter.css'
interface CategoryFilterProps {
    onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const fetchCategories = () => {
        const sampleCategories = [
            'Health',
            'Education',
            'Environment',
            'Technology',
            'Sports',
            'Art',
            'Community',
            'Charity',
            'Social Justice',
            'Animal Welfare'
        ];
        setCategories(sampleCategories);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    return (
        <div className='category-filter'>
            <label htmlFor="category-select">Filter by Category:</label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">--All Categories--</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
