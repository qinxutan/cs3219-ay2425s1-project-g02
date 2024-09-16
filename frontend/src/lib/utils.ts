import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const backendUrl = "http://localhost:3001";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface IDictionary<T> {
  [key: string]: T;
}

export type SuccessObject = {
  success: boolean;
  data?: any;
  error?: any;
};

export function isSubset<T>(subset: Set<T>, superset: Set<T>): boolean {
  // Iterate over each element in the subset
  for (let item of subset) {
    // Check if the element exists in the superset
    if (!superset.has(item)) {
      return false; // Return false if any element is not found
    }
  }
  return true; // Return true if all elements are found
}

// Utility function for making fetch requests with credentials
export async function callFunction(
  functionName: string,
  method: string = "GET"
): Promise<SuccessObject> {
  try {
    const url = `${backendUrl}/${functionName}`;

    const response = await fetch(url, {
      method,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse and return the JSON data
    const result = await response.json();

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Fetch error:", error);
    return { success: false, error }; // Handle the error (could also throw or handle differently)
  }
}
