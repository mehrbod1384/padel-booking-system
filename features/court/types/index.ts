export interface Court {
  _id: string;
  name: string;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourtPayload {
  name: string;
  price: number;
  isActive: boolean;
}

export interface UpdateCourtPayload {
  courtId: string;
  name: string;
  price: number;
  isActive: boolean;
}

export interface UpdateCourtBody {
  name?: string;
  price?: number;
  isActive?: boolean;
}