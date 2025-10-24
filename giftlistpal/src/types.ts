// export type ListItemProps = {
// 	name: string;
// 	date?: string;
// 	description?: string;
// 	variant: "participant" | "gift-event";
// };

// export type ListGridProps = {
// 	items: Array<Participant | GiftEvent>;
// 	variant: "participant" | "event";
// };

// export interface Participant {
// 	name: string;
// }

export interface GiftEvent {
	id: number;
	name: string;
	date?: string;
	description?: string;
}

// export type Item = Participant | GiftEvent;

// export interface Participant {
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
// 	variant: "participant" | "event"; // explicit type
// };

// export type ListGridProps = {
// 	items: Array<Participant | Event>;
// 	variant: "participant" | "event";
// };
