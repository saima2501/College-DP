export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  courses: string[];
  placementPercentage: number;
  avgPackage: number;
  description: string;
  examCutoffRank: number;
  examType: string;
  type: string;
  imageUrl?: string;
  admissionUrl?: string;
}

export interface CollegesResponse {
  data: College[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CollegeFilters {
  name?: string;
  location?: string;
  maxFees?: number;
  type?: string;
  page?: number;
  limit?: number;
}
