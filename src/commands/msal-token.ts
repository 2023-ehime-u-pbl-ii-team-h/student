const MICROSOFT_TOKEN_ENDPOINT = 'MicrosoftトークンエンドポイントURL';
const BACKEND_LOGIN_ENDPOINT = '/loginエンドポイントURL';

export const fetchAccessToken = async (authCode) => {
    try {
        const microsoftTokenResponse = await fetch(MICROSOFT_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'client_id': 'YOUR_CLIENT_ID', // 実際のクライアントID
                'scope': 'openid email profile',
                'code': authCode,
                'redirect_uri': 'YOUR_REDIRECT_URI', // 実際のリダイレクトURI
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
    } catch (error) {
        console.error('Error in fetchAccessToken:', error);
        throw error;
    }
};