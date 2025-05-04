export interface Investment {
  id: number;
  userId: number;
  ticker: string;
  quantity: number;
  purchasePrice: number;
  currentPrice?: number;
  currentValue?: number;
  change?: number;
  changePercentage?: number;
  purchaseDate: Date;
  perDayChange?: number;
  type: 'stock' | 'bond' | 'mutual-fund' | 'gold-bond'; // Added type field
}

export interface Transaction {
  id: number;
  userId: number;
  ticker: string;
  quantity: number;
  price: number;
  date: Date;
  type: 'buy' | 'sell';
  total: number;
}

// Interface for Stocks
export interface Stock {
  id: number;
  ticker: string;
  companyName: string;
  sector: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
  dividendYield?: number;
  marketCap?: number;
}

// Interface for Bonds
export interface Bond {
  id: number;
  bondName: string;
  issuer: string;
  faceValue: number;
  couponRate: number; // Annual interest rate
  maturityDate: Date;
  purchaseDate: Date;
  quantity: number;
  purchasePrice: number;
  currentValue?: number;
}

// Interface for Mutual Funds
export interface MutualFund {
  id: number;
  fundName: string;
  fundManager: string;
  nav: number; // Net Asset Value
  units: number;
  purchaseDate: Date;
  expenseRatio?: number;
  category: string; // e.g., Equity, Debt, Hybrid
}

// Interface for Gold Bonds
export interface GoldBond {
  id: number;
  bondName: string;
  issuer: string;
  grams: number; // Quantity in grams
  purchasePricePerGram: number;
  currentPricePerGram?: number;
  purchaseDate: Date;
  maturityDate: Date;
  interestRate?: number; // Annual interest rate
}
