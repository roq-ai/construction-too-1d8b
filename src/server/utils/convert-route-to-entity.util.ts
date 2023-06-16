const mapping: Record<string, string> = {
  companies: 'company',
  outlets: 'outlet',
  rentals: 'rental',
  'rental-durations': 'rental_duration',
  'rental-prices': 'rental_price',
  tools: 'tool',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
