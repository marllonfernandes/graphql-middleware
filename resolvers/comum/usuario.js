const jwt = require("jwt-simple");
const { perfis: obterPerfis } = require("../Type/Usuario");

module.exports = {
  async getUsuarioLogado(usuario) {
    const perfis = await obterPerfis(usuario);
    const agora = Math.floor(Date.now() / 1000); // pegar os segundos

    // payload token
    const usuarioInfo = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfis: perfis.map((p) => p.nome),
      iat: agora,
      exp: agora + 3 * 24 * 60 * 60, // 3=dias * 24=representa 1 dia * 60=minutos * 60=segundos (durabilidade de 3 dias o token)
    };

    return {
      ...usuarioInfo,
      token: jwt.encode(usuarioInfo, process.env.APP_AUTH_SECRET),
    };
  },
};
