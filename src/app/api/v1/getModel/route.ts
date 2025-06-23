import { api } from "@/services/api";

export const maxDuration = 60;

export async function GET(request: any) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('nickname')
        const get = await api.acompanhante.getByNickname(query);

        if (get.error) {
            return new Response(`Error`, {
                status: 400,
            })
        } else if (get.model) {
            return new Response(JSON.stringify({
                message: 'Success',
                model: get.model
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