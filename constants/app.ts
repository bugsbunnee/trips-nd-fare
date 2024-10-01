import { UserRide } from "@/utils/models";

export const SORT_ORDER = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
];

export const RIDES: UserRide[] = [
    {
      id: "1",
      driverName: "Albert Akang",
      carSeats: 4,
      date: "2023-10-20 04:55",
      status: 'paid',
      fromAddress: "Ogombo road, Ajah",
      toAddress: "Lekki scheme 2. Lagos",
      price: 3000,
      type: 'jetty'
    },
    {
      id: "2",
      driverName: "Albert Akang",
      carSeats: 4,
      date: "2023-10-20 04:55",
      status: 'paid',
      fromAddress: "Ogombo road, Ajah",
      toAddress: "Lekki scheme 2. Lagos",
      price: 3000,
      type: 'bus'
    }
];