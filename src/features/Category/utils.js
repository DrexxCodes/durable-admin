/**
 * Mirrors the backend's category-name normalisation
 * (durable-backend/Controllers/CategoryController.js -> normaliseCategoryName)
 * so the UI can preview exactly what will be saved.
 */
export const formatCategoryName = (value = "") =>
	String(value)
		.replace(/[^0-9a-zA-Z/\-_ ]/g, "")
		.replace(/[-_]/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.toUpperCase();

/** Product name of a category row (populated object or plain string). */
export const categoryProductName = item =>
	String(item?.product?.name || item?.product || "").toLowerCase();
