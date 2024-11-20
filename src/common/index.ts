import { InputButtonType } from "@/types/common";
import { nanoid } from "nanoid";

export const plusButtons: InputButtonType[] = [
    {
        id: nanoid(),
        value: 1,
    },
    {
        id: nanoid(),
        value: 2,
    },
    {
        id: nanoid(),
        value: 3,
    },
    {
        id: nanoid(),
        value: 1,
        input: 2,
    },

];

export const minusButtons: InputButtonType[] = [
    {
        id: nanoid(),
        value: 1,
    },
    {
        id: nanoid(),
        value: 2,
    },
    {
        id: nanoid(),
        value: 3,
    },
    {
        id: nanoid(),
        value: 1,
        input: 2,
    },

];