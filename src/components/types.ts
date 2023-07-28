// components/types.ts
export interface Photo {
    id: string;
    urls: {
      small: string;
      regular: string;
      // Add other resolutions if needed
    };
    description?: string;
    // Add other photo details here
  }
  