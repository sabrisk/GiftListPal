export const getLink = (variant: string, eventId?: number, userId?: string) => {
	let linkUrl = "";

	if (variant === "participant") {
		linkUrl = `/events/${eventId}/participants/invite`;
	} else if (variant === "gift-event") {
		linkUrl = `/events/new`;
	} else {
		linkUrl = `/events/${eventId}/participants/${userId}/gifts/new`;
	}
	return linkUrl;
};

export const getButtonTitle = (variant: string) => {
	let buttonTitle = "";

	if (variant === "participant") {
		buttonTitle = "Add Person";
	} else if (variant === "gift-event") {
		buttonTitle = "Add Event";
	} else {
		buttonTitle = "Add Gift";
	}
	return buttonTitle;
};
