import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to easily merge tailwind classes.
 * @param inputs classes to merge together
 * @returns merged classes
 */
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
