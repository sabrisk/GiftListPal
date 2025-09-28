// export type ListItemProps = {
// 	name: string;
// 	date?: string;
// 	description?: string;
// 	variant: "person" | "gift-event";
// };

// export type ListGridProps = {
// 	items: Array<Person | GiftEvent>;
// 	variant: "person" | "event";
// };

// export interface Person {
// 	name: string;
// }

export interface GiftEvent {
	id: number;
	name: string;
	date?: string;
	description?: string;
}

// export type Item = Person | GiftEvent;

// export interface Person {
//   name: string;
//   // Add other properties if needed, e.g.:
//   // avatarUrl?: string;
// }

// // Define Event type
// export interface Event {
//   name: string;
//   date?: string;
//   description?: string;
// }

// export type ListItemProps = {
// 	name: string;
// 	description?: string;
// 	date?: string;
// 	variant: "person" | "event"; // explicit type
// };

// export type ListGridProps = {
// 	items: Array<Person | Event>;
// 	variant: "person" | "event";
// };
