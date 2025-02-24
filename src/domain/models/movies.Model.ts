import { description } from "aws-sdk/clients/frauddetector";

export interface Movie {
    id: number;
    title: string;
    gender: string;
    duration: number;
    clasification: string;
    description: description;
}