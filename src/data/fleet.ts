import duster from "@/assets/car-duster.png";
import clio from "@/assets/car-clio.png";
import p208 from "@/assets/car-208.png";
import ferrari from "@/assets/car-ferrari.png";
import lambo from "@/assets/car-lambo.png";
import rangerover from "@/assets/car-rangerover.png";
import tucson from "@/assets/car-tucson.png";
import jogger from "@/assets/car-jogger.png";
import mt07 from "@/assets/bike-mt07.png";
import r1250gs from "@/assets/bike-r1250gs.png";
import cb500 from "@/assets/bike-cb500.png";

export type CarCategory = "economy" | "suv" | "luxury" | "motorbike";
export type Transmission = "manual" | "automatic";
export type Fuel = "diesel" | "petrol" | "hybrid" | "electric";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  category: CarCategory;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  pricePerDay: number;
  year: number;
  city: string;
  features: string[];
  image: string;
  description: string;
}

export const CITIES = ["Casablanca", "Marrakech", "Rabat", "Fès", "Agadir", "Tanger", "Oujda", "Meknès", "El Jadida", "Dakhla"];

export const FLEET: Vehicle[] = [
  { id: "dacia-duster", brand: "Dacia", model: "Duster", category: "economy", transmission: "manual", fuel: "diesel", seats: 5, pricePerDay: 300, year: 2024, city: "Casablanca", features: ["AC", "Bluetooth", "USB"], image: duster, description: "SUV compact économique, parfait pour les escapades en famille à travers le Maroc." },
  { id: "renault-clio-5", brand: "Renault", model: "Clio 5", category: "economy", transmission: "manual", fuel: "diesel", seats: 5, pricePerDay: 350, year: 2024, city: "Marrakech", features: ["AC", "GPS", "Bluetooth"], image: clio, description: "Citadine moderne, efficace et économe en carburant." },
  { id: "peugeot-208", brand: "Peugeot", model: "208 Access", category: "economy", transmission: "manual", fuel: "diesel", seats: 4, pricePerDay: 360, year: 2024, city: "Rabat", features: ["AC", "Bluetooth"], image: p208, description: "Style français, conduite agile, idéale pour la ville." },
  { id: "hyundai-tucson", brand: "Hyundai", model: "Tucson", category: "suv", transmission: "automatic", fuel: "hybrid", seats: 5, pricePerDay: 750, year: 2024, city: "Casablanca", features: ["AC", "GPS", "Cuir", "Caméra"], image: tucson, description: "SUV hybride confortable avec finitions premium." },
  { id: "dacia-jogger", brand: "Dacia", model: "Jogger", category: "suv", transmission: "manual", fuel: "diesel", seats: 7, pricePerDay: 480, year: 2024, city: "Agadir", features: ["AC", "7 places"], image: jogger, description: "Familial 7 places, parfait pour les longues distances." },
  { id: "ferrari-296", brand: "Ferrari", model: "296 GTB", category: "luxury", transmission: "automatic", fuel: "hybrid", seats: 2, pricePerDay: 5000, year: 2024, city: "Marrakech", features: ["Cuir", "GPS", "Sport mode"], image: ferrari, description: "Hybride V6 italien, 830 chevaux d'émotion pure." },
  { id: "lambo-aventador", brand: "Lamborghini", model: "Aventador", category: "luxury", transmission: "automatic", fuel: "petrol", seats: 2, pricePerDay: 40000, year: 2023, city: "Marrakech", features: ["V12", "Cuir", "Carbone"], image: lambo, description: "L'icône taureau dans toute sa splendeur." },
  { id: "range-rover-swb", brand: "Land Rover", model: "Range Rover SWB HSE", category: "luxury", transmission: "automatic", fuel: "diesel", seats: 5, pricePerDay: 7000, year: 2024, city: "Casablanca", features: ["Cuir", "Massage", "Toit pano"], image: rangerover, description: "Luxe britannique, capable partout, du palace au désert." },
  { id: "yamaha-mt07", brand: "Yamaha", model: "MT-07", category: "motorbike", transmission: "manual", fuel: "petrol", seats: 2, pricePerDay: 450, year: 2024, city: "Casablanca", features: ["ABS", "Mode sport"], image: mt07, description: "Naked agile, parfait pour la ville et les routes côtières." },
  { id: "bmw-r1250gs", brand: "BMW", model: "R1250GS", category: "motorbike", transmission: "manual", fuel: "petrol", seats: 2, pricePerDay: 850, year: 2024, city: "Marrakech", features: ["ABS", "Cruise", "Trail"], image: r1250gs, description: "Reine des trails, prête pour l'Atlas et au-delà." },
  { id: "honda-cb500", brand: "Honda", model: "CB500", category: "motorbike", transmission: "manual", fuel: "petrol", seats: 2, pricePerDay: 380, year: 2024, city: "Rabat", features: ["ABS"], image: cb500, description: "Polyvalente, accessible, fiable." },
];

export const INSURANCE_TIERS = [
  { id: "basic", name: "Basic", price: 80, coverage: ["Tiers", "Vol limité"], deductible: 8000 },
  { id: "standard", name: "Standard", price: 150, coverage: ["Tiers", "Vol", "Collision"], deductible: 4000, recommended: true },
  { id: "premium", name: "Premium", price: 250, coverage: ["Tous risques", "Bris de glace", "Assistance"], deductible: 0 },
];

export const EXTRAS = [
  { id: "gps", name: "GPS Navigation", price: 50, perDay: true },
  { id: "child", name: "Siège bébé", price: 30, perDay: true },
  { id: "second", name: "Second conducteur", price: 100, perDay: true },
  { id: "airport", name: "Livraison aéroport", price: 200, perDay: false },
];

export const PAYMENT_METHODS = [
  { id: "cmi", name: "CMI (Carte bancaire)", desc: "Paiement sécurisé via la passerelle CMI" },
  { id: "cashplus", name: "CashPlus", desc: "Paiement en espèces dans une agence CashPlus" },
  { id: "wire", name: "Virement bancaire", desc: "RIB envoyé après confirmation" },
  { id: "cash", name: "Paiement à la prise en charge", desc: "Réglez en agence le jour J" },
];
