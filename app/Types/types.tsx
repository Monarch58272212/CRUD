export interface Post {
  id: number;
  imageUrl: string;
  description: string;
  complete: boolean;
}

export interface Product {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  user: {
    name: string;
    email: string;
    picture?: string;
  };
}

export interface Links {
  name: string;
  href: string;
}
