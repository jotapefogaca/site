import { api } from "@/services/api";

export const maxDuration = 60;

export async function GET(request: any) {
    try {
        const get = await api.acompanhante.getAll();

        if (get.error) {
            return new Response(`Error`, {
                status: 400,
            })
        } else if (get.list) {
            return new Response(JSON.stringify({
                message: 'Success',
                models: get.list
            }), {
                status: 200
            })
        } else {
            return new Response(`Error`, {
                status: 400,
            })
        }
    } catch (error) {
        return new Response(`Error: ${error}`, {
            status: 400,
        })
    }
}