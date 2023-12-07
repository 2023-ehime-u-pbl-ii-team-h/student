const MICROSOFT_TOKEN_ENDPOINT = 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token';
const BACKEND_LOGIN_ENDPOINT = 'https://backend.mikuroxina.workers.dev/login';
const CLIENT_ID = '788aebee-7aa0-4286-b58c-7e35bf22e92a';

export const fetchAccessToken = async (authCode: string): Promise<void> => {
    const microsoftTokenResponse = await fetch(MICROSOFT_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'client_id': CLIENT_ID,
            'scope': 'user.read mail.read',
            'code': authCode,
            'redirect_uri': window.location.origin + window.location.pathname,
            'grant_type': 'authorization_code',
        }),
    });

    if (!microsoftTokenResponse.ok) {
        throw new Error('Failed to fetch Microsoft access token');
    }

    const microsoftToken = await microsoftTokenResponse.json();

    const backendLoginResponse = await fetch(BACKEND_LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${microsoftToken.access_token}`,
        },
    });

    if (!backendLoginResponse.ok) {
        throw new Error('Failed to login to the backend');
    }
};