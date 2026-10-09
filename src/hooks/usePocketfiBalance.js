import { useCallback, useState } from "react";
import axios from "axios";

/**
 * On-demand PocketFi business-wallet balance (admin only).
 * Deliberately NOT fetched on mount: every call hits PocketFi, so it only runs when the admin asks.
 */
export const usePocketfiBalance = () => {
	const [state, setState] = useState({
		balance: null,
		loading: false,
		error: "",
		fetchedAt: null,
	});

	const refresh = useCallback(async () => {
		setState(prev => ({ ...prev, loading: true, error: "" }));
		try {
			const res = await axios.get("/api/v1/wallet/pocketfi/balance");
			setState({
				balance: Number(res?.data?.data?.balance ?? 0),
				loading: false,
				error: "",
				fetchedAt: new Date(),
			});
		} catch (err) {
			const data = err?.response?.data;
			setState(prev => ({
				...prev,
				loading: false,
				error:
					data?.error?.[0]?.msg ||
					data?.msg ||
					data?.message ||
					err?.message ||
					"Could not fetch balance",
			}));
		}
	}, []);

	return { ...state, refresh };
};
