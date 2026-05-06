import { College, CollegeFilters, CollegesResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getColleges(filters: CollegeFilters = {}): Promise<CollegesResponse> {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_BASE_URL}/colleges?${query.toString()}`);
  return handleResponse<CollegesResponse>(response);
}

export async function getCollegeById(id: string): Promise<College> {
  const response = await fetch(`${API_BASE_URL}/colleges/${id}`);
  return handleResponse<College>(response);
}

export async function compareColleges(ids: string[]): Promise<College[]> {
  const response = await fetch(`${API_BASE_URL}/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return handleResponse<College[]>(response);
}

export async function predictColleges(exam: string, rank: number): Promise<College[]> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exam, rank }),
  });
  return handleResponse<College[]>(response);
}
