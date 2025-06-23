import { cookies } from "next/headers";



export async function GET(request: any) {
    try {
        const cookieStore = await cookies();
        const acceptTerms = cookieStore.get('acceptTermsAndConditions');
        const userLocation = cookieStore.get('userLocation');

        return new Response(JSON.stringify({
            message: 'Success',
            acceptTerms,
            userLocation
        }), {
            status: 200
        })
    } catch (error) {
        return new Response(`Error: ${error}`, {
            status: 400,
        })
    }
}