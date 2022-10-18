import api from "./api";
import voto from '../models/voto';

class VotacaoService {
  votar(data: voto) {
    return api.post("/votacao", data);
  }
}

const votacaoService = new VotacaoService();

export default votacaoService;
