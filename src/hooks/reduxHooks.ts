import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../slices/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
