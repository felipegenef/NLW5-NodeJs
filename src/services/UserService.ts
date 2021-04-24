import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService {
  private usersRepository: Repository<User>;
  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  async create(email: string) {
    //verificar se o usuário existe
    const usersExists = await this.usersRepository.findOne({ email });
    //se não existir , salvar no banco de dados
    if (usersExists) {
      return usersExists;
    }
    //se existir , retornar usuário
    const user = this.usersRepository.create({ email });

    await this.usersRepository.save(user);

    return user;
  }
}
export { UserService };
