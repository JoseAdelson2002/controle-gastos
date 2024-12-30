export async function authenticateToken(request, response, next, auth) {
    const authHeader = request.headers.authorization;

    // Verifica se o cabeçalho Authorization existe
    if (!authHeader) {
        response.status(401).json({ message: "Usuário não autorizado (cabeçalho ausente)" });
        return;
    }

    // Verifica se o token segue o formato "Bearer <token>"
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        response.status(401).json({ message: "Formato de token inválido" });
        return;
    }

    const token = tokenParts[1];

    try {
        // Valida o token usando o Firebase Admin SDK
        const decodedIdToken = await auth.verifyIdToken(token, true);

        // Adiciona o usuário decodificado à requisição
        request.user = {
            uid: decodedIdToken.sub
        };

        next();
    } catch (e) {
        console.error("Erro na validação do token:", e);
        response.status(401).json({ message: "Usuário não autorizado (token inválido)" });
    }
}
